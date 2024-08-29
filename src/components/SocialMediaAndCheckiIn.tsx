import React, { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { SocketAddress } from "net";
import { daysOfWeek } from "../Constant/Data";

type socialMediaAndChckInProps = {
  vendor_social_media: [];
  vendor_checkIn_times: [];
  vendor_website: string;
  updateFields: (fields: any) => void;
};
const SocialMediaAndCheckiIn = ({
  vendor_social_media,
  vendor_checkIn_times,
  vendor_website,
  updateFields,
}: socialMediaAndChckInProps) => {
  const [socialMedia, setSocialMedia] = useState({
    social_media_platform: "",
    social_media_url: "",
  });

  // const onSocialMedia = () => {
  //   // ret vendor_social_media;
  // };
  return (
    <FormWrapper title="Check-In & Social Media">
      <div className="href-target" id="contact"></div>

      <form>
        {/* <!-- Grid --> */}
        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
          {/* <!-- Section --> */}
          <div className="sm:col-span-3">
            <label
              htmlFor="af-payment-billing-address"
              className="inline-block text-sm font-medium"
            >
              Check in
            </label>
          </div>

          <div className="sm:col-span-9">
            <div className="flex mb-4">
              <form className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="end-time"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Check In time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-100 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="end-time"
                      className="bg-purple-100 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      min="09:00"
                      max="18:00"
                      value="00:00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="end-time"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Check Out time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-100 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="end-time"
                      className="bg-purple-100 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      min="09:00"
                      max="18:00"
                      value="00:00"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="flex gap-2">
              {daysOfWeek.map((day, key) => {
                return (
                  <div className="flex items-center me-4" key={key}>
                    <input
                      name="dayOfWeek"
                      id={day.day}
                      type="checkbox"
                      value={day.day}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={day.day}
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      {day.day}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sm:col-span-3">
            <div className="inline-block">
              <label
                htmlFor="af-account-phone"
                className="inline-block text-sm text-gray-800 mt-2.5 "
              >
                Social Media
              </label>
            </div>
          </div>

          {/* <!-- End Col --> */}
          <div className="sm:col-span-9">
            <div className="phoneCard">
              <div className="sm:flex mt-3 mb-3">
                <select className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                  <option value="+251">Facebook</option>
                  <option value="+251">TikTok</option>
                  <option value="+251">Telegram</option>
                  <option value="+251">Instagram</option>
                  <option value="+253">LinkedIn</option>
                </select>
                <input
                  id="af-account-phone"
                  type="url"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="https://facebook.com"
                />
              </div>
            </div>

            <p className="mt-3">
              <button
                type="button"
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 hover:underline focus:outline-none font-medium dark:text-blue-500"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                Add Social Media
              </button>
            </p>
          </div>
          <div className="sm:col-span-3">
            <div className="inline-block">
              <label
                htmlFor="af-account-phone"
                className="inline-block text-sm text-gray-800 mt-2.5 "
              >
                Website
              </label>
            </div>
          </div>

          {/* <!-- End Col --> */}
          <div className="sm:col-span-9">
            <div className="phoneCard">
              <div className="sm:flex mt-3 mb-3">
                <input
                  id="af-account-phone"
                  type="url"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="https://facebook.com"
                  value={vendor_website}
                  onChange={(e) =>
                    updateFields({ vendor_website: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Grid --> */}
      </form>
    </FormWrapper>
  );
};

export default SocialMediaAndCheckiIn;
