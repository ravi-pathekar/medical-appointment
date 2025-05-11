import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCalendarAlt,
} from "react-icons/fa";

import AppointmentSlots from "./appointmentSlots";

import { Doctor } from "../../types/Doctors";

interface DoctorProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorProps) {
  const [showAppointments, setShowAppointments] = useState(false);

  const toggleAppointments = () => {
    setShowAppointments(!showAppointments);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 flex justify-center">
          <div className="relative h-48 w-48 md:h-64 md:w-48 rounded-full md:rounded-lg overflow-hidden">
            <Image
              src={doctor.photo}
              alt={doctor.name}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="p-4 md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
            <h2 className="text-xl font-bold text-primary-800 mb-1 md:mb-0">
              {doctor.name}
            </h2>
            <div className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-lg">
              <span className="text-md font-medium">
                {doctor.experience}+ Years Experience
              </span>
            </div>
          </div>

          <div className="mb-3">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded mr-2">
              {doctor.speciality}
            </span>
            <span className="text-neutral-600 text-sm">
              {doctor.qualifications.join(", ")}
            </span>
          </div>

          <p className="text-neutral-700 mb-4">{doctor.bio}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-neutral-500 mr-1" />
              <span className="text-neutral-700 text-sm">
                {doctor.location.hospital}, {doctor.location.city}
              </span>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="text-neutral-700 text-sm">
                {doctor.ratings} ({doctor.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-700 text-sm">
                Languages: {doctor.languages.join(", ")}
              </span>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-secondary-100 text-secondary-600 mr-3">
                <FaPhoneAlt className="w-4 h-4" />
              </div>
              <span className="font-medium">Call</span>
            </div>

            <div className="flex items-center">
              <div className="text-primary-700 mr-4">
                Consultation fee:{" "}
                <span className="font-medium">${doctor.consultationFee}</span>
              </div>
              <button
                onClick={toggleAppointments}
                className="btn btn-primary px-5 py-2 flex items-center"
              >
                <FaCalendarAlt className="mr-2" />
                {showAppointments ? "Hide Slots" : "See Available Slots"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAppointments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-neutral-200"
        >
          <AppointmentSlots doctor={doctor} />
        </motion.div>
      )}
    </motion.div>
  );
}
