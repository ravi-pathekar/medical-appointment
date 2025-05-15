import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DateSelector from "./dateSelector";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { FaClock } from "react-icons/fa";
import { format, addDays } from "date-fns";

import { showErrorToast, showSuccessToast } from "../common/toatNotification";

import axiosInstance from "../../utils/axiosInstance";
import { Doctor, TimeSlot, TimeSlotsDetails } from "../../types/Doctors";

interface DoctorProps {
  doctor: Doctor;
}

export default function AppointmentSlots({ doctor }: DoctorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [timeSlotsDetails, setTimeSlotsDetails] = useState<TimeSlotsDetails[]>([]);
  const [dayAvailability, setDaydAvailability] = useState<TimeSlotsDetails | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { isSignedIn, getToken } = useAuth();

  // Get the next 7 days
  const next7Days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) =>
        format(addDays(new Date(), i + 1), "EEEE")
      ),
    []
  );

  const availableDates = useMemo(() => {
    return next7Days.map((day, i) => addDays(new Date(), i + 1));
  }, [next7Days]);

  // Function to handle slot selected by user
  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setError(null);
    setReason("");
  };

  //  Function to handle date change by user
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setDayOfWeek(format(date, "EEEE"));
    setSelectedSlot(null);
  };

  const handleBookAppointment = async () => {
    try {
      const trimmedReason = reason.trim();

      // Validation
      if (!trimmedReason || trimmedReason.length > 200) {
        setError("Reason should not be empty and cannot exceed 200 characters");
        return;
      }

      // Getting jwt token to verify user on backend
      const token = await getToken({
        template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      });

      // Calling API to book the appointment
      const response = await axiosInstance.post(
        "/appointments",
        {
          doctorId: doctor._id,
          date: format(selectedDate, "yyyy-MM-dd"),
          day: dayOfWeek,
          timeSlot: selectedSlot,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSelectedSlot(null);
        setReason("");
        setError(null);
        showSuccessToast("Appointment booked successfully!");
      } else {
        showErrorToast("Something went wrong while booking appointment. Please try again later.");
        console.error("Something went wrong while booking appointment:", response);
        setError("Something went wrong while booking appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      showErrorToast("Something went wrong while booking appointment. Please try again later.");
      setError("Something went wrong while booking appointment");
      return;
    }
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const timeSlotsDetails = await axiosInstance.get(
          `/time-slots/doctor/${doctor._id}`
        );
        setTimeSlotsDetails(timeSlotsDetails.data.data);
      } catch (error) {
        showErrorToast("Something went wrong while fetching doctor's time slots details");
        console.error("Something went wrong while fetching doctor's time slots details:", error);
      }
    };

    fetchTimeSlots();
  }, [doctor._id]);

  useEffect(() => {
    const dayAvailability = timeSlotsDetails.find(
      (day) => day.day === dayOfWeek
    );
    setDaydAvailability(dayAvailability || null);
  }, [timeSlotsDetails, dayOfWeek]);

  return (
    <div className="p-6 bg-neutral-50">
      <div
        className={`flex items-center mb-6 ${
          dayAvailability ? "text-primary-600" : "text-error-600"
        }`}
      >
        <FaClock className="mr-2" />
        <span className="font-semibold text-lg">
          {dayAvailability
            ? `${dayAvailability.slots[0].start} - ${
                dayAvailability.slots[dayAvailability.slots.length - 1].end
              }`
            : "No Slots Available"}
        </span>
        <span className="ml-2 text-neutral-600">
          {dayAvailability ? `(${dayOfWeek})` : ""}
        </span>
      </div>

      <DateSelector
        onDateSelect={handleDateSelect}
        availableDates={availableDates}
      />

      <div className="mb-6">
        <h3 className="text-neutral-700 font-semibold mb-3">
          Available Slots:
        </h3>
        {!dayAvailability ? (
          <div className="text-neutral-500 py-4">
            No slots available for {format(selectedDate, "EEEE")}. Please select another date.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {dayAvailability.slots.map((slot, index) => (
              <motion.div
                key={`${slot.start}-${slot.end}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleSlotSelect(slot)}
                  className={`time-slot slot-transition ${
                    selectedSlot === slot
                      ? "time-slot-selected text-white bg-primary-500"
                      : slot.isAvailable
                      ? "time-slot-available text-black bg-white"
                      : "time-slot-unavailable text-gray-400 bg-gray-200"
                  } w-full text-center`}
                  disabled={!slot.isAvailable}
                >
                  {slot.start}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {
        /* If user selects a slot then check if the user signed in or not
           Based on that show the book appointment button or sign in button
        */
      }
      {selectedSlot ? (
        isSignedIn ? (
          <div className="text-center">
            <textarea
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter the reason for your appointment (max 200 characters)"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              onClick={handleBookAppointment}
              className="btn btn-accent px-8 py-3 text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Link
              href="/auth/sign-in"
              className="btn btn-accent px-8 py-3 text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
