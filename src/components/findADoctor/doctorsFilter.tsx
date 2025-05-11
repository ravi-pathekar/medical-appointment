import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const specialities = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Psychiatry',
  'Endocrinology',
  'Ophthalmology',
  'Gastroenterology',
  'Pulmonology',
];

const cities = [
  'New York',
  'San Francisco',
  'Chicago',
  'Boston',
  'Miami',
  'Seattle',
  'Los Angeles',
  'Dallas',
  'Houston',
  'Atlanta',
];

export default function FilterSection() {
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [searchSpeciality, setSearchSpeciality] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const toggleSpeciality = (speciality: string) => {
    setSelectedSpecialities(prev => 
      prev.includes(speciality) 
        ? prev.filter(s => s !== speciality)
        : [...prev, speciality]
    );
  };

  const toggleCity = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  const filteredSpecialities = specialities.filter(s => 
    s.toLowerCase().includes(searchSpeciality.toLowerCase())
  );

  const filteredCities = cities.filter(c => 
    c.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 h-fit"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-800">Filters</h3>
        <FaFilter className="text-primary-600" />
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium text-neutral-700 mb-3">Specialities</h4>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search Speciality"
            className="w-full p-2 text-sm border border-neutral-200 rounded-md text-black"
            value={searchSpeciality}
            onChange={(e) => setSearchSpeciality(e.target.value)}
          />
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto scroll-container">
          {filteredSpecialities.map((speciality) => (
            <div key={speciality} className="flex items-center">
              <input
                type="checkbox"
                id={`speciality-${speciality}`}
                checked={selectedSpecialities.includes(speciality)}
                onChange={() => toggleSpeciality(speciality)}
                className="h-4 w-4 text-black focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor={`speciality-${speciality}`}
                className="ml-2 text-sm text-neutral-700"
              >
                {speciality}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium text-neutral-700 mb-3">Select City</h4>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search City"
            className="w-full p-2 text-sm border border-neutral-200 rounded-md text-black"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto scroll-container">
          {filteredCities.map((city) => (
            <div key={city} className="flex items-center">
              <input
                type="checkbox"
                id={`city-${city}`}
                checked={selectedCities.includes(city)}
                onChange={() => toggleCity(city)}
                className="h-4 w-4 text-black focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor={`city-${city}`}
                className="ml-2 text-sm text-neutral-700"
              >
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-neutral-700 mb-3">Gender</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="gender-male"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label
              htmlFor="gender-male"
              className="ml-2 text-sm text-neutral-700"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="gender-female"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label
              htmlFor="gender-female"
              className="ml-2 text-sm text-neutral-700"
            >
              Female
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}