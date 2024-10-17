import React, { useState } from "react";

const ProfileSettings = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="text-gray-600 mb-6">
          Manage your name, password, and account settings.
        </p>

        {/* Avatar Upload */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex justify-center items-center overflow-hidden">
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">No avatar</span>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
            <label
              htmlFor="avatar-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500"
            >
              Upload photo
            </label>
            <button
              className="ml-4 text-red-500 hover:underline"
              onClick={() => setAvatar(null)}
            >
              Delete
            </button>
            <p className="text-gray-500 mt-2">Pick a photo up to 1MB.</p>
          </div>
        </div>

        {/* Cover Photo Upload */}
        <div className="mb-8">
          <div className="border-dashed border-2 border-gray-300 p-6 flex flex-col justify-center items-center">
            {cover ? (
              <img
                src={URL.createObjectURL(cover)}
                alt="cover"
                className="w-full max-h-40 object-cover"
              />
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="cover-upload"
                  onChange={(e) => setCover(e.target.files?.[0] || null)}
                />
                <label
                  htmlFor="cover-upload"
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Drop your file here or browse
                </label>
                <p className="text-gray-500">Pick a photo up to 2MB.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Location</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option>Country</option>
              {/* Add more options here */}
            </select>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Save changes
          </button>
          <button className="bg-gray-200 px-6 py-2 rounded-lg">Cancel</button>
        </div>
      </section>

      {/* Password Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Password</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-2">Current password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">New password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Confirm password</label>
            <input
              type="password"
              placeholder="Repeat new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Change
          </button>
          <a href="#" className="text-blue-600 hover:underline">
            I forgot my password
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProfileSettings;
