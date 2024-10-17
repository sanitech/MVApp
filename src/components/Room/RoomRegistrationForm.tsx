import React, { useState } from "react";

interface RoomFormData {
  roomName: string;
  category: string;
  price: number;
  seasonalRates: { season: string; rate: number }[];
  amenities: string[];
  customAmenity: string;
  capacity: number;
  bedType: string;
  availabilitySchedule: string;
  roomImages: File[];
  roomDescription: string;
}

const RoomRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RoomFormData>({
    roomName: "",
    category: "",
    price: 0,
    seasonalRates: [{ season: "", rate: 0 }],
    amenities: [],
    customAmenity: "",
    capacity: 1,
    bedType: "",
    availabilitySchedule: "",
    roomImages: [],
    roomDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedAmenities = checked
      ? [...formData.amenities, value]
      : formData.amenities.filter((amenity) => amenity !== value);
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const handleCustomAmenity = () => {
    if (
      formData.customAmenity &&
      !formData.amenities.includes(formData.customAmenity)
    ) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, formData.customAmenity],
        customAmenity: "",
      });
    }
  };

  const handleSeasonalRateChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedSeasonalRates = [...formData.seasonalRates];
    updatedSeasonalRates[index] = {
      ...updatedSeasonalRates[index],
      [name]: value,
    };
    setFormData({ ...formData, seasonalRates: updatedSeasonalRates });
  };

  const addSeasonalRate = () => {
    setFormData({
      ...formData,
      seasonalRates: [...formData.seasonalRates, { season: "", rate: 0 }],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, roomImages: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Submit form data to backend
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">
        Advanced Room Registration Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Room Name */}
        <div>
          <label
            htmlFor="roomName"
            className="block text-sm font-medium text-gray-700"
          >
            Room Name
          </label>
          <input
            type="text"
            name="roomName"
            id="roomName"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            value={formData.roomName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Room Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Room Category
          </label>
          <select
            name="category"
            id="category"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="single_room">Single Room</option>
            <option value="double_room">Double Room</option>
            <option value="suite">Suite</option>
            <option value="deluxe_room">Deluxe Room</option>
          </select>
        </div>

        {/* Room Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Base Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Seasonal Rates */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seasonal Rates
          </label>
          {formData.seasonalRates.map((rate, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                name="season"
                placeholder="Season"
                className="p-2 border border-gray-300 rounded-lg w-1/2"
                value={rate.season}
                onChange={(e) => handleSeasonalRateChange(index, e)}
              />
              <input
                type="number"
                name="rate"
                placeholder="Rate"
                className="p-2 border border-gray-300 rounded-lg w-1/2"
                value={rate.rate}
                onChange={(e) => handleSeasonalRateChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            className="text-indigo-600"
            onClick={addSeasonalRate}
          >
            + Add Seasonal Rate
          </button>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amenities
          </label>
          <div className="flex flex-wrap space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="wifi"
                checked={formData.amenities.includes("wifi")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Wi-Fi</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="gym"
                checked={formData.amenities.includes("gym")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Gym</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="pool"
                checked={formData.amenities.includes("pool")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Swimming Pool</span>
            </label>
          </div>
          {/* Add custom amenity */}
          <div className="flex space-x-4 mt-4">
            <input
              type="text"
              placeholder="Add Custom Amenity"
              value={formData.customAmenity}
              onChange={(e) =>
                setFormData({ ...formData, customAmenity: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
            <button
              type="button"
              className="bg-indigo-600 text-white p-2 rounded-lg"
              onClick={handleCustomAmenity}
            >
              Add
            </button>
          </div>
        </div>

        {/* Room Capacity */}
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700"
          >
            Room Capacity
          </label>
          <input
            type="number"
            name="capacity"
            id="capacity"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            value={formData.capacity}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Bed Type */}
        <div>
          <label
            htmlFor="bedType"
            className="block text-sm font-medium text-gray-700"
          >
            Bed Type
          </label>
          <input
            type="text"
            name="bedType"
            id="bedType"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            value={formData.bedType}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Room Description */}
        <div>
          <label
            htmlFor="roomDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Room Description
          </label>
          <textarea
            name="roomDescription"
            id="roomDescription"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full h-28"
            value={formData.roomDescription}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Room Images */}
        <div>
          <label
            htmlFor="roomImages"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Room Images
          </label>
          <input
            type="file"
            name="roomImages"
            id="roomImages"
            multiple
            accept="image/*"
            className="mt-1"
            onChange={handleFileChange}
          />
          {formData.roomImages.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {Array.from(formData.roomImages).map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="Room Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full"
          >
            Register Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomRegistrationForm;
