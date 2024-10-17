import React, { useState } from "react";
import ProfileSettings from "../../components/ProfileSetting";
import BranchCard from "../../components/profile/BranchCard";

const BusinessProfilePage = () => {
  const [logoPreview, setLogoPreview] = useState<string>(
    "https://preline.co/assets/img/160x160/img1.jpg"
  );
  return (
    <div className=" mx-auto">
      <div className="bg-white rounded-xl shadow ">
        <div className="pt-5 p-4 sm:pt-5 sm:p-7">
          <h1 className="font-bold text-gray-900 text-lg">Profile</h1>
          <p className="text-gray-700 mt-1">
            Manage your name, password and account settings.
          </p>
          <div className="grid grid-cols-5 gap-2 sm:gap-5 w-2/3 mt-5">
            <div className="sm:col-span-2">
              <label className="inline-block text-sm font-medium text-gray-700 mt-2.5">
                Business Logo
              </label>
            </div>
            {/* <!-- End Col --> */}

            <div className="sm:col-span-3 max-w-sm">
              <div className="flex items-center gap-5">
                <img
                  className="inline-block size-16 rounded-full ring-2 ring-white"
                  src={logoPreview}
                  alt="Avatar"
                />
                <div className="flex gap-x-2">
                  <div>
                    <button type="button">
                      <label
                        htmlFor="af-submit-app-upload-logo"
                        className="py-2 px-3 inline-flex  items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-100 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent "
                      >
                        <input
                          id="af-submit-app-upload-logo"
                          name="af-submit-app-upload-logo"
                          type="file"
                          className="sr-only"
                        />
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        Upload Logo
                      </label>
                    </button>
                    <button type="button">
                      <label className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-light rounded-lg border ml-3 border-gray-100 border-solid bg-white text-red-800 shadow-sm  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50">
                        Delete
                      </label>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className=" w-full border-gray-200 my-5" />

          <h1 className="font-medium text-gray-900 text-base mb-3">
            Personal info
          </h1>

          <div className="grid grid-cols-5 gap-2 sm:gap-5 w-2/3">
            <div className="col-span-2">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 "
              >
                Business Name
              </label>
              <div className="hs-tooltip inline-block">
                <svg
                  className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                  role="tooltip"
                >
                  Displayed on public forums, such as Preline
                </span>
              </div>
            </div>

            <div className="col-span-3">
              <input
                id="af-account-email"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Hotel and Resonant"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="af-submit-app-category"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5"
              >
                Business Type
              </label>
              <div className="hs-tooltip inline-block">
                <svg
                  className="hs-tooltip-toggle ms-1 border inline-block size-3 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1  2 0z" />
                </svg>
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                  role="tooltip"
                >
                  Displayed on public forums, such as Preline
                </span>
              </div>
            </div>

            <div className="col-span-3">
              <select
                id="af-submit-app-category"
                className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              >
                <option selected>Select a Type</option>
                <option value={"restaurant"}>Restaurant</option>
                <option value={"Hotel"}>Hotel </option>
                <option value={"cafe"}>Cafe</option>
                <option value={"Guest House"}>Guest House</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="af-account-full-name"
                className="inline-block text-sm text-gray-800 mt-2.5 "
              >
                Owner’s Name
              </label>
              <div className="hs-tooltip inline-block">
                <svg
                  className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                  role="tooltip"
                >
                  Displayed on public forums, such as Preline
                </span>
              </div>
            </div>

            <div className="col-span-3">
              <div className="sm:flex">
                <input
                  id="af-account-full-name"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Maria"
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Boone"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 "
              >
                Email address
              </label>
            </div>

            <div className="col-span-3">
              <input
                id="af-account-email"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Enter Email address"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 "
              >
                Tin Number{" "}
              </label>
            </div>

            <div className="col-span-3">
              <input
                id="af-account-email"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Enter Tin number"
              />
            </div>

            {/* description */}
            <div className="col-span-2">
              <label
                htmlFor="af-account-bio"
                className="inline-block text-sm text-gray-800 mt -2.5 "
              >
                Description
              </label>
              <span className="text-sm text-gray-400 dark:text-neutral-600">
                (Optional)
              </span>
            </div>

            <div className="col-span-3">
              <textarea
                id="af-account-bio"
                className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Type your Business..."
              ></textarea>
              <div className="mt-6 flex gap-4">
                <button className="bg-blue-700 hover:bg-blue-600 border border-blue-700 text-white px-3 py-1 rounded-md">
                  Save changes
                </button>
                <button className="border border-gray-200 text-gray-900 px-3 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <hr className=" w-full border-gray-200 my-5" />

          <h1 className="font-medium text-gray-900 text-lg mb-3">Password</h1>

          {/* <!-- Social media links --> */}
          <div className="grid grid-cols-5 gap-2 sm:gap-5 w-2/3">
            <div className="sm:col-span-2">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-700 mt-2.5 "
              >
                Current Password
              </label>
            </div>

            {/* <!-- End Col --> */}

            <div className="sm:col-span-3 max-w-sm">
              <input
                id="af-account-email"
                type="email"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Enter current password"
                required
              />
            </div>
            {/* <!-- End Col --> */}

            <div className="sm:col-span-2">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-700 mt-2.5 "
              >
                Password
              </label>
            </div>
            {/* <!-- End Col --> */}

            <div className="sm:col-span-3 max-w-sm">
              <div className="space-y-2 max-w-sm">
                <input
                  id="af-account-password"
                  type="password"
                  className="py-2 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Enter New password"
                  required
                />
                <div className="max-w-sm">
                  <div className="flex-1">
                    <input
                      type="password"
                      id="hs-strong-password-with-minLength"
                      className="py-2 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                      placeholder="Enter password"
                    />
                    <div
                      id="hs-strong-password-minLength"
                      data-hs-strong-password='{
                        "target": "#hs-strong-password-with-minLength",
                        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
                        "minLength": "8"
                      }'
                      className="flex mt-2 -mx-1"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="mt-6 flex gap-4 items-center">
                  <button className="bg-blue-700 hover:bg-blue-600 border border-blue-700 text-white px-3 py-2 rounded-md">
                    Change
                  </button>
                  <a href="" className="text-blue-800 hover:text-blue-700">
                    I forgot my password
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- End Col --> */}
          </div>
          <hr className=" w-full border-gray-200 my-5" />

          <h1 className="font-medium text-gray-900 text-lg mb-3">
            Social accounts
          </h1>

          <div className="grid grid-cols-5 gap-2 sm:gap-5 w-2/3">
            <div className="sm:col-span-2">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-700 mt-2.5 "
              >
                URL
              </label>
            </div>

            <div className="sm:col-span-3 max-w-sm">
              <div className="space-y-2">
                <input
                  id="af-account-password"
                  type="password"
                  className="py-2 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Link to social profile"
                  required
                />
                <input
                  id="af-account-password"
                  type="password"
                  className="py-2 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Link to social profile"
                  required
                />
                <input
                  id="af-account-password"
                  type="password"
                  className="py-2 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Link to social profile"
                  required
                />
              </div>

              <div className="col-span-3">
                <div className="mt-6 flex gap-4 items-center">
                  <div className="flex items-center cursor-pointer gap-1 border border-dashed border-gray-200 hover:bg-natural-100 text-sm text-gray-900 px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      width={20}
                      height={20}
                      className="bi bi-plus-lg size-4"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                      />
                    </svg>
                    Add link
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Address --> */}
          <hr className=" w-full border-gray-200 my-5" />

          <h1 className="font-medium text-gray-900 text-lg mb-3">Address</h1>

          <div className="grid grid-cols-5 gap-2 sm:gap-5 w-2/3">
            <div className="sm:col-span-2">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-700 mt-2.5 "
              >
                Address
              </label>
            </div>

            <div className="sm:col-span-3 max-w-sm">
              <div className="space-y-2">
                <div className="max-w-sm">
                  <BranchCard
                    browser="chrome"
                    device="desktop"
                    ipAddress="192.168.1.1"
                    isCurrentSession={true}
                    location="New York, NY"
                    recentActivity="Last active 2 hours ago"
                    key={1}
                  />
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-6 flex gap-4 items-center">
                  <div className="flex items-center cursor-pointer gap-1 border border-dashed border-gray-200 hover:bg-natural-100 text-sm text-gray-900 px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      width={20}
                      height={20}
                      className="bi bi-plus-lg size-4"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                      />
                    </svg>
                    Add Policy
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- cancelation policy --> */}
          <hr className=" w-full border-gray-200 my-5" />

          <h1 className="font-medium text-gray-900 text-lg mb-3">Policy</h1>

          <div className="grid grid-cols-5 gap-2 sm:gap-5 w-2/3">
            <div className="sm:col-span-2">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-700 mt-2.5 "
              >
                Cancelation Policy
              </label>
            </div>
            {/* <!-- End Col --> */}

            <div className="sm:col-span-3 max-w-sm">
              <div className="space-y-2">
                <div className="max-w-sm">
                  <label htmlFor="textarea-email-label" className="sr-only">
                    Comment
                  </label>
                  <textarea
                    id="textarea-email-label"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                    rows={3}
                    placeholder="At [Your Business Name], we understand that sometimes plans can change. If you need to cancel your booking, please review our cancellation policy below."
                  ></textarea>
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-6 flex gap-4 items-center">
                  <div className="flex items-center cursor-pointer gap-1 border border-dashed border-gray-200 hover:bg-natural-100 text-sm text-gray-900 px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      width={20}
                      height={20}
                      className="bi bi-plus-lg size-4"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                      />
                    </svg>
                    Add Policy
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- License image --> */}
          <hr className=" w-full border-gray-200 my-5" />

          <h1 className="font-medium text-gray-900 text-lg mb-3">License</h1>

          <div className="grid grid-cols-5 gap-2 sm:gap-5 w-2/3">
            <div className="sm:col-span-2">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-700 mt-2.5 "
              >
                License Image
              </label>
            </div>
            {/* <!-- End Col --> */}

            <div className="sm:col-span-3 max-w-sm">
              <div className="space-y-2">
                <img
                  src="https://th.bing.com/th/id/OIP.KeK4iNvligyI2bI6tpnekAHaKk?pid=ImgDet&w=179&h=256&c=7&dpr=1.3"
                  alt=""
                />
              </div>
            </div>

            {/* <!-- End Col --> */}
          </div>
          <hr className=" w-full border-gray-200 my-5" />

          <h1 className="font-medium text-gray-900 text-lg mb-3">Property</h1>

          <div className="grid grid-cols-7 gap-2 sm:gap-5 ">
            <div className="sm:col-span-2">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-700 mt-2.5 "
              >
                Property Image
              </label>
            </div>
            {/* <!-- End Col --> */}

            <div className="sm:col-span-5 ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                <img
                  src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?rs=1&pid=ImgDetMain"
                  className="rounded-lg border border-gray-200 shadow-sm shadow-gray-500 h-48"
                  alt=""
                />
                <img
                  src="https://th.bing.com/th/id/OIP.AN5orVdP9-VdsVVI44sujwHaE8?rs=1&pid=ImgDetMain"
                  alt=""
                  className="rounded-lg border border-gray-200 shadow-sm shadow-gray-500 h-48"
                />
                <img
                  src="https://th.bing.com/th/id/OIP.0q4oPmN3i8jA2oNrcVwerAHaEK?rs=1&pid=ImgDetMain"
                  alt=""
                  className="rounded-lg border border-gray-200 shadow-sm shadow-gray-500 h-48"
                />
                <img
                  src="https://images.rosewoodhotels.com/is/image/rwhg/heroshot-punta-bonita-pool-and-beach-1"
                  alt=""
                  className="rounded-lg border border-gray-200 shadow-sm shadow-gray-500 h-48"
                />
              </div>
            </div>

            {/* <!-- End Col --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfilePage;
