"use client";

import { format, parseISO, isAfter, isSameDay } from "date-fns";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaNotesMedical,
} from "react-icons/fa";

import { Appointment } from "../../types/Appointment";
import Link from "next/link";

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: () => void;
}

export default function AppointmentCard({
  appointment,
  onCancel,
}: AppointmentCardProps) {
  const appointmentDate = parseISO(appointment.date);
  const isUpcoming =
    isAfter(appointmentDate, new Date()) && appointment.status === "upcoming";
  const isToday =
    isSameDay(appointmentDate, new Date()) && appointment.status === "upcoming";

  const getStatusBadge = () => {
    switch (appointment.status) {
      case "upcoming":
        return isToday ? (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            Today
          </span>
        ) : (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            Upcoming
          </span>
        );
      case "completed":
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-soft transition-all duration-300 ${
        isUpcoming ? "border-l-4 border-primary-500" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-center md:text-left mb-4">
              <div className="text-sm text-gray-500 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                {format(appointmentDate, "EEEE, MMMM d, yyyy")}
              </div>
              <div className="text-lg font-bold text-gray-900">
                <FaClock className="inline mr-1" />
                {appointment.timeSlot.start} - {appointment.timeSlot.end}
              </div>
              <div className="mt-2">{getStatusBadge()}</div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4 p-6">
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="md:w-2/3">
              <div className="flex items-start">
                <img
                  src={appointment.doctor.image}
                  alt={appointment.doctor.name}
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <div>
                  <Link href="#">
                    <h3 className="text-lg font-bold text-gray-900">
                      {appointment.doctor.name}
                    </h3>
                  </Link>
                  <p className="text-primary-600 font-medium text-gray-700">
                    {appointment.doctor.speciality}
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex items-center mb-1">
                      <FaMapMarkerAlt className="mr-1" />
                      {appointment.doctor.location.hospital},{" "}
                      {appointment.doctor.location.city}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <FaNotesMedical className="mr-1" />
                  Reason for Visit:
                </h4>
                <p className="text-gray-600 mt-1">{appointment.reason}</p>
              </div>
            </div>

            <div className="md:w-1/3 mt-4 md:mt-0 flex flex-col items-center md:items-end">
              {isUpcoming && (
                <button
                  onClick={onCancel}
                  className="w-full md:w-auto px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  Cancel Appointment
                </button>
              )}

              {appointment.status === "completed" && (
                <a
                  href="#"
                  className="w-full md:w-auto mt-2 px-4 py-2 border border-primary-500 text-primary-500 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors text-sm font-medium text-center"
                >
                  View Prescription
                </a>
              )}
              {/* <a
                href={`/doctors/${appointment.doctor}`}
                className="w-full md:w-auto mt-2 px-4 py-2 border border-primary-500 text-primary-500 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors text-sm font-medium text-center"
              >
                View Doctor
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
