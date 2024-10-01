import React, { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { daysOfWeek } from "../../Constant/Data";

type SocialMedia = {
  platform: string;
  link: string;
};

type socialMediaAndCheckInProps = {
  vendor_social_media: SocialMedia[];
  vendor_checkIn_times: string[];
  vendor_website: string;
  work_day: string[] | null;
  updateFields: (fields: any) => void;
};

const SocialMediaAndCheckIn = ({
  vendor_social_media,
  vendor_checkIn_times,
  vendor_website,
  work_day,
  updateFields,
}: socialMediaAndCheckInProps) => {
  const [socialMediaCards, setSocialMediaCards] = useState([
    { platform: "Facebook", link: "" },
    { platform: "Twitter", link: "" },
  ]);
  const [checkInTimes, setCheckInTimes] = useState(
    vendor_checkIn_times || ["09:00", "18:00"]
  ); // Defaults to 9 AM - 6 PM
  const [website, setWebsite] = useState(vendor_website || "");
  const [isOpen, setIsOpen] = useState(false); // Add this line

  // Handle adding a new social media card
  const handleAddSocialMedia = () => {
    const newSocialMedia = { platform: "New Platform", link: "" };
    const updatedSocialMedia = [...socialMediaCards, newSocialMedia];
    setSocialMediaCards(updatedSocialMedia);
    updateFields({ vendor_social_media: updatedSocialMedia });
  };

  // Handle updating social media link or platform
  const handleSocialMediaChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSocialMedia = socialMediaCards.map((card, i) =>
      i === index ? { ...card, [field]: value } : card
    );
    setSocialMediaCards(updatedSocialMedia);
    updateFields({ vendor_social_media: updatedSocialMedia });
  };

  // Handle updating check-in/check-out times
  const handleTimeChange = (index: number, value: string) => {
    const updatedTimes = [...checkInTimes];
    updatedTimes[index] = value;
    setCheckInTimes(updatedTimes);
    updateFields({ vendor_checkIn_times: updatedTimes });
  };

  // Handle website change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWebsite(value);
    updateFields({ vendor_website: value });
  };

  const handleWorkDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const workDay = value === "all" ? null : [value];
    updateFields({ work_day: workDay });
  };

  return (
    <FormWrapper title="Check-In & Social Media">
      <div className="href-target" id="contact"></div>

      {/* Check-In Times Section */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-12">
        <div className="sm:col-span-3">
          <label
            htmlFor="af-payment-billing-address"
            className="inline-block text-sm font-medium"
          >
            Check-In
          </label>
        </div>
        <div className="sm:col-span-9">
          <div className="flex mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="check-in-time"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Check-In Time:
                </label>
                <input
                  type="time"
                  id="check-in-time"
                  className="bg-purple-100 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  min="09:00"
                  max="18:00"
                  value={checkInTimes[0]}
                  onChange={(e) => handleTimeChange(0, e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="check-out-time"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Check-Out Time:
                </label>
                <input
                  type="time"
                  id="check-out-time"
                  className="bg-purple-100 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  min="09:00"
                  max="18:00"
                  value={checkInTimes[1]}
                  onChange={(e) => handleTimeChange(1, e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Days of the Week Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-wrap">
            <div className="flex items-center me-4 ">
              <input
                name="dayOfWeek"
                id="all"
                type="checkbox"
                value="all"
                checked
                className="w-4 h-4 accent-blue-500 text-green-600 bg-green-100 border-gray-300 rounded focus:ring-green-500"
                onChange={handleWorkDayChange}
              />
              <label
                htmlFor={"all"}
                className="ms-2 text-sm font-medium text-blue-500"
              >
                All Day
              </label>
            </div>
            {daysOfWeek.map((day, key) => (
              <div className="flex items-center me-4 " key={key}>
                <input
                  name="dayOfWeek"
                  id={day.day}
                  type="checkbox"
                  value={day.day}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  onChange={handleWorkDayChange}
                />
                <label
                  htmlFor={day.day}
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  {day.day}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="sm:col-span-3">
          <label
            htmlFor="af-account-phone"
            className="inline-block text-sm text-gray-800 mt-2.5"
          >
            Social Media
          </label>
        </div>
        <div className="sm:col-span-9">
          {socialMediaCards.map((card, index) => (
            <div className="mt-3" key={index}>
              <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 mb-3">
                <div className="relative">
                  <select
                    value={card.platform}
                    onChange={(e) =>
                      handleSocialMediaChange(index, "platform", e.target.value)
                    }
                    className="block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Select Platform">Select Platform</option>

                    <option value="Facebook">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.74 2.02A2 2 0 0 1 20 4v16a2 2 0 0 1-2 2h-5.38v-6.74h2.27l.46-2.91H12.62v-1.88c0-.84.47-1.67 1.69-1.67h1.57v-2.77c-.27-.04-1.21-.12-2.29-.12-2.27 0-3.84 1.41-3.84 3.97v2.47H7v2.9h2.75V22H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h12.74z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Facebook
                      </div>
                    </option>

                    <option value="Instagram">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.16c1.65 0 1.91.01 2.58.04.66.03 1.1.14 1.47.3a2.96 2.96 0 0 1 1.07.7c.31.3.52.62.7 1.07.16.37.27.81.3 1.47.03.67.04.93.04 2.58s-.01 1.91-.04 2.58c-.03.66-.14 1.1-.3 1.47a2.96 2.96 0 0 1-.7 1.07c-.3.31-.62.52-1.07.7-.37.16-.81.27-1.47.3-.67.03-.93.04-2.58.04s-1.91-.01-2.58-.04c-.66-.03-1.1-.14-1.47-.3a2.96 2.96 0 0 1-1.07-.7c-.31-.3-.52-.62-.7-1.07-.16-.37-.27-.81-.3-1.47-.03-.67-.04-.93-.04-2.58s.01-1.91.04-2.58c.03-.66.14-1.1.3-1.47a2.96 2.96 0 0 1 .7-1.07c.3-.31.62-.52 1.07-.7.37-.16.81-.27 1.47-.3.67-.03.93-.04 2.58-.04zm0 1.66c-1.64 0-1.85.01-2.5.04-.57.03-.88.12-1.09.2a1.3 1.3 0 0 0-.5.33c-.15.15-.25.32-.33.5-.08.21-.17.52-.2 1.09-.03.65-.04.86-.04 2.5s.01 1.85.04 2.5c.03.57.12.88.2 1.09.08.18.18.35.33.5.15.15.32.25.5.33.21.08.52.17 1.09.2.65.03.86.04 2.5.04s1.85-.01 2.5-.04c.57-.03.88-.12 1.09-.2a1.3 1.3 0 0 0 .5-.33c.15-.15.25-.32.33-.5.08-.21.17-.52.2-1.09.03-.65.04-.86.04-2.5s-.01-1.85-.04-2.5c-.03-.57-.12-.88-.2-1.09a1.3 1.3 0 0 0-.33-.5 1.3 1.3 0 0 0-.5-.33c-.21-.08-.52-.17-1.09-.2-.65-.03-.86-.04-2.5-.04zm0 3.18a3.16 3.16 0 1 0 0 6.32 3.16 3.16 0 0 0 0-6.32zm0 1.66a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3.68-2.5a.77.77 0 1 0 0 1.54.77.77 0 0 0 0-1.54z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Instagram
                      </div>
                    </option>

                    <option value="Twitter">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.29 20.25c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.38 8.38 0 0 0 22 5.92a8.26 8.26 0 0 1-2.38.65A4.14 4.14 0 0 0 21.45 4c-.8.48-1.69.83-2.63 1.03a4.13 4.13 0 0 0-7.04 3.76A11.71 11.71 0 0 1 3.15 4.47a4.13 4.13 0 0 0 1.28 5.51A4.12 4.12 0 0 1 2.8 9v.05a4.13 4.13 0 0 0 3.31 4.05c-.42.11-.86.17-1.31.17-.32 0-.63-.03-.93-.09a4.13 4.13 0 0 0 3.86 2.87A8.29 8.29 0 0 1 2 18.58a11.69 11.69 0 0 0 6.29 1.84"
                            clipRule="evenodd"
                          />
                        </svg>
                        Twitter
                      </div>
                    </option>
                  </select>
                </div>

                <input
                  type="url"
                  placeholder="Link"
                  value={card.link}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "link", e.target.value)
                  }
                  className="py-2 px-3 border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleAddSocialMedia}
            type="button"
            className="inline-flex items-center gap-x-1 text-sm text-blue-600 hover:underline focus:outline-none font-medium"
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
        </div>

        {/* Website Section */}
        <div className="sm:col-span-3">
          <label
            htmlFor="vendor-website"
            className="inline-block text-sm text-gray-800 mt-2.5"
          >
            Website
          </label>
        </div>
        <div className="sm:col-span-9">
          <input
            id="vendor-website"
            type="url"
            className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com"
            value={website}
            onChange={handleWebsiteChange}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default SocialMediaAndCheckIn;
