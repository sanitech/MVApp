import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RoomVendorCard = ({ room, fetchRooms }: any) => {
  const [amenity, setAmenity] = useState(JSON.parse(room.amenities) || []);
  const navigation = useNavigate();

  const handleDelete = async () => {
    alert("Are you sure you want to delete this room?");
    await axios
      .delete(`/v1/room/${room.room_id}`)
      .then(() => {
        fetchRooms();
        navigation("/dashboard/rooms");
      })
      .catch((error) => {
        console.error("Error deleting room:", error);
      });
  };
  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white">
      {/* Discount Banner */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover cursor-pointer"
          src="https://th.bing.com/th/id/R.b1ca75de8562f991b7432f431423a917?rik=3tdt8wkPlVgyvA&pid=ImgRaw&r=0"
          alt="Villa"
          onClick={() =>
            navigation(`${room.room_id}`, { state: { room: room } })
          }
        />
        <div className="absolute top-2 left-[-3px] bg-red-500 shadow-xl text-white text-sm px-2 py-1 rounded-tr-full rounded-br-full rounded-tl-full">
          75% Off
        </div>
        <div className="absolute top-2 right-2">
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              stroke="red"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10 12V17"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M14 12V17"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M4 7H20"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 py-2">
        <div className="flex space-x-2 mb-2">
          {Array.isArray(amenity) &&
            amenity.slice(0, 3).map((amenityItem: any) => {
              return (
                <span
                  key={amenityItem}
                  className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {amenityItem}
                </span>
              );
            })}
        </div>
        <div className="flex justify-between items-start">
          {/* Title */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {room.room_name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {room.description}
            </p>
          </div>

          {/* Rating and Price */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-yellow-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <span className="text-gray-900 font-semibold">4.73</span>
          </div>
        </div>

        <div className="flex justify-between mt-3 items-center">
          {/* Icons */}
          <div className="flex items-center space-x-4 mt-4 text-gray-600 text-sm ring-gray-400 border ring-1 rounded-full py-1 px-2 w-fit">
            {/* Bed Icon */}
            <div className="flex items-center space-x-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M19 20V18.5M5 20V18.5"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M2 15C2 14.0681 2 13.6022 2.15224 13.2346C2.35523 12.7446 2.74458 12.3552 3.23463 12.1522C3.60218 12 4.06812 12 5 12H19C19.9319 12 20.3978 12 20.7654 12.1522C21.2554 12.3552 21.6448 12.7446 21.8478 13.2346C22 13.6022 22 14.0681 22 15C22 15.9319 22 16.3978 21.8478 16.7654C21.6448 17.2554 21.2554 17.6448 20.7654 17.8478C20.3978 18 19.9319 18 19 18H5C4.06812 18 3.60218 18 3.23463 17.8478C2.74458 17.6448 2.35523 17.2554 2.15224 16.7654C2 16.3978 2 15.9319 2 15Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  ></path>{" "}
                  <path
                    d="M21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  ></path>{" "}
                  <path
                    d="M18.5 12V10.5C18.5 8.61438 18.5 7.67157 17.9142 7.08579C17.3284 6.5 16.3856 6.5 14.5 6.5H9.5C7.61438 6.5 6.67157 6.5 6.08579 7.08579C5.5 7.67157 5.5 8.61438 5.5 10.5V12"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  ></path>{" "}
                  <path d="M12 7V12" stroke="#1C274C" stroke-width="1.5"></path>{" "}
                </g>
              </svg>
              <span>3</span>
            </div>
            {/* Bath Icon */}
            <div className="flex items-center space-x-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.826 6.07601C11.4937 6.38186 10.5 7.57488 10.5 9V9.75H16.5V9C16.5 7.6504 15.6088 6.50894 14.3828 6.132C14.6183 5.61186 15.1419 5.25 15.75 5.25C16.5784 5.25 17.25 5.92157 17.25 6.75L17.25 12.75H4.5V14.25H5.25L5.25 18C5.25 19.2426 6.25736 20.25 7.5 20.25L16.5 20.25C17.7426 20.25 18.75 19.2426 18.75 18V14.25H19.5V12.75H18.75L18.75 6.75C18.75 5.09315 17.4069 3.75 15.75 3.75C14.3249 3.75 13.1319 4.7437 12.826 6.07601ZM6.75 14.25H17.25V18C17.25 18.4142 16.9142 18.75 16.5 18.75L7.5 18.75C7.08579 18.75 6.75 18.4142 6.75 18L6.75 14.25ZM13.5 7.5C14.0552 7.5 14.54 7.80165 14.7993 8.25H12.2007C12.46 7.80165 12.9448 7.5 13.5 7.5Z"
                    fill="#080341"
                  ></path>{" "}
                </g>
              </svg>
              <span>2</span>
            </div>
            {/* Guest Icon */}
            <div className="flex items-center space-x-1 ">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 30 30"
                version="1.1"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>group</title>{" "}
                  <path d="M20.906 20.75c1.313 0.719 2.063 2 1.969 3.281-0.063 0.781-0.094 0.813-1.094 0.938-0.625 0.094-4.563 0.125-8.625 0.125-4.594 0-9.406-0.094-9.75-0.188-1.375-0.344-0.625-2.844 1.188-4.031 1.406-0.906 4.281-2.281 5.063-2.438 1.063-0.219 1.188-0.875 0-3-0.281-0.469-0.594-1.906-0.625-3.406-0.031-2.438 0.438-4.094 2.563-4.906 0.438-0.156 0.875-0.219 1.281-0.219 1.406 0 2.719 0.781 3.25 1.938 0.781 1.531 0.469 5.625-0.344 7.094-0.938 1.656-0.844 2.188 0.188 2.469 0.688 0.188 2.813 1.188 4.938 2.344zM3.906 19.813c-0.5 0.344-0.969 0.781-1.344 1.219-1.188 0-2.094-0.031-2.188-0.063-0.781-0.188-0.344-1.625 0.688-2.25 0.781-0.5 2.375-1.281 2.813-1.375 0.563-0.125 0.688-0.469 0-1.656-0.156-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.25-2.313 1.438-2.719 1-0.375 2.125 0.094 2.531 0.938 0.406 0.875 0.188 3.125-0.25 3.938-0.5 0.969-0.406 1.219 0.156 1.375 0.125 0.031 0.375 0.156 0.719 0.313-1.375 0.563-3.25 1.594-4.219 2.188zM24.469 18.625c0.75 0.406 1.156 1.094 1.094 1.813-0.031 0.438-0.031 0.469-0.594 0.531-0.156 0.031-0.875 0.063-1.813 0.063-0.406-0.531-0.969-1.031-1.656-1.375-1.281-0.75-2.844-1.563-4-2.063 0.313-0.125 0.594-0.219 0.719-0.25 0.594-0.125 0.688-0.469 0-1.656-0.125-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.219-2.313 1.406-2.719 1.031-0.375 2.156 0.094 2.531 0.938 0.406 0.875 0.25 3.125-0.188 3.938-0.5 0.969-0.438 1.219 0.094 1.375 0.375 0.125 1.563 0.688 2.75 1.313z"></path>{" "}
                </g>
              </svg>
              <span>{room.capacity}</span>
            </div>
          </div>

          <div className="text-right">
            {/* <p className="text-sm text-gray-500 line-through">$10,000</p> */}
            <p className="text-lg font-bold text-gray-900">
              {new Intl.NumberFormat("am-ET", {
                style: "currency",
                currency: "ETB",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(room.price_per_night)}
              <span className="text-sm text-gray-500">/n</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomVendorCard;
