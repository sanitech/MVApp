import React, { useEffect, useState } from "react";
import CategoryCards from "../../../components/CategoryCards";
import axios from "axios";
import RoomVendorCard from "../../../components/Room/RoomVendorCard";
import RoomRegistrationForm from "../../../components/Room/RoomRegistrationForm";
import { Link } from "react-router-dom";

interface roomsCategoryProps {
  category_id: string;
  category_name: string;
  category_type: string;
  created_by_vendor_id: string;
  icon: string;
}

const Rooms = () => {
  const [roomCategory, setRoomCategory] = useState<roomsCategoryProps[]>([]);
  const [rooms, setRooms] = useState<roomsCategoryProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/v1/room`);
      setRooms(response.data);
      setError(null); // Clear any existing errors on successful fetch
    } catch (error) {
      setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom(); // Call the function here
  }, []);

  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4">
          {/* {roomCategory.map((roomCategories) => {
            return (
              // <CategoryCards
              //   category_id={roomCategories.category_id}
              //   category_name={roomCategories.category_name}
              //   category_type={roomCategories.category_type}
              //   created_by_vendor_id={roomCategories.created_by_vendor_id}
              //   icon={roomCategories.icon}
              // />
            // );
          })} */}
        </div>
        <div className="flex flex-row items-center justify-between py-4">
          <div className="font-bold mb-3 text-lg text-gray-900">Room</div>
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
            Add Room
          </Link>
        </div>

        <div className="flex flex-wrap gap-4">
          {rooms.map((room) => {
            return <RoomVendorCard room={room} fetchRooms={fetchRoom} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
