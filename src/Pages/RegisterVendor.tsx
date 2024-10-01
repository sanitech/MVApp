import React, { FormEvent, useState } from "react";
import axios from "axios"; // Import axios
import "../reg.css";
import { vendorRegisterCategory } from "../Constant/Data";
import { useNavigate } from "react-router-dom";
import { useMultiForm } from "../components/RegistrationForm/useMultiForm";
import BusinessForm from "../components/RegistrationForm/BusinessForm";
import LoginCredentials from "../components/RegistrationForm/LoginCredentials";
import BusinessAddress from "../components/RegistrationForm/BusinessAddress";
import SocialMediaAndCheckiIn from "../components/RegistrationForm/SocialMediaAndCheckiIn";
import UploadDocuments from "../components/RegistrationForm/UploadDocuments";

const RegisterVendor = () => {
  type Phone = {
    code: string;
    number: string;
  };

  type Branch = {
    address: string;
    phones: Phone[];
  };

  type SocialMedia = {
    platform: string;
    link: string;
  };

  type FormData = {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    tin: number;
    vendor_name: string;
    description: string;
    vendor_logo: File | null;
    vendor_website: string;
    vendor_type: string;
    branches: Branch[];
    vendor_checkIn_times: string[];
    vendor_social_media: SocialMedia[];
    property_images: File[] | null;
    license_image: File | null;
    work_day: string[] | null;
  };

  const INITIAL_DATA: FormData = {
    username: "Vangard22",
    email: "Vangard22@example.com",
    password: "password123",
    first_name: "Sani",
    last_name: "Doe",
    tin: 56,
    vendor_name: "Hawi Hotel",
    description: "Luxury hotel chain ababe",
    vendor_logo: null,
    vendor_website: "http://fenithotel.com",
    vendor_type: "cafe",
    branches: [],
    vendor_checkIn_times: [],
    vendor_social_media: [],
    property_images: [],
    license_image: null,
    work_day: null,
  };

  const [data, setData] = useState(INITIAL_DATA);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { step, next, back, isFirstStep, isLastStep, setCurrentStepIndex } =
    useMultiForm([
      <BusinessForm {...data} updateFields={updateFields} />,
      <LoginCredentials {...data} updateFields={updateFields} />,
      <UploadDocuments {...data} updateFields={updateFields} />,
      <BusinessAddress {...data} updateFields={updateFields} />,
      <SocialMediaAndCheckiIn {...data} updateFields={updateFields} />,
    ]);

  // Handle form submission using axios
  const vendorRegisterHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLastStep) return next();

    const formDataSend = new FormData();

    // Append each field manually like in `handleMenuCreate`
    formDataSend.append("username", data.username);
    formDataSend.append("email", data.email);
    formDataSend.append("password", data.password);
    formDataSend.append("first_name", data.first_name);
    formDataSend.append("last_name", data.last_name);
    formDataSend.append("tin", data.tin.toString()); // Converting number to string
    formDataSend.append("vendor_name", data.vendor_name);
    formDataSend.append("description", data.description);
    // formDataSend.append("work_day", data.work_day);

    if (data.vendor_logo) {
      formDataSend.append("vendor_logo", data.vendor_logo); // Handling file upload
    }

    formDataSend.append("vendor_website", data.vendor_website);
    formDataSend.append("vendor_type", data.vendor_type);

    // Append branches (arrays) manually
    data.branches.forEach((branch, index) => {
      formDataSend.append(`branches[${index}].address`, branch.address);
      branch.phones.forEach((phone, phoneIndex) => {
        formDataSend.append(
          `branches[${index}].phones[${phoneIndex}].code`,
          phone.code
        );
        formDataSend.append(
          `branches[${index}].phones[${phoneIndex}].number`,
          phone.number
        );
      });
    });

    // Append check-in times
    data.vendor_checkIn_times.forEach((time, index) => {
      formDataSend.append(`vendor_checkIn_times[${index}]`, time);
    });

    // Append social media
    data.vendor_social_media.forEach((socialMedia, index) => {
      formDataSend.append(
        `vendor_social_media[${index}].platform`,
        socialMedia.platform
      );
      formDataSend.append(
        `vendor_social_media[${index}].link`,
        socialMedia.link
      );
    });

    // Append property images
    if (data.property_images) {
      data.property_images.forEach((file, index) => {
        formDataSend.append(`property_images`, file);
      });
    }

    // Append license image
    if (data.license_image) {
      formDataSend.append("license_image", data.license_image); // Handling license file upload
    }

    try {
      console.log(data);
      const response = await axios.post("/api/v1/vendor/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration success:", response.data);
      navigate("/auth");
      setCurrentStepIndex(0); // Reset to first step after successful registration
      setErrorMessage(""); // Reset error message after successful registration
      setSuccessMessage("Vendor registration successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <div>
      <div className="demo-page">
        <div className="demo-page-navigation">
          <nav>
            <ul>
              {vendorRegisterCategory.map((registryCategory, index) => (
                <li key={index}>
                  <a
                    href={`#${registryCategory.link}`}
                    onClick={() => setCurrentStepIndex(index)}
                  >
                    {registryCategory.icon}
                    {registryCategory.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <main className="demo-page-content">
          <form onSubmit={vendorRegisterHandler}>
            <section>
              {step}
              {isLastStep && successMessage ? (
                <div
                  className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span className="font-medium">{successMessage}</span>
                </div>
              ) : errorMessage ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  <span className="font-medium">{errorMessage}</span>
                </div>
              ) : null}
              <div className="mt-5 flex justify-end gap-x-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={back}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
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
