import React from "react";
import { useLocation } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const VendorDetailPage = () => {
  const location = useLocation();
  const vendor = location.state;
  console.log(vendor);
  return (
    <div>
      <div class="bg-white">
        <div class="border-1 shadow-lg shadow-gray-700 rounded-lg">
          {/* <!-- top content --> */}
          <div class="flex items-center rounded-t-lg bg-top-color sm:px-2 w-full">
            <div class="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3 shadow-sm">
              <img src={vendor.vendor_logo} />
            </div>
            <div class="w-2/3 pl-5 mt-10 text-start ml-5">
              <p class="text-heading capitalize">{vendor.vendor_type}</p>
              <p class="font-poppins font-bold text-heading sm:text-4xl text-2xl capitalize">
                {vendor.vendor_name}
              </p>
            </div>
          </div>

          {/* <!-- main content --> */}
          <div class="p-5">
            <div class="flex flex-col sm:flex-row sm:mt-10">
              <div class="flex flex-col sm:w-1/3 sticky top-0">
                {/* <!-- My contact --> */}
                <div class="py-3 sm:order-none order-3">
                  <h2 class="text-lg font-poppins font-bold text-top-color">
                    My Contact
                  </h2>
                  <div class="border-2 w-20 border-top-color my-3"></div>

                  <div className="flex flex-col">
                    {vendor.branches.map((branchInfo) => {
                      try {
                        console.log(JSON?.parse(branchInfo.phone_number));
                        const branchPhoneNumbers = JSON?.parse(
                          branchInfo.phone_number
                        );
                        console.log(branchPhoneNumbers[1]);
                        for (const phoneNumber of branchPhoneNumbers) {
                          return (
                            <a
                              class="flex items-center my-1"
                              href={phoneNumber}
                              target="_blank"
                            >
                              <div
                                class="w-6 text-gray-700 hover:text-orange-600"
                                aria-label="Visit TrendyMinds YouTube"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-telephone-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                                  />
                                </svg>
                              </div>
                              <div>{phoneNumber}</div>
                            </a>
                          );
                        }
                      } catch (error) {
                        console.error(`Error parsing phone number: ${error}`);
                      }
                    })}

                    {/* display website */}
                    <a
                      class="flex items-center my-1"
                      href={vendor.vendor_website}
                      target="_blank"
                    >
                      <div
                        class="w-6 text-gray-700 hover:text-orange-600"
                        aria-label="Visit TrendyMinds Facebook"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-globe"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                        </svg>
                      </div>
                      <div>{vendor.vendor_website}</div>
                    </a>

                    {/* display email */}
                    <a
                      class="flex items-center my-1"
                      href={vendor.vendor_email}
                      target="_blank"
                    >
                      <div
                        class="w-6 text-gray-700 hover:text-orange-600"
                        aria-label="Visit TrendyMinds Facebook"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-envelope-at-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                          <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                        </svg>
                      </div>
                      <div>{vendor.vendor_email}</div>
                    </a>
                  </div>
                </div>
                {/* <!-- Skills --> */}
                <div class="py-3 sm:order-none order-2">
                  <h2 class="text-lg font-poppins font-bold text-top-color">
                    Skills
                  </h2>
                  <div class="border-2 w-20 border-top-color my-3"></div>

                  <div className="flex flex-col">
                    <div class="flex items-center my-1 gap-3">
                      <div
                        class=" text-gray-700 font-medium"
                        aria-label="Visit TrendyMinds YouTube"
                      >
                        Tin Number
                      </div>
                      <div>{vendor.tin_number}</div>
                    </div>
                    <div class="flex items-center my-1 gap-3">
                      <div
                        class=" text-gray-700 font-medium"
                        aria-label="Visit TrendyMinds YouTube"
                      >
                        Max Capacity
                      </div>
                      <div>{vendor.max_capacity}</div>
                    </div>
                    <div class="flex items-center my-1 gap-3">
                      <div
                        class=" text-gray-700 font-medium"
                        aria-label="Visit TrendyMinds YouTube"
                      >
                        Reservation
                      </div>
                      <label class="flex items-center relative w-max cursor-pointer select-none">
                        <input
                          type="checkbox"
                          class="toggle-btn appearance-none transition-colors cursor-pointer w-14 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500"
                        />
                        <span class="absolute font-medium text-xs uppercase right-1 text-white">
                          {" "}
                          No{" "}
                        </span>
                        <span class="absolute font-medium text-xs uppercase right-8 text-white">
                          {" "}
                          Yes{" "}
                        </span>
                        <span class="w-6 h-6 right-8 absolute rounded-full transform transition-transform bg-gray-200" />
                      </label>
                    </div>
                    <div class="flex items-center my-1">
                      <a class="w-6 text-gray-700 ">
                        <label class="flex items-center relative w-max cursor-pointer select-none">
                          <span class=" font-medium mr-3">Pet friendly</span>
                          <input
                            type="checkbox"
                            class="toggle-btn appearance-none transition-colors cursor-pointer w-14 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500"
                          />
                          <span class="absolute font-medium text-xs uppercase right-1 text-white">
                            {" "}
                            No{" "}
                          </span>
                          <span class="absolute font-medium text-xs uppercase right-8 text-white">
                            {" "}
                            Yes{" "}
                          </span>
                          <span class="w-6 h-6 right-8 absolute rounded-full transform transition-transform bg-gray-200" />
                        </label>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Education Background --> */}
                <div class="py-3 sm:order-none order-1">
                  <h2 class="text-lg font-poppins font-bold text-top-color">
                    Work Day
                  </h2>
                  <div class="border-2 w-20 border-top-color my-3"></div>
                  <div className="flex gap-3">
                    {vendor.check_in_time.map((checkIn) => (
                      <div class="flex items-center my-1">
                        {checkIn?.checkin_time + "-" + checkIn?.checkout_time}
                      </div>
                    ))}
                  </div>
                </div>
                <div class="py-3 sm:order-none order-1">
                  <h2 class="text-lg font-poppins font-bold text-top-color">
                    Social Media
                  </h2>
                  <div class="border-2 w-20 border-top-color my-3"></div>
                  <div className="flex gap-3">
                    {vendor.vendor_social_media.map((socialMedia) => (
                      <a
                        key={socialMedia.id} // add a unique key for each social media item
                        class="flex items-center my-1"
                        href={socialMedia.social_media_url}
                        target="_blank"
                      >
                        {(() => {
                          switch (socialMedia.social_media_platform) {
                            case "Facebook":
                              return <FaFacebookF size={20} />;
                            case "Instagram":
                              return <FaInstagram size={20} />;
                            case "LinkedIn":
                              return <FaLinkedinIn size={20} />;
                            case "Twitter":
                              return <FaTwitter size={20} />;
                            default:
                              return null;
                          }
                        })()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">
                {/* <!-- About me --> */}
                <div class="py-3">
                  <h2 class="text-lg font-poppins font-bold text-top-color">
                    About Me
                  </h2>
                  <div class="border-2 w-20 border-top-color my-3"></div>
                  <p>{vendor.vendor_description}</p>
                </div>

                {/* <!-- Professional Experience --> */}
                <div class="py-3">
                  <h2 class="text-lg font-poppins font-bold text-top-color">
                    Cancellation policy
                  </h2>
                  <div class="border-2 w-20 border-top-color my-3"></div>

                  <div class="flex flex-col">
                    <div class="flex flex-col">
                      <p class="text-lg font-bold text-gray-700">
                        Netcracker Technology | Software Engineer
                      </p>
                      <p class="font-semibold text-sm text-gray-700">
                        2021 - Present
                      </p>
                      <p class="font-semibold text-sm text-gray-700 mt-2 mb-1">
                        Key Responsibilities
                      </p>
                      <ul class="text-sm list-disc pl-4 space-y-1">
                        <li>Working on customer facing product</li>
                        <li>Deliverying highly efficient solutions</li>
                        <li>Solving critical bugs</li>
                      </ul>
                    </div>

                    <div class="flex flex-col mt-8">
                      <p class="text-lg font-bold text-gray-700">
                        Our Property
                      </p>
                      <div className=" my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {vendor.property_images.map((property) => {
                          return <img src={property.image_url} alt="" />;
                        })}
                      </div>
                    </div>
                    <div class="flex flex-col mt-8">
                      <p class="text-lg font-bold text-gray-700">Licenses</p>
                      <div className=" my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <img
                          className="w-30 h-72 object-cover"
                          src={vendor.license_image}
                          alt=""
                        />
                        ;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;
