import { useState } from "react";
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";

interface DateSelectorProps {
  onDateSelect?: (date: Date) => void;
  availableDates: Date[];
}

export default function DateSelector({
  onDateSelect,
  availableDates,
}: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const getDayName = (date: Date) => {
    return format(date, "EEE");
  };

  return (
    <div className="mb-6">
      <h3 className="text-neutral-700 font-semibold mb-3">Select Date</h3>
      <div className="flex space-x-2 overflow-x-auto py-2 px-1 no-scrollbar">
        {availableDates.map((date, index) => (
          <motion.div
            key={date.toString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => handleDateSelect(date)}
            className={`calendar-day ${
              isSameDay(date, selectedDate) ? "calendar-day-selected" : ""
            } ${isSameDay(date, new Date()) ? "calendar-day-today" : ""}`}
          >
            <span className="text-xs font-medium">{getDayName(date)}</span>
            <span className="text-lg font-bold">{format(date, "d")}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
