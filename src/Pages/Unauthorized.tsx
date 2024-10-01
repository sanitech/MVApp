import React from "react";
// import unauthorizedImage from "../assets/images/unauthorized.jpg";
const unauthorizedImage = require("../assets/images/unauthorized.png");
const Unauthorized = () => {
  return (
    <div className="flex  justify-center items-center">
      <div className="max-w-md h-full flex justify-center items-center flex-col">
        <img
          src={unauthorizedImage}
          alt="Unauthorized"
          className="w-2/3 self-center"
        />

        <h1 className="text-4xl font-bold text-center text-gray-900">
          Unauthorized
        </h1>
        <p className="text-lg text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
