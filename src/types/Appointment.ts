export interface TimeSlot {
  start: string;
  end: string;
}

export interface Doctor {
  // _id: string
  name: string;
  speciality: string;
  image: string;
  location: {
    hospital: string;
    city: string;
  };
}

export interface Appointment {
  _id: string;
  date: string;
  timeSlot: TimeSlot;
  reason: string;
  status: string;
  doctor: Doctor;
  createdAt: string;
  updatedAt: string;
}
