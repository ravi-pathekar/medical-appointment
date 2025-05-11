"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

import DoctorCard from "./doctorCard";
import SortOptions from "./sortOptions";
import DoctorsFilter from "./doctorsFilter";

import { Doctor } from "../../types/Doctors";
import { doctorsDetails } from "../../constants/doctorsData";

const doctorsList = () => {
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
  const [filteredDoctorsData, setFilteredDoctorsData] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    try {
      setDoctorsData(doctorsDetails);
      setFilteredDoctorsData(doctorsDetails);
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let result = doctorsData;
    if (searchInput) {
      result = doctorsData.filter((doctor) =>
        doctor.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilteredDoctorsData(result);
  }, [doctorsData, searchInput]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSort = (sortOption: string) => {
    let sorted = [...filteredDoctorsData];

    switch (sortOption) {
      case "experience":
        sorted.sort((a, b) => b.experience - a.experience);
        break;
      case "rating":
        sorted.sort((a, b) => b.ratings - a.ratings);
        break;
      case "fee-low":
        sorted.sort((a, b) => a.consultationFee - b.consultationFee);
        break;
      case "fee-high":
        sorted.sort((a, b) => b.consultationFee - a.consultationFee);
        break;
      default:
        break;
    }

    setFilteredDoctorsData(sorted);
  };

  return (
    <>
      <section className="bg-primary-50 py-12 px-4">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-primary-800 mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find A Doctor
            </motion.h1>
            <motion.p
              className="text-lg text-primary-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connect with Trusted Healthcare Experts for Personalized Care
            </motion.p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search Doctors"
              value={searchInput}
              onChange={handleSearchInput}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-black"
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 py-16">
              <DoctorsFilter />
            </div>
            <div className="md:w-3/4">
              <SortOptions onSortChange={handleSort} />

              <div className="space-y-6">
                {filteredDoctorsData.map((doctor, index) => (
                  <DoctorCard key={index} doctor={doctor} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default doctorsList;
