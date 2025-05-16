"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { parseISO, isAfter } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaCalendarAlt } from "react-icons/fa";

import AppointmentsCard from "./AppointmentsCard";

import axiosInstance from "../../utils/axiosInstance";
import { Appointment } from "../../types/Appointment";
import { showErrorToast, showSuccessToast } from "../common/toatNotification";
import axios from "axios";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { isSignedIn, isLoaded, getToken } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
        });
        const appointmentsDetails = await axios.get(
          "/api/appointments/get-appointments",
          {
            headers: {
              token,
            },
          }
        );
        setAppointments(appointmentsDetails.data.data);
      } catch (error) {
        showErrorToast("Something went wrong while fetching appointments");
        console.error("Something went wrong while fetching appointments", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (id: string) => {
    try {
      if (!id) return;
      const token = await getToken({
        template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      });
      const response = await axios.patch(
        `/api/appointments/cancel-appointment`,
        {
          id 
        },
        {
          headers: {
            token,
          },
        }
      );
      console.log("🚀 ~ handleCancelAppointment ~ response:", response.status)

      if (response.status === 200) {
        // Update the appointments list
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id
              ? { ...appointment, status: "cancelled" }
              : appointment
          )
        );
        showSuccessToast("Appointment cancelled successfully");
      } else {
        showErrorToast("Something went wrong while cancelling appointment");
        console.error("Something went wrong while cancelling appointment", response);
      }
    } catch (error) {
      showErrorToast("Something went wrong while cancelling appointment");
      console.error(error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "upcoming") {
      return isAfter(parseISO(appointment.date), new Date()) && appointment.status === "upcoming";
    }
    return appointment.status === statusFilter;
  });

  // This will display the loader until the clerk signed in status is loaded or not
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!isSignedIn ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Please sign in or sign-up to view your appointments
          </h3>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
