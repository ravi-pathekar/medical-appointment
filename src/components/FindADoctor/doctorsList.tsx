"use client";

import { Doctor } from "@/types/Doctors";
import React, { useEffect, useState } from "react";
import { doctorsDetails } from "../../constants/doctorsData";
import DoctorCard from "./doctorCard";
import { FaSearch } from "react-icons/fa";

const doctorsList = () => {
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
  const [filteredDoctorsData, setFilteredDoctorsData] = useState<Doctor[]>([]);
  console.log("🚀 ~ doctorsList ~ 8 - doctorsData:", doctorsData);
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
    console.log("🚀 ~ handleSearchInput ~ e:", e);
    setSearchInput(e.target.value);
  };

  console.log("🚀 ~ doctorsList ~ 21 - doctorsData:", doctorsData);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search Doctors"
            value={searchInput}
            onChange={handleSearchInput}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="space-y-6">
          {filteredDoctorsData.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default doctorsList;
