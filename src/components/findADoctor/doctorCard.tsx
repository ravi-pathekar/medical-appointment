"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Doctor {
  doctor: {
    // id: string
    name: string;
    speciality: string;
    experience: number;
    photo: string;
  };
}

const doctorCard = ({ doctor }: Doctor) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center space-x-4">
        <Image
          src={doctor.photo}
          alt={doctor.name}
          height={24}
          width={24}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.speciality}</p>
          <p className="text-sm text-gray-500">
            {doctor.experience}+ years of experience
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default doctorCard;
