import React, { useState } from "react";

interface Interest {
  label: string;
  icon: string;
  selected: boolean;
}

const InterestsCheckbox: React.FC = () => {
  const [interests, setInterests] = useState<Interest[]>([
    { label: "Gaming", icon: "🎮", selected: false },
    { label: "Golf", icon: "🏌️‍♂️", selected: false },
    { label: "Fitness", icon: "💪", selected: false },
    { label: "Skiing", icon: "🎿", selected: false },
    { label: "Biking", icon: "🚴‍♂️", selected: false },
    { label: "Sailing", icon: "⛵", selected: false },
    { label: "Climbing", icon: "🧗‍♂️", selected: false },
    { label: "Hiking", icon: "🥾", selected: false },
    { label: "Hiking", icon: "♻️", selected: false },
  ]);

  const toggleInterest = (index: number) => {
    setInterests((prevInterests) =>
      prevInterests.map((interest, i) =>
        i === index ? { ...interest, selected: !interest.selected } : interest
      )
    );
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-black mb-4">Your interests</h3>
      <div className="flex flex-wrap gap-4">
        {interests.map((interest, index) => (
          <label className="flex flex-col items-center">
            <input
              type="checkbox"
              className="hidden peer"
              // name={day.day}
              // onChange={handleDayChange}
            />
            <div className="peer-checked:bg-black peer-checked:text-white bg-transparent p-4  rounded-full flex justify-center items-center text-black border-2 border-white shadow-md transition-colors cursor-pointer">
              <div> {interest.icon}</div>
              <span>{interest.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InterestsCheckbox;
