import React, { useState } from "react";
import axios from "axios";

interface MenuItem {
  itemName: string;
  description: string;
  price: string;
  allergens: string[];
  category: string;
  isAvailable: boolean;
  availabilitySchedule: Availability[];
  nutritionalInfo: NutritionalInfo;
  image?: File | null;
}

interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

interface NutritionalInfo {
  calories: string;
  fat: string;
  protein: string;
  carbs: string;
  fiber: string;
  sodium: string;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MenuCreateForm: React.FC = () => {
  const [menuItem, setMenuItem] = useState<MenuItem>({
    itemName: "",
    description: "",
    price: "",
    allergens: [],
    category: "",
    isAvailable: true,
    availabilitySchedule: [],
    nutritionalInfo: {
      calories: "",
      fat: "",
      protein: "",
      carbs: "",
      fiber: "",
      sodium: "",
    },
    image: null,
  });

  const [availableAllergens] = useState<string[]>([
    "Gluten",
    "Dairy",
    "Nuts",
    "Soy",
    "Eggs",
    "Shellfish",
  ]);

  const [categories] = useState<string[]>([
    "Main Course",
    "Appetizers",
    "Beverages",
    "Desserts",
    "Salads",
    "Sides",
  ]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleAllergenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allergen = e.target.value;
    const isChecked = e.target.checked;

    setMenuItem((prevState) => ({
      ...prevState,
      allergens: isChecked
        ? [...prevState.allergens, allergen]
        : prevState.allergens.filter((a) => a !== allergen),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMenuItem({ ...menuItem, image: e.target.files[0] });
    }
  };

  const handleAvailabilityChange = (
    day: string,
    field: string,
    value: string
  ) => {
    setMenuItem((prevState) => {
      const schedule = prevState.availabilitySchedule.map((schedule) =>
        schedule.day === day ? { ...schedule, [field]: value } : schedule
      );
      return { ...prevState, availabilitySchedule: schedule };
    });
  };

  const toggleDay = (day: string) => {
    setMenuItem((prevState) => {
      const exists = prevState.availabilitySchedule.some(
        (schedule) => schedule.day === day
      );
      return {
        ...prevState,
        availabilitySchedule: exists
          ? prevState.availabilitySchedule.filter(
              (schedule) => schedule.day !== day
            )
          : [
              ...prevState.availabilitySchedule,
              { day, startTime: "", endTime: "" },
            ],
      };
    });
  };

  const handleNutritionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuItem((prevState) => ({
      ...prevState,
      nutritionalInfo: { ...prevState.nutritionalInfo, [name]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("itemName", menuItem.itemName);
    formData.append("description", menuItem.description);
    formData.append("price", menuItem.price);
    formData.append("category", menuItem.category);
    formData.append("isAvailable", String(menuItem.isAvailable));
    formData.append("allergens", menuItem.allergens.join(", "));
    formData.append(
      "availabilitySchedule",
      JSON.stringify(menuItem.availabilitySchedule)
    );
    formData.append(
      "nutritionalInfo",
      JSON.stringify(menuItem.nutritionalInfo)
    );

    if (menuItem.image) {
      formData.append("image", menuItem.image);
    }

    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/v1/menu/create",
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      setSuccess("Menu item created successfully!");
      setMenuItem({
        itemName: "",
        description: "",
        price: "",
        allergens: [],
        category: "",
        isAvailable: true,
        availabilitySchedule: [],
        nutritionalInfo: {
          calories: "",
          fat: "",
          protein: "",
          carbs: "",
          fiber: "",
          sodium: "",
        },
        image: null,
      });
    } catch (error) {
      console.error("Error creating menu item", error);
      setError("Failed to create menu item. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">
        Create New Menu Item
      </h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Item Name */}
        <div className="mb-6">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={menuItem.itemName}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={menuItem.category}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Allergens */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Allergens
          </label>
          <div className="grid grid-cols-2 gap-4">
            {availableAllergens.map((allergen) => (
              <div key={allergen} className="flex items-center">
                <input
                  type="checkbox"
                  id={allergen}
                  value={allergen}
                  checked={menuItem.allergens.includes(allergen)}
                  onChange={handleAllergenChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={allergen}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {allergen}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Schedule */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Availability Schedule
          </label>
          <div className="grid grid-cols-1 gap-4">
            {daysOfWeek.map((day) => {
              const selectedDay = menuItem.availabilitySchedule.find(
                (schedule) => schedule.day === day
              );
              return (
                <div key={day}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={day}
                      checked={!!selectedDay}
                      onChange={() => toggleDay(day)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={day}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {day}
                    </label>
                  </div>
                  {selectedDay && (
                    <div className="flex space-x-2 mt-2">
                      <input
                        type="time"
                        value={selectedDay.startTime}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            day,
                            "startTime",
                            e.target.value
                          )
                        }
                        className="w-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="time"
                        value={selectedDay.endTime}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            day,
                            "endTime",
                            e.target.value
                          )
                        }
                        className="w-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutritional Information */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">
            Nutritional Information
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              name="calories"
              placeholder="Calories"
              value={menuItem.nutritionalInfo.calories}
              onChange={handleNutritionalChange}
              className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="fat"
              placeholder="Fat (g)"
              value={menuItem.nutritionalInfo.fat}
              onChange={handleNutritionalChange}
              className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="protein"
              placeholder="Protein (g)"
              value={menuItem.nutritionalInfo.protein}
              onChange={handleNutritionalChange}
              className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="carbs"
              placeholder="Carbs (g)"
              value={menuItem.nutritionalInfo.carbs}
              onChange={handleNutritionalChange}
              className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="fiber"
              placeholder="Fiber (g)"
              value={menuItem.nutritionalInfo.fiber}
              onChange={handleNutritionalChange}
              className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="sodium"
              placeholder="Sodium (mg)"
              value={menuItem.nutritionalInfo.sodium}
              onChange={handleNutritionalChange}
              className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Item Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuCreateForm;
