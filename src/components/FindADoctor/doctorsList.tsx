"use client";

import { Doctor } from "@/types/Doctors";
import React, { useEffect, useState } from "react";
import { doctorsDetails } from "../../constants/doctorsData";
import DoctorCard from "./doctorCard";

const doctorsList = () => {
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
  console.log("🚀 ~ doctorsList ~ 8 - doctorsData:", doctorsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setDoctorsData(doctorsDetails);
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log("🚀 ~ doctorsList ~ 21 - doctorsData:", doctorsData);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="space-y-6">
          {doctorsData.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
      {/* doctorsList */}
    </div>
  );
};

export default doctorsList;
