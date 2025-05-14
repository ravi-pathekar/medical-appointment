import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import DateSelector from "./dateSelector";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { FaClock } from "react-icons/fa";
import { format, addDays } from "date-fns";

import { Doctor, TimeSlot, TimeSlotsDetails } from "../../types/Doctors";

interface DoctorProps {
  doctor: Doctor;
}

export default function AppointmentSlots({ doctor }: DoctorProps) {
  console.log("🚀 ~ AppointmentSlots ~ doctor:", doctor);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [timeSlotsDetails, setTimeSlotsDetails] = useState<TimeSlotsDetails[]>([]);
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { isSignedIn, getToken } = useAuth();

  // Get the day of the week from the selected date
  const dayOfWeek = format(selectedDate, "EEEE");

  // Get the next 7 days including today
  const next7Days = Array.from({ length: 7 }, (_, i) =>
    format(addDays(new Date(), i), "EEEE")
  );

  // Filter availability for the next 7 days
  const filteredAvailability = timeSlotsDetails.filter((day) =>
    next7Days.includes(day.day)
  );

  // Find availability for the selected day
  const dayAvailability = filteredAvailability.find(
    (day) => day.day === dayOfWeek
  );

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setError(null);
    setReason("");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleBookAppointment = async () => {
    try {
      const trimmedReason = reason.trim();
      console.log("🚀 ~ handleBookAppointment ~ selectedDate:", selectedDate);

      // Validation
      if (!trimmedReason) {
        setError("Reason cannot be empty.");
        return;
      }
      if (trimmedReason.length > 200) {
        setError("Reason cannot exceed 200 characters.");
        return;
      }
      const token = await getToken({
        template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      }); 

      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctorId: doctor._id,
          date: format(selectedDate, "yyyy-mm-dd"),
          day: dayOfWeek,
          timeSlot: selectedSlot,
          reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSelectedSlot(null);
        setReason("");
        setError(null);
        toast.success("Appointment booked successfully!", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Failed to book appointment.", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Failed to book appointment:", response);
        setError("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment.", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError("Failed to book appointment.");
      return;
    }
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const timeSlotsDetails = await axios.get(
          `http://localhost:5000/api/time-slots/doctor/${doctor._id}`
        );
        setTimeSlotsDetails(timeSlotsDetails.data.data);
      } catch (error) {
        toast.error(
          "Something went wrong while fetching doctor's time slots details",
          {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    };

    fetchTimeSlots();
  }, [doctor._id]);

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
        availableDates={next7Days.map((day, i) => addDays(new Date(), i))}
      />

      <div className="mb-6">
        <h3 className="text-neutral-700 font-semibold mb-3">
          Available Slots:
        </h3>
        {!dayAvailability ? (
          <div className="text-neutral-500 py-4">
            No slots available for {format(selectedDate, "EEEE")}. Please select
            another date.
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
              Sign In or Sign Up
            </Link>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
