import axios from "axios";
import { url } from "inspector";
import React, { useEffect, useState } from "react";
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
  item: string;
  category_id: string;
  price: number;
  image_url: File | null;
  description: string;
};

const MenuEdit = () => {
  const [category, setCategory] = useState<categoryProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menu = location.state; // Assuming menu details come from location

  // Use menu data for initial form population
  const [formData, setFormData] = useState<formDataProps>({
    item: menu.item_name || "",
    category_id: menu.category_id || "",
    price: menu.price || 0,
    image_url: menu.image_url,
    description: menu.description || "",
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
      setFormData({
        ...formData,
        image_url:
          e.target.files && e.target.files[0] ? e.target.files[0] : null,
      });
      menu.image_url = URL.createObjectURL(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleMenuUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("item", formData.item);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("price", formData.price.toString());
    if (formData.image_url) {
      formDataToSend.append("item_image", formData.image_url);
    }
    formDataToSend.append("description", formData.description);

    try {
      console.log(formData);
      const response = await axios.put(
        `http://localhost:5000/api/v1/menus/${menu.item_id}`, // Use PUT for updating
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage(response.data.message);
      navigate("/dashboard/menu", { state: successMessage });
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
        <form onSubmit={handleMenuUpdate}>
          <div className="bg-white rounded-xl shadow  py-5">
            <div className="pt-0 p-4 sm:pt-0 sm:p-7">
              <h1 className="text-gray-900 font-bold text-2xl">update menu</h1>
              <div className="space-y-4 sm:space-y-6">
                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-category"
                    className="inline-block text-sm font-medium mt-2.5"
                  >
                    Category
                  </label>
                  <select
                    id="af-submit-app-category"
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a category</option>
                    {category.map((cat) => (
                      <option
                        key={cat.category_id}
                        value={cat.category_id}
                        selected={menu.category_id === cat.category_id}
                      >
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
                  <input
                    id="af-submit-app-upload-images"
                    type="file"
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  {formData.image_url && (
                    <img
                      className="size-1/2 mx-auto shadow-md"
                      src={menu.image_url}
                      alt=""
                    />
                  )}
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
                  Submit your project
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuEdit;
