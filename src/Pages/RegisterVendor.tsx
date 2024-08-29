import React, { FormEvent, useState } from "react";
import { useMultiForm } from "../components/useMultiForm";
import BusinessForm from "../components/BusinessForm";
import LoginCredentials from "../components/LoginCredentials";
import UploadDocuments from "../components/UploadDocuments";
import "../reg.css";
import { vendorRegisterCategory } from "../Constant/Data";
import BusinessAddress from "../components/BusinessAddress";
import SocialMediaAndCheckiIn from "../components/SocialMediaAndCheckiIn";
const RegisterVendor = () => {
  type FormData = {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address: string;
    tin: number;
    vendor_name: string;
    description: string;
    vendor_logo: string;
    vendor_website: string;
    vendor_type: string;
    amenities: string;
    reservation_required: string;
    checkin_time: string; //-- Specific to hotels
    checkout_time: string; // -- Specific to hotels
    dietary_options: string; //-- Specific to restaurants/cafes: Vegan, Gluten-Free, etc.
    pet_friendly: string;
    average_room_price: string; // -- Specific to hotels
    meal_price_range: string; //-- Specific to restaurants/cafes"
    max_capacity: string;
    branches: [
      {
        branch_address: string;
        branch_city: string;
        branch_state: string;
        branch_country: string;
        branch_zipcode: string;
        branch_region: string;
        branch_latitude: string;
        branch_longitude: string;
      }
    ];
    vendor_phones: [];
    vendor_checkIn_times: [];
    vendor_social_media: [];
    vendor_images: [];
  };
  const INITIAL_DATA: FormData = {
    username: "Vangard22",
    email: "Vangard22@example.com",
    password: "password123",
    first_name: "Sani",
    last_name: "Doe",
    address:
      "Main Branch Address is  addis ababe Specific to restaurants/cafes: Vegan, Gluten-Free, etc.",
    tin: 56,
    vendor_name: "Hawi Hotel",
    description: "Luxury hotel chain ababe ",
    vendor_logo: "",
    vendor_website: "http://fenithotel.com",
    vendor_type: "cafe",
    amenities: "", // Example: Wi-Fi, Parking, Pool, Gym, etc.
    reservation_required: "true",
    checkin_time: "", //-- Specific to hotels
    checkout_time: "", // -- Specific to hotels
    dietary_options: "", //-- Specific to restaurants/cafes: Vegan, Gluten-Free, etc.
    pet_friendly: "true",
    average_room_price: "5000", // -- Specific to hotels
    meal_price_range: "$$$$", //-- Specific to restaurants/cafes"
    max_capacity: "3000",
    branches: [
      {
        branch_address: "Branch 1 Address",
        branch_city: "Hawasa",
        branch_state: "State1",
        branch_country: "Germany",
        branch_zipcode: "12345",
        branch_region: "South",
        branch_latitude: "12.345678",
        branch_longitude: "98.765432",
      },
    ],
    vendor_phones: [],
    vendor_checkIn_times: [],
    vendor_social_media: [],
    vendor_images: [],
  };

  const [data, setData] = useState(INITIAL_DATA);

  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    }); // eslint-disable-line
  };
  const {
    step,
    steps,
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep,
    setCurrentStepIndex,
  } = useMultiForm([
    <BusinessForm {...data} updateFields={updateFields} />,
    <LoginCredentials {...data} updateFields={updateFields} />,
    <UploadDocuments {...data} updateFields={updateFields} />,
    <BusinessAddress {...data} updateFields={updateFields} />,
    <SocialMediaAndCheckiIn {...data} updateFields={updateFields} />,
  ]);

  const vendorRegisterHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("dad");
    console.log(data);
  };
  return (
    <div>
      <div className="demo-page">
        <div className="demo-page-navigation">
          <nav>
            <ul>
              {vendorRegisterCategory.map((registryCategory, index) => {
                return (
                  <li>
                    <a
                      href={`#${registryCategory.link}`}
                      onClick={() => setCurrentStepIndex(index)}
                    >
                      {registryCategory.icon}
                      {registryCategory.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <main className="demo-page-content">
          <form onSubmit={vendorRegisterHandler}>
            <section>
              {step}
              <div className="mt-5 flex justify-end gap-x-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={back}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLastStep ? "Submit" : "Next"}
                </button>
              </div>
            </section>
          </form>
          <footer>Made with ♥ for CSS</footer>
        </main>
      </div>
    </div>
  );
};

export default RegisterVendor;
