import React from "react";
import MenuCategoryCardAdd from "../../../components/VendorDashboard/Menu/MenuCategoryAdd";
import MenuCategoryCard from "../../../components/AdminDashboard/MenuCategoryCard";
import { Link } from "react-router-dom";

const AdminMenuCategory = () => {
  return (
    <div className="bg-neutral-200/70 px-6 py-8 rounded-lg ">
      <Link
        className="py-3 px-4 mb-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        to={"create"}
      >
        Add Category
      </Link>

      <div className="flex flex-wrap">
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
        <MenuCategoryCard />
      </div>

      
    </div>
  );
};

export default AdminMenuCategory;
