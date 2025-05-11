export interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

export interface Availability {
  day: string;
  slots: TimeSlot[];
}

export interface Doctor {
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
  availability: Availability[];
  ratings: number;
  reviews: number;
}
