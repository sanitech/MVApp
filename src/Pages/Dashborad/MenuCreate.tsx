import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { daysOfWeek } from "../../Constant/Data";

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
};

const MenuCreate = () => {
  const [category, setCategory] = useState<categoryProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const [formData, setFormData] = useState<formDataProps>({
    item: "",
    vendor_id: "1", // Example vendor_id, replace with actual vendor_id
    category_id: "",
    price: 0,
    image_url: null,
    description: "",
  });

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/menu/category"
      );
      setCategory(response.data);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        setError(message);
      } else {
        setError("An unknown error occurred");
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

  // Create menu function
  const handleMenuCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("item", formData.item);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("vendor_id", user.vendor_id);
    if (formData.image_url) {
      formDataToSend.append("item_image", formData.image_url);
    }
    formDataToSend.append("description", formData.description);

    console.log(formDataToSend);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/menus", // Update to correct API endpoint
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Menu created successfully", response.data);
      setSuccessMessage(response.data.message);
      // Reset form and clear error message
      setFormData({
        item: "",
        vendor_id: "1", // Example vendor_id, replace with actual vendor_id
        category_id: "",
        price: 0,
        image_url: null,
        description: "",
      });
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        setError(message);
      } else {
        setError("An unknown error occurred");
      }
    }
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
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
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
                  </label>
                  <input
                    id="af-submit-app-project-name"
                    type="text"
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter Menu name"
                    value={formData.item}
                    onChange={handleItemNameChange}
                  />
                </div>

                {/* Price input */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-project-url"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Price
                  </label>
                  <input
                    id="af-submit-project-url"
                    type="text"
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700"
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
                        fill-rule="evenodd"
                        d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                      />
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                    </svg>
                    <span className="mt-2 block text-sm text-gray-800 ">
                      Browse your device or{" "}
                      <span className="group-hover:text-blue-700 text-blue-600">
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
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter a description of the menu item"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                {/* Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-description"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Availability
                  </label>
                  <div className="flex justify-center items-center space-x-10">
                    <div className="flex gap-4 p-4 rounded-full bg-gray-50 border-gray-600 border-2 w-fit">
                      {daysOfWeek.map((day) => {
                        return (
                          <label className="flex flex-col items-center">
                            <input type="checkbox" className="hidden peer" />
                            <div className="peer-checked:bg-white peer-checked:text-purple-500 bg-transparent w-12 h-12 rounded-full flex justify-center items-center text-black border-2 border-white shadow-md transition-colors">
                              {day.day}
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex flex-row justify-center items-center space-x-4">
                      <div className="text-gray-700"> Available Time</div>

                      <input
                        className="bg-white h-10 w-20 px-2 outline-none border-gray-300 border rounded-lg shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="8:30am"
                        type="text"
                        name=""
                        id=""
                      />
                      <div className="text-gray-400">To:</div>

                      <input
                        className="bg-white h-10 w-20 px-2 outline-none border-gray-300 border rounded-lg shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="10:30am"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p
                  className="text-base py-3 px-2 rounded-sm bg-red-300 text-red-600 mt-2"
                  id="email-error"
                >
                  {error}
                </p>
              )}
              {successMessage && (
                <p
                  className="text-base py-3 px-2 rounded-sm bg-green-300 text-green-600 mt-2"
                  id="email-error"
                >
                  {successMessage}
                </p>
              )}

              {/* Submit button */}
              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Submit Menu Item
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuCreate;
