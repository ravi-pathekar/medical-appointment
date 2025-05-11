import React, { useState } from "react";
import { FaSort } from "react-icons/fa";

type Props = {
  onSortChange: (sortOptions: string) => void;
};

export default function SortOptions({ onSortChange }: Props) {
  const [sortOption, setSortOption] = useState("relevance");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div className="flex items-center justify-end mb-6">
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm px-3 py-2 flex items-center">
        <FaSort className="text-primary-600 mr-2" />
        <span className="text-sm text-neutral-600 font-medium mr-2">
          Sort By
        </span>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="bg-transparent border-none text-neutral-800 text-sm font-medium focus:ring-0"
        >
          <option value="relevance">Relevance</option>
          <option value="experience">Experience</option>
          <option value="rating">Rating</option>
          <option value="fee-low">Fee: Low to High</option>
          <option value="fee-high">Fee: High to Low</option>
        </select>
      </div>
    </div>
  );
}
