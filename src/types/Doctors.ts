export interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

export interface TimeSlotsDetails {
  day: string;
  slots: TimeSlot[];
}

export interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  qualifications: string[];
  experience: number;
  bio: string;
  photo: string;
  consultationFee: number;
  languages: string[];
  location: {
    hospital: string;
    address: string;
    city: string;
  };
  ratings: number;
  reviews: number;
}
