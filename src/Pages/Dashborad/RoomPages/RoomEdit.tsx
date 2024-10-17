import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { daysOfWeek, nutritionalIcon } from "../../../Constant/Data";
import { json } from "stream/consumers";
import Toasts from "../../../components/Toasts";
import CategoryCards from "../../../components/CategoryCards";
import RoomRegistrationForm from "../../../components/Room/RoomRegistrationForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";

type categoryProps = {
  category_id: string;
  category_name: string;
  description: string;
  vendor_id: number;
  created_at: string;
  updated_at: string;
};

type formDataProps = {
  roomName: string;
  vendor_id: string;
  category_id: string;
  price: number;
  image_url: File | null;
  description: string;
  bedType: string;
  roomCapacity: number;
  amenity: string[] | null;
};

interface roomsCategoryProps {
  category_id: string;
  category_name: string;
  category_type: string;
  created_by_vendor_id: string;
  icon: string;
}

interface amenityProps {
  category_id: string;
  business_type_id: string;
  category_name: string;
  icon: string | null;
  business_type_name: string;
}

const RoomEdit = () => {
  const location = useLocation();
  const { room } = location.state;

  console.log("cat", room);
  const navigate = useNavigate();

  const [category, setCategory] = useState<categoryProps[]>([]);
  let [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const amenities = JSON.parse(room.amenities);
  const imageUrl = room.image_url.replace("localhost", "192.168.0.123");
  const [formData, setFormData] = useState<formDataProps>({
    roomName: room.room_name,
    vendor_id: user.vendor_id,
    category_id: room.category_id,
    price: parseFloat(room.price_per_night),
    image_url: null,
    description: room.description,
    bedType: room.bed_type,
    roomCapacity: room.capacity,
    amenity: amenities,
  });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [roomCategory, setRoomCategory] = useState<roomsCategoryProps[]>([]);
  const [amenity, setAmenity] = useState<amenityProps[]>([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category_id: e.target.value });
  };

  const handleBadTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, bedType: e.target.value });
  };

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, roomName: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, price: parseFloat(e.target.value) });
  };
  const handleRoomCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, roomCapacity: parseFloat(e.target.value) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image_url: e.target.files[0] });
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amenity = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        amenity: [...(prevState.amenity || []), amenity],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        amenity: (prevState.amenity?.filter((a) => a !== (amenity as string)) ||
          []) as string[] | null,
      }));
    }
  };

  const handleError = (err: any) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data.message || "Something went wrong.");
      setToastMessage(err.response?.data.message || "Something went wrong.");
    } else {
      setError(err.message || "An unexpected error occurred.");
      setToastMessage(err.message || "An unexpected error occurred.");
    }
    setToastType("error");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const fetchRoomCategory = async () => {
    const businessType = JSON.parse(localStorage.getItem("userData") || "{}");
    setLoading(true);
    try {
      const response = await axios.get(`/v1/category/rooms`);
      setRoomCategory(response.data);
      // setError(null); // Clear any existing errors on successful fetch
    } catch (error) {
      // setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomAmenity = async () => {
    const businessType = JSON.parse(localStorage.getItem("userData") || "{}");
    setLoading(true);
    try {
      const response = await axios.get(`/v1/category/amenity`);
      setAmenity(response.data);
      // setError(null); // Clear any existing errors on successful fetch
    } catch (error) {
      // setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  // update room function
  const handleRoomEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    const formDataToSend = new FormData();
    formDataToSend.append("roomName", formData.roomName);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("amenity", `${JSON.stringify(formData.amenity)}`);
    formDataToSend.append("roomCapacity", `${formData.roomCapacity}`);
    formDataToSend.append("bedType", formData.bedType);
    formDataToSend.append(
      "price",
      formData.price !== null ? formData.price.toString() : ""
    );
    formDataToSend.append("vendor_id", user.vendor_id);
    if (formData.image_url) {
      formDataToSend.append("item_image", formData.image_url);
    }
    formDataToSend.append("description", formData.description);

    console.log(formDataToSend);
    try {
      const response = await axios.put(
        `/v1/room/${room.room_id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Room update successfully", response.data);
      setToastMessage("Room update successfully.");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate(-1);
      }, 5000);
      setSuccessMessage(response.data.message);
      // Reset form and clear error message
      setFormData({
        roomName: "",
        vendor_id: "",
        category_id: "",
        price: 0,
        image_url: null,
        description: "",
        bedType: "",
        roomCapacity: 0,
        amenity: null,
      });

      // setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error);
      } else {
        // setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchRoomCategory(); // Call the function here
    fetchRoomAmenity();
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleRoomEdit}>
          <div className="bg-white rounded-xl shadow ">
            <div className="pt-0 p-4 sm:pt-0 sm:p-7">
              <div className="space-y-4 sm:space-y-6">
                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label className="inline-block text-sm font-medium mt-2.5">
                    Category
                    <div className="hs-tooltip inline-block">
                      <svg
                        className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>

                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                        role="tooltip"
                      >
                        Please Select Category
                      </span>
                    </div>
                  </label>
                  <select
                    id="af-submit-app-category"
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a category</option>
                    {roomCategory.map((cat) => (
                      <option key={cat?.category_id} value={cat?.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Item name input */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-project-name"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Room name
                    <div className="hs-tooltip inline-block">
                      <svg
                        className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>

                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                        role="tooltip"
                      >
                        Item name must be include
                      </span>
                    </div>
                  </label>
                  <input
                    id="af-submit-app-project-name"
                    type="text"
                    className="py-2 px-3 block w-full border-gray-200 border shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="Enter Room name"
                    value={formData.roomName}
                    onChange={handleItemNameChange}
                  />
                </div>

                {/* Price input */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-project-url"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Room Price
                    <div className="hs-tooltip inline-block">
                      <svg
                        className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                        role="tooltip"
                      >
                        price include
                      </span>
                    </div>
                  </label>
                  <input
                    id="af-submit-project-url"
                    type="text"
                    className="py-2 px-3 block w-full border-gray-200 border shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="250 ETB"
                    value={formData.price}
                    onChange={handlePriceChange}
                  />
                </div>

                {/* Bed Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-project-url"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Bed Type
                    <div className="hs-tooltip inline-block">
                      <svg
                        className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                        role="tooltip"
                      >
                        price include
                      </span>
                    </div>
                  </label>

                  <select
                    name="bedType"
                    id="bedType"
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    value={formData.bedType}
                    onChange={handleBadTypeChange}
                  >
                    <option value="">Select Bed Type</option>
                    <option value="single_bed">Single Bed</option>
                    <option value="double_bed">Double Bed</option>
                    <option value="queen_bed">Queen Bed</option>
                    <option value="king_bed">King Bed</option>
                    <option value="twin_bed">Twin Bed</option>
                    <option value="twin_xl_bed">Twin XL Bed</option>
                    <option value="full_bed">Full Bed</option>
                    <option value="bunk_bed">Bunk Bed</option>
                    <option value="sofa_bed">Sofa Bed</option>
                    <option value="futon_bed">Futon Bed</option>
                    <option value="murphy_bed">Murphy Bed</option>
                  </select>
                </div>

                {/* Room Capacity */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-project-url"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Room Capacity
                    <div className="hs-tooltip inline-block">
                      <svg
                        className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                        role="tooltip"
                      >
                        price include
                      </span>
                    </div>
                  </label>
                  <input
                    id="af-submit-project-url"
                    type="text"
                    className="py-2 px-3 block w-full border-gray-200 border shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="250 ETB"
                    value={formData.roomCapacity}
                    onChange={handleRoomCapacityChange}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-project-url"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Amenities
                    <div className="hs-tooltip inline-block">
                      <div className="flex flex-wrap gap-4 mt-2">
                        {amenity &&
                          amenity.map((amenity, index) => {
                            if (
                              amenity.business_type_name === "Hotel" ||
                              amenity.business_type_name === "global"
                            ) {
                              return (
                                <label className="flex flex-col items-center">
                                  <input
                                    type="checkbox"
                                    className="hidden peer"
                                    name={amenity.category_name}
                                    defaultChecked={amenities.includes(
                                      amenity.category_name
                                    )}
                                    onChange={(e) => {
                                      const { name, checked } = e.target;
                                      if (checked) {
                                        // Add the amenity to the array when checked
                                        setFormData((prevState) => ({
                                          ...prevState,
                                          amenity: [
                                            ...(prevState.amenity || []),
                                            name,
                                          ],
                                        }));
                                      } else {
                                        // Remove the amenity from the array when unchecked
                                        setFormData((prevState) => ({
                                          ...prevState,
                                          amenity:
                                            prevState.amenity?.filter(
                                              (a) => a !== name
                                            ) || [],
                                        }));
                                      }
                                    }}
                                  />
                                  <div className="peer-checked:bg-black peer-checked:text-white bg-transparent px-4 py-3  rounded-full flex justify-center items-center text-black border-2 border-white shadow-md transition-colors cursor-pointer">
                                    <span>{amenity.category_name}</span>
                                  </div>
                                </label>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </label>
                </div>

                {/* Image upload */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-upload-images"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Room image
                  </label>
                </div>

                <div className="sm:col-span-9">
                  <label
                    htmlFor="af-submit-app-upload-images"
                    className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2 dark:border-neutral-700"
                  >
                    <input
                      id="af-submit-app-upload-images"
                      name="af-submit-app-upload-images"
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleImageUpload(e)}
                    />
                    <svg
                      className="size-10 mx-auto text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                      />
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                    </svg>
                    <span className="mt-2 block text-sm text-gray-800 ">
                      Browse your device or{" "}
                      <span className="group-hover:text-gray-700 text-gray-600">
                        drag 'n drop'
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-gray-500 ">
                      Maximum file size is 2 MB
                    </span>
                  </label>
                  <div className="flex justify-center items-center mt-4">
                    {formData.image_url && (
                      <img
                        className="h-56"
                        src={URL.createObjectURL(formData.image_url)}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                {/* Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-description"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Description
                  </label>
                  <textarea
                    id="af-submit-app-description"
                    className="py-2 px-3 block w-full border-gray-200 border shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="Enter a description of the menu item"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Update Room
                </button>
              </div>
            </div>
            {showToast && <Toasts type={toastType} message={toastMessage} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomEdit;
