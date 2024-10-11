import React, { useContext, useEffect, useState } from "react";
import MenuCategoryCard from "../../components/VendorDashboard/Menu/MenuCategory";
import MenuCard from "../../components/VendorDashboard/Menu/MenuCard";
import MenuCategoryCardAdd from "../../components/VendorDashboard/Menu/MenuCategoryAdd";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteConformation from "../../components/AdminDashboard/DeleteConformation";

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
  nutrition: string[];
  available_day: string[];
  start_time: string;
  end_time: string;
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
      <div className="flex flex-row items-center justify-between ">
        <div className="font-bold mb-3 text-lg text-gray-900">Menu</div>
        <Link
          to={"create"}
          className="px-3 py-2 shadow-md  capitalize text-md hover:shadow-lg cursor-pointer flex gap-1 items-center bg-black text-white rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width={20}
            height={20}
            className="bi bi-plus-lg size-5 text-gray-50"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
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
              onDeleteFetchMenu={() => fetchMenu()}
            />
          ))
        ) : (
          <p>No menu items available</p> // Handle case when menu is empty
        )}
      </div>
    </div>
  );
};

export default VendorMenu;
