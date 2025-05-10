export const doctorsDetails = [
    {
      name: 'Dr. Sarah Johnson',
      speciality: 'Cardiology',
      qualifications: ['MD', 'FACC', 'FSCAI'],
      experience: 12,
      bio: 'Dr. Johnson is a board-certified cardiologist with expertise in interventional cardiology and heart failure management.',
      photo: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      consultationFee: 150,
      languages: ['English', 'Spanish'],
      availability: [
        {
          day: 'Monday',
          slots: [
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
          ]
        },
        {
          day: 'Wednesday',
          slots: [
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
          ]
        },
        {
          day: 'Friday',
          slots: [
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
          ]
        }
      ],
      location: {
        hospital: 'City Heart Institute',
        address: '123 Cardiology Lane',
        city: 'New York'
      },
      ratings: 4.8,
      reviews: 128
    },
    {
      name: 'Dr. Michael Chen',
      speciality: 'Neurology',
      qualifications: ['MD', 'PhD', 'FAAN'],
      experience: 15,
      bio: 'Dr. Chen specializes in treating neurological disorders with a particular focus on stroke prevention and treatment.',
      photo: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      consultationFee: 180,
      languages: ['English', 'Mandarin'],
      availability: [
        {
          day: 'Tuesday',
          slots: [
            { start: '08:30', end: '09:00', isAvailable: true },
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
          ]
        },
        {
          day: 'Thursday',
          slots: [
            { start: '13:00', end: '13:30', isAvailable: true },
            { start: '13:30', end: '14:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
            { start: '16:00', end: '16:30', isAvailable: true },
            { start: '16:30', end: '17:00', isAvailable: true },
          ]
        }
      ],
      location: {
        hospital: 'Neuro Health Center',
        address: '456 Brain Avenue',
        city: 'San Francisco'
      },
      ratings: 4.9,
      reviews: 203
    },
    {
      name: 'Dr. Amelia Rodriguez',
      speciality: 'Pediatrics',
      qualifications: ['MD', 'FAAP'],
      experience: 8,
      bio: 'Dr. Rodriguez is dedicated to providing comprehensive pediatric care from infancy through adolescence.',
      photo: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      consultationFee: 120,
      languages: ['English', 'Spanish'],
      availability: [
        {
          day: 'Monday',
          slots: [
            { start: '08:00', end: '08:30', isAvailable: true },
            { start: '08:30', end: '09:00', isAvailable: true },
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
          ]
        },
        {
          day: 'Wednesday',
          slots: [
            { start: '08:00', end: '08:30', isAvailable: true },
            { start: '08:30', end: '09:00', isAvailable: true },
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
          ]
        },
        {
          day: 'Friday',
          slots: [
            { start: '13:00', end: '13:30', isAvailable: true },
            { start: '13:30', end: '14:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
          ]
        }
      ],
      location: {
        hospital: 'Children\'s Wellness Center',
        address: '789 Pediatric Circle',
        city: 'Chicago'
      },
      ratings: 4.7,
      reviews: 156
    },
    {
      name: 'Dr. James Wilson',
      speciality: 'Orthopedics',
      qualifications: ['MD', 'FAAOS'],
      experience: 14,
      bio: 'Dr. Wilson specializes in sports medicine and joint replacement surgery with a focus on minimally invasive techniques.',
      photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      consultationFee: 160,
      languages: ['English'],
      availability: [
        {
          day: 'Monday',
          slots: [
            { start: '13:00', end: '13:30', isAvailable: true },
            { start: '13:30', end: '14:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
          ]
        },
        {
          day: 'Tuesday',
          slots: [
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
          ]
        },
        {
          day: 'Thursday',
          slots: [
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
          ]
        }
      ],
      location: {
        hospital: 'Joint & Spine Specialists',
        address: '321 Orthopedic Drive',
        city: 'Boston'
      },
      ratings: 4.6,
      reviews: 187
    },
    {
      name: 'Dr. Emily Patel',
      speciality: 'Dermatology',
      qualifications: ['MD', 'FAAD'],
      experience: 10,
      bio: 'Dr. Patel is an experienced dermatologist treating a wide range of skin conditions from common to complex.',
      photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      consultationFee: 140,
      languages: ['English', 'Hindi'],
      availability: [
        {
          day: 'Tuesday',
          slots: [
            { start: '13:00', end: '13:30', isAvailable: true },
            { start: '13:30', end: '14:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
            { start: '16:00', end: '16:30', isAvailable: true },
            { start: '16:30', end: '17:00', isAvailable: true },
          ]
        },
        {
          day: 'Wednesday',
          slots: [
            { start: '13:00', end: '13:30', isAvailable: true },
            { start: '13:30', end: '14:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
            { start: '16:00', end: '16:30', isAvailable: true },
            { start: '16:30', end: '17:00', isAvailable: true },
          ]
        },
        {
          day: 'Friday',
          slots: [
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
          ]
        }
      ],
      location: {
        hospital: 'Dermatology Partners',
        address: '567 Skin Care Way',
        city: 'Miami'
      },
      ratings: 4.8,
      reviews: 143
    },
    {
      name: 'Dr. Robert Thompson',
      speciality: 'Psychiatry',
      qualifications: ['MD', 'FAPA'],
      experience: 13,
      bio: 'Dr. Thompson provides compassionate mental health care with expertise in mood disorders and anxiety management.',
      photo: 'https://images.pexels.com/photos/5215015/pexels-photo-5215015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      consultationFee: 170,
      languages: ['English', 'French'],
      availability: [
        {
          day: 'Monday',
          slots: [
            { start: '09:00', end: '09:30', isAvailable: true },
            { start: '09:30', end: '10:00', isAvailable: true },
            { start: '10:00', end: '10:30', isAvailable: true },
            { start: '10:30', end: '11:00', isAvailable: true },
            { start: '11:00', end: '11:30', isAvailable: true },
            { start: '11:30', end: '12:00', isAvailable: true },
          ]
        },
        {
          day: 'Thursday',
          slots: [
            { start: '13:00', end: '13:30', isAvailable: true },
            { start: '13:30', end: '14:00', isAvailable: true },
            { start: '14:00', end: '14:30', isAvailable: true },
            { start: '14:30', end: '15:00', isAvailable: true },
            { start: '15:00', end: '15:30', isAvailable: true },
            { start: '15:30', end: '16:00', isAvailable: true },
            { start: '16:00', end: '16:30', isAvailable: true },
            { start: '16:30', end: '17:00', isAvailable: true },
          ]
        }
      ],
      location: {
        hospital: 'Mind Wellness Center',
        address: '890 Mental Health Avenue',
        city: 'Seattle'
      },
      ratings: 4.7,
      reviews: 91
    }
  ]