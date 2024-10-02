import React, { useContext, useEffect, useState } from "react";
import MenuCategoryCard from "../../components/VendorDashboard/Menu/MenuCategory";
import MenuCard from "../../components/VendorDashboard/Menu/MenuCard";
import MenuCategoryCardAdd from "../../components/VendorDashboard/Menu/MenuCategoryAdd";
import axios from "axios";
import { Link } from "react-router-dom";

type categoryProps = {
  category_id: string;
  category_name: string;
  description: string;
  vendor_id: number;
  created_at: string;
  updated_at: string;
  menuItemCount: number;
};

type menuProps = {
  item_id: string;
  item_name: string;
  base_price: number;
  description: string;
  image_url: string;
  category_name: string;
  category_id: string;
  available: boolean;
};

const VendorMenu = () => {
  const [category, setCategory] = useState<categoryProps[]>([]);
  const [menu, setMenu] = useState<menuProps[]>([]); // Initialize as an empty array
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletedCategory, setDeletedCategory] = useState<string | null>(null);
  const [deletedMenuId, setDeletedMenuId] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/v1/menu/category/vendor/${user.vendor_id}`
      );
      setCategory(response.data);
      setError(null); // Clear any existing errors on successful fetch
    } catch (error) {
      setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/v1/menus/vendor/${user.vendor_id}`);
      console.log(response.data);
      setMenu(response.data);
      setError(null); // Clear any existing errors on successful fetch
    } catch (error) {
      setError("Error fetching menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenu = async () => {
    console.log(deletedMenuId);
    if (deletedMenuId) {
      setLoading(true);
      try {
        await axios.delete(`/v1/menus/${deletedMenuId}`);
        setMenu(menu.filter((menu) => menu.item_id !== deletedMenuId));
        setDeletedMenuId(null);
        setError(null); // Clear any existing errors on successful delete
      } catch (error) {
        setError("Error deleting menu item");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchMenu();
  }, []);

  return (
    <div className="p-8 bg-white rounded-xl shadow">
      {/* Category section */}
      <div className="font-bold mb-3 text-lg text-gray-900">Categories</div>
      <div className="flex gap-6 flex-row overflow-y-auto no-scrollbar py-3 bg-slate-50 mb-9">
        <MenuCategoryCardAdd />
        {category.map((category) => (
          <MenuCategoryCard key={category.category_id} category={category} />
        ))}
      </div>

      {/* Menu section */}
      <div className="flex flex-row items-center justify-between">
        <div className="font-bold mb-3 text-lg text-gray-900">Menu</div>
        <Link
          to={"create"}
          className="p-3 shadow-md font-medium capitalize text-md hover:shadow-lg cursor-pointer flex gap-2 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-plus-lg size-5 text-gray-900"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
          Add menu
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 py-3 gap-4">
        {menu?.length > 0 ? (
          menu.map((menu) => (
            <MenuCard
              menu={menu}
              key={menu.item_id}
              onDelete={() => setDeletedMenuId(menu.item_id)}
            />
          ))
        ) : (
          <p>No menu items available</p> // Handle case when menu is empty
        )}
      </div>
      {/* Error message */}
      <div
        id="hs-danger-alert"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
        role="dialog"
        // tabIndex="-1"
        aria-labelledby="hs-danger-alert-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
          <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-danger-alert"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-10 overflow-y-auto">
              <div className="flex gap-x-4 md:gap-x-7">
                {/* <!-- Icon --> */}
                <span className="shrink-0 inline-flex justify-center items-center size-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                  <svg
                    className="shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </span>
                {/* <!-- End Icon --> */}

                <div className="grow">
                  <h3
                    id="hs-danger-alert-label"
                    className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200"
                  >
                    Delete Personal Account
                  </h3>
                  <p className="text-gray-500 dark:text-neutral-500">
                    Permanently remove your Personal Account and all of its
                    contents from the Vercel platform. This action is not
                    reversible, so please continue with caution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-neutral-950 dark:border-neutral-800">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                data-hs-overlay="#hs-danger-alert"
              >
                Cancel
              </button>
              <button
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleDeleteMenu}
              >
                Delete personal account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorMenu;
