import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConformation from "../../AdminDashboard/DeleteConformation";
import { ErrorHandler } from "../../../context/ErrorHandler";

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

type MenuCardProps = {
  menu: menuProps;
  onDeleteFetchMenu: () => void;
};
const MenuCard: React.FC<MenuCardProps> = ({ menu, onDeleteFetchMenu }) => {
  const [deletedMenuId, setDeletedMenuId] = useState<string | null>(null);
  const navigate = useNavigate();

  const imageChanger = menu.image_url.replace(
    "localhost:5000",
    "localhost:5000"
    // "mvapp.ixtechsoloutions.com"
  );

  const handleDeleteMenu = async (id: any) => {
    if (deletedMenuId) {
      // setLoading(true);
      try {
        await axios.delete(`/v1/menus/${id}`);
        setDeletedMenuId(null);
        onDeleteFetchMenu();
      } catch (error) {
        // setError("Error deleting menu item");
        ErrorHandler(error);
      } finally {
        // setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-50  shadow-lg rounded-md relative">
      <img
        className="w-full h-56 object-cover"
        src={imageChanger}
        // src="https://static.vecteezy.com/system/resources/previews/014/033/554/non_2x/hamburger-fries-and-cola-free-png.png"
        alt=""
      />
      <div className="flex flex-col p-3 ">
        <div className="font-medium text-sm text-gray-400">
          {menu.category_name}
        </div>
        <div className="font-medium text-lg text-gray-900">
          {menu.item_name}
        </div>
        <div className="font-normal text-gray-500 text-sm  line-clamp-2">
          {menu.description}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-sm font-medium">
            ${menu.base_price}
          </span>
        </div>
        {menu.start_time && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">{menu.start_time}</span>
            <span>-</span>
            <span className="text-gray-500 text-sm">{menu.end_time}</span>
          </div>
        )}
      </div>
      <div className="flex">
        <div
          onClick={() =>
            navigate(`/dashboard/menu/edit/${menu.item_id}`, { state: menu })
          }
          className="btn flex-1 py-1 px-6 bg-green-200 flex justify-center items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil-square size-4"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
        </div>
        <Link
          to={"/dashboard/menu/id"}
          className="btn flex-1 py-1 px-6 bg-orange-200 flex justify-center items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye size-4 text-gray-900"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
        </Link>
        <Link
          className="btn flex-1 py-2 px-6 bg-red-200 flex justify-center items-center cursor-pointer"
          type="button"
          to={""}
          onClick={() => setDeletedMenuId(menu.item_id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3 text-red-600 size-4"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </Link>
      </div>
      {/* model deletedCategory */}
      {deletedMenuId ? (
        <DeleteConformation
          modelStatus={() => setDeletedMenuId("")}
          onDelete={() => handleDeleteMenu(menu.item_id)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MenuCard;
