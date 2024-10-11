import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { daysOfWeek, nutritionalIcon } from "../../Constant/Data";
import { json } from "stream/consumers";
import Toasts from "../../components/Toasts";

type categoryProps = {
  category_id: string;
  category_name: string;
  description: string;
  vendor_id: number;
  created_at: string;
  updated_at: string;
};

type formDataProps = {
  item: string;
  vendor_id: string;
  category_id: string;
  price: number;
  image_url: File | null;
  description: string;
  nutritionalInfo: NutritionalInfo;
};

interface NutritionalInfo {
  calories: string;
  fat: string;
  protein: string;
  carbs: string;
  fiber: string;
  sodium: string;
}

const MenuCreate = () => {
  const [category, setCategory] = useState<categoryProps[]>([]);
  let [errors, setError] = useState<formDataProps>({
    item: "",
    vendor_id: "",
    category_id: "",
    price: 0,
    image_url: null,
    description: "",
    nutritionalInfo: {
      calories: "",
      fat: "",
      protein: "",
      carbs: "",
      fiber: "",
      sodium: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const [formData, setFormData] = useState<formDataProps>({
    item: "",
    vendor_id: "",
    category_id: "",
    price: 0,
    image_url: null,
    description: "",
    nutritionalInfo: {
      calories: "",
      fat: "",
      protein: "",
      carbs: "",
      fiber: "",
      sodium: "",
    },
  });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [availability, setAvailability] = useState({
    days: [],
    startTime: "",
    endTime: "",
  });

  // Add the following function to handle the day selection
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      setAvailability((prevState: any) => ({
        ...prevState,
        days: [...prevState.days, day],
      }));
    } else {
      setAvailability((prevState) => ({
        ...prevState,
        days: prevState.days.filter((d) => d !== day),
      }));
    }
  };

  // Add the following function to handle the start time change
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability((prevState) => ({
      ...prevState,
      startTime: e.target.value,
    }));
  };

  // Add the following function to handle the end time change
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability((prevState) => ({ ...prevState, endTime: e.target.value }));
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/v1/menu/category/vendor/${user.vendor_id}`
      );
      setCategory(response.data);
      // setError({});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        setError(message);
      } else {
        // setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category_id: e.target.value });
  };

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, item: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, price: parseFloat(e.target.value) });
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

  const handleNutritionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const decimalValue = value.match(/^\d*\.?\d{0,2}$/);

    if (decimalValue) {
      setFormData((prevState) => ({
        ...prevState,
        nutritionalInfo: { ...prevState.nutritionalInfo, [name]: value },
      }));
    }
  };

  // Create menu function
  const handleMenuCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    const formDataToSend = new FormData();
    formDataToSend.append("item", formData.item);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("vendor_id", user.vendor_id);
    formDataToSend.append("Neutral", JSON.stringify(formData.nutritionalInfo));
    if (formData.image_url) {
      formDataToSend.append("item_image", formData.image_url);
    }
    formDataToSend.append("description", formData.description);
    formDataToSend.append("availability", JSON.stringify(availability));

    console.log(formDataToSend);
    try {
      const response = await axios.post("/v1/menus", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Menu created successfully", response.data);
      setToastMessage("Category created successfully.");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      setSuccessMessage(response.data.message);
      // Reset form and clear error message
      setFormData({
        item: "",
        vendor_id: "",
        category_id: "",
        price: 0,
        image_url: null,
        description: "",
        nutritionalInfo: {
          calories: "",
          fat: "",
          protein: "",
          carbs: "",
          fiber: "",
          sodium: "",
        },
      });
      setAvailability({
        days: [],
        startTime: "",
        endTime: "",
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

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleMenuCreate}>
          <div className="bg-white rounded-xl shadow ">
            <div className="pt-0 p-4 sm:pt-0 sm:p-7">
              <div className="space-y-4 sm:space-y-6">
                {/* Category Dropdown */}
                <div className="space-y-2">
                  <h1 className="inline-block text-xl font-bold mt-2.5 ">
                    Category
                  </h1>
                  <select
                    id="af-submit-app-category"
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a category</option>
                    {category.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
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
                    Item name
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
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="Enter Menu name"
                    value={formData.item}
                    onChange={handleItemNameChange}
                  />
                  {errors.item && (
                    <p className="text-red-500 text-sm">{errors.item}</p>
                  )}
                </div>

                {/* Price input */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-project-url"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Price
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
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="250 ETB"
                    value={formData.price}
                    onChange={handlePriceChange}
                  />
                </div>

                {/* Image upload */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-upload-images"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Preview image
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
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="Enter a description of the menu item"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                  />
                </div>

                {/* accordion */}
                <div className="hs-accordion-group">
                  <div
                    className="hs-accordion"
                    id="hs-basic-no-arrow-heading-one"
                  >
                    <button
                      className="hs-accordion-toggle hs-accordion-active:text-gray-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none "
                      aria-expanded="true"
                      aria-controls="hs-basic-no-arrow-collapse-one"
                      type="button"
                    >
                      Detail About Menu
                    </button>
                    <div
                      id="hs-basic-no-arrow-collapse-one"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                      role="region"
                      aria-labelledby="hs-basic-no-arrow-heading-one"
                    >
                      {/* Availability */}
                      <div className="space-y-2">
                        <label
                          htmlFor="af-submit-app-description"
                          className="inline-block text-sm font-medium mt-2.5"
                        >
                          Availability
                          <span className="text-sm text-gray-400 dark:text-neutral-600">
                            (Optional)
                          </span>
                        </label>
                        <div className="flex justify-start items-start sm:justify-center sm:items-center space-x-10 flex-col sm:flex-row">
                          <div className="flex gap-4 p-4 flex-wrap rounded-full justify-center bg-gray-50 border-gray-600 border-2 w-fit">
                            {daysOfWeek.map((day) => {
                              return (
                                <label className="flex flex-col items-center">
                                  <input
                                    type="checkbox"
                                    className="hidden peer"
                                    name={day.day}
                                    onChange={handleDayChange}
                                  />
                                  <div className="peer-checked:bg-black peer-checked:text-white bg-transparent w-12 h-12 rounded-full flex justify-center items-center text-black border-2 border-white shadow-md transition-colors cursor-pointer">
                                    {day.day}
                                  </div>
                                </label>
                              );
                            })}
                          </div>

                          <div className="flex my-4 flex-col sm:flex-row justify-center items-start space-x-4">
                            <div className="text-gray-700 whitespace-nowrap my-2">
                              Available Time
                            </div>
                            <div className="flex justify-start items-center space-x-4">
                              <input
                                className="bg-white h-10 w-24 px-2 outline-none border-gray-300 border rounded-lg shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                placeholder="8:30am"
                                type="time"
                                name="start"
                                value={availability.startTime}
                                onChange={handleStartTimeChange}
                              />
                              <div className="text-gray-400">To:</div>

                              <input
                                className="bg-white h-10 w-24 px-2 outline-none border-gray-300 border rounded-lg shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                placeholder="10:30am"
                                type="time"
                                name="end"
                                value={availability.endTime}
                                onChange={handleEndTimeChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Nutritional Information */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700">
                          Nutritional Information
                          <span className="text-sm text-gray-400 dark:text-neutral-600">
                            (Optional)
                          </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2  gap-4 mt-2">
                          <div className="max-w-sm space-y-3">
                            <div>
                              <label
                                htmlFor="hs-input-with-leading-and-trailing-icon"
                                className="block text-sm font-medium mb-2 "
                              >
                                calories
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="hs-input-with-leading-and-trailing-icon"
                                  name="calories"
                                  className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none border"
                                  placeholder="0.00"
                                  value={formData.nutritionalInfo.calories}
                                  onChange={handleNutritionalChange}
                                  min="1"
                                  max="5"
                                  step="0.01"
                                />
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-2">
                                  <span className="text-gray-500 dark:text-neutral-300">
                                    {nutritionalIcon}
                                  </span>
                                </div>
                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                                  <span className="text-gray-500 dark:text-neutral-500">
                                    (g)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="max-w-sm space-y-3">
                            <div>
                              <label
                                htmlFor="hs-input-with-leading-and-trailing-icon"
                                className="block text-sm font-medium mb-2 "
                              >
                                Protein
                              </label>
                              <div className="relative">
                                <input
                                  type="decimalInput"
                                  id="hs-input-with-leading-and-trailing-icon"
                                  name="protein"
                                  className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none border"
                                  placeholder="0.00"
                                  value={formData.nutritionalInfo.protein}
                                  onChange={handleNutritionalChange}
                                  minLength={1}
                                  maxLength={5}
                                  step={0.01}
                                  pattern="^\d*(\.\d{0,2})?$"
                                />
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-2">
                                  <span className="text-gray-500 dark:text-neutral-300">
                                    {nutritionalIcon}
                                  </span>
                                </div>
                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                                  <span className="text-gray-500 dark:text-neutral-500">
                                    (g)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="max-w-sm space-y-3">
                            <div>
                              <label
                                htmlFor="hs-input-with-leading-and-trailing-icon"
                                className="block text-sm font-medium mb-2 "
                              >
                                Fat
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="hs-input-with-leading-and-trailing-icon"
                                  name="fat"
                                  className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none border"
                                  placeholder="0.00"
                                  value={formData.nutritionalInfo.fat}
                                  onChange={handleNutritionalChange}
                                  min="1"
                                  max="5"
                                  step="0.01"
                                />
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-2">
                                  <span className="text-gray-500 dark:text-neutral-300">
                                    {nutritionalIcon}
                                  </span>
                                </div>
                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                                  <span className="text-gray-500 dark:text-neutral-500">
                                    (g)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="max-w-sm space-y-3">
                            <div>
                              <label
                                htmlFor="hs-input-with-leading-and-trailing-icon"
                                className="block text-sm font-medium mb-2 "
                              >
                                Carbs
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="hs-input-with-leading-and-trailing-icon"
                                  name="carbs"
                                  className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none border"
                                  placeholder="0.00"
                                  value={formData.nutritionalInfo.carbs}
                                  onChange={handleNutritionalChange}
                                  min="1"
                                  max="5"
                                  step="0.01"
                                />
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-2">
                                  <span className="text-gray-500 dark:text-neutral-300">
                                    {nutritionalIcon}
                                  </span>
                                </div>
                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                                  <span className="text-gray-500 dark:text-neutral-500">
                                    (g)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="max-w-sm space-y-3">
                            <div>
                              <label
                                htmlFor="hs-input-with-leading-and-trailing-icon"
                                className="block text-sm font-medium mb-2 "
                              >
                                Fiber
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="hs-input-with-leading-and-trailing-icon"
                                  name="fiber"
                                  className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none border"
                                  placeholder="0.00"
                                  value={formData.nutritionalInfo.fiber}
                                  onChange={handleNutritionalChange}
                                  min="1"
                                  max="5"
                                  step="0.01"
                                />
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-2">
                                  <span className="text-gray-500 dark:text-neutral-300">
                                    {nutritionalIcon}
                                  </span>
                                </div>
                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                                  <span className="text-gray-500 dark:text-neutral-500">
                                    (g)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="max-w-sm space-y-3">
                            <div>
                              <label
                                htmlFor="hs-input-with-leading-and-trailing-icon"
                                className="block text-sm font-medium mb-2 "
                              >
                                Sodium
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="hs-input-with-leading-and-trailing-icon"
                                  name="sodium"
                                  className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none border"
                                  placeholder="0.00"
                                  value={formData.nutritionalInfo.sodium}
                                  onChange={handleNutritionalChange}
                                  min="1"
                                  max="5"
                                  step="0.01"
                                />
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-2">
                                  <span className="text-gray-500 dark:text-neutral-300">
                                    {nutritionalIcon}
                                  </span>
                                </div>
                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                                  <span className="text-gray-500 dark:text-neutral-500">
                                    (mg)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* {successMessage && (
                <p
                  className="text-base py-3 px-2 rounded-sm bg-green-300 text-green-600 mt-2"
                  id="email-error"
                >
                  {successMessage}
                </p>
              )} */}

              {/* Submit button */}
              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Submit Menu
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

export default MenuCreate;
