"use client";

import { useState, useEffect } from "react";
import { parseISO, isAfter } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaCalendarAlt } from "react-icons/fa";

import AppointmentsCard from "./AppointmentsCard";

import { Appointment } from "../../types/Appointment";
import { appointmentsData } from "../../constants/appointmentsData";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setAppointments(appointmentsData);
      } catch (error) {
        console.log("🚀 ~ fetchAppointments ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (id: string) => {
    try {
      if (!id) return;
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (response.ok) {
        const updatedAppointment = await response.json();

        // Update the appointments list
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id
              ? { ...appointment, status: "cancelled" }
              : appointment
          )
        );

        console.log("Appointment cancelled successfully");
      } else {
        const data = await response.json();
        console.log(data.error || "Failed to cancel appointment");
      }
    } catch (error) {
      console.log("An error occurred");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "upcoming") {
      return isAfter(parseISO(appointment.date), new Date());
    }
    return appointment.status === statusFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            My Appointments
          </h2>

          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 py-2 px-3 bg-white text-gray-700 hover:border-gray-400 transition duration-200 ease-in-out"
            >
              <option value="all">All Appointments</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredAppointments.length > 0 ? (
        <div className="space-y-6">
          <AnimatePresence>
            {filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AppointmentsCard
                  appointment={appointment}
                  onCancel={() => handleCancelAppointment(appointment?._id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FaCalendarAlt className="text-gray-400 text-4xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600 mb-6">
            {statusFilter === "all"
              ? "You don't have any appointments yet."
              : `You don't have any ${statusFilter} appointments.`}
          </p>
        </div>
      )}
    </div>
  );
}
