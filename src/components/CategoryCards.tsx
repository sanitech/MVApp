import React, { useState } from "react";

interface roomsCategoryProps {
  category_id: string;
  business_type_id: string;
  category_name: string;
  icon: string | null;
  business_type_name: string;
}

const CategoryCards: React.FC<roomsCategoryProps> = ({
  category_id,
  category_name,
  business_type_name,
  icon,
}) => {
  return (
    <label className="flex flex-col items-center">
      <input
        type="checkbox"
        className="hidden peer"
        // name={day.day}
        // onChange={handleDayChange}
      />
      <div className="peer-checked:bg-black peer-checked:text-white bg-transparent px-4 py-3  rounded-full flex justify-center items-center text-black border-2 border-white shadow-md transition-colors cursor-pointer">
        <span>{category_name}</span>
      </div>
    </label>
  );
};

export default CategoryCards;
