import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import RoomRegistrationForm from "../../../components/Room/RoomRegistrationForm";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const RoomDiscountSeasonal = () => {
  const [dateRange, setDateRange] = useState<Value>(new Date());

  const handleSeasonalDiscount = async () => {};

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSeasonalDiscount}>
        <div className="bg-white rounded-xl shadow ">
          <h1 className="text-xl font-bold text-gray-800 py-4 px-6">
            Apply seasonal discount to your room bookings
          </h1>
          <div className="pt-0 p-4 sm:pt-0 sm:p-7">
            <div className="space-y-4 sm:space-y-6">
              {/* Seasonal Rates */}
              <div className="space-y-2">
                <label
                  htmlFor="af-submit-project-url"
                  className="inline-block text-sm font-medium mt-2.5"
                >
                  Seasonal Rates
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
                      price include
                    </span>
                  </div>
                </label>
                <Calendar
                  onChange={setDateRange}
                  value={dateRange}
                  selectRange={true}
                />
                {/* <div>
                  {dateRange instanceof Date
                    ? dateRange.toLocaleDateString()
                    : Array.isArray(dateRange) && dateRange[0] && dateRange[1]
                    ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
                    : Array.isArray(dateRange) && dateRange[0]
                    ? dateRange[0].toLocaleDateString()
                    : "No date range selected"}
                </div> */}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="af-submit-project-url"
                  className="inline-block text-sm font-medium mt-2.5"
                >
                  Discount Rates
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
                      price include
                    </span>
                  </div>
                </label>
                <div className="max-w-sm space-y-3">
                  <div>
                    <div className="max-w-sm space-y-3">
                      <div>
                        <label
                          htmlFor="hs-inline-leading-pricing-select-label"
                          className="block text-sm  mb-2 text-gray-500"
                        >
                          please insert discount percentage
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="hs-inline-leading-pricing-select-label"
                            name="inline-add-on"
                            className="py-3 px-4 ps-9 pe-20 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                            placeholder="75%"
                          />
                          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                            <span className="text-gray-500 ">$</span>
                          </div>
                          <div className="absolute inset-y-0 end-0 flex items-center text-gray-500 pe-px">
                            <label
                              htmlFor="hs-inline-leading-select-currency"
                              className="sr-only"
                            >
                              Currency
                            </label>
                            <select
                              id="hs-inline-leading-select-currency"
                              name="hs-inline-leading-select-currency"
                              className="block w-full border-transparent rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none"
                            >
                              <option>%</option>
                              <option value="10%">10%</option>
                              <option value="20%">20%</option>
                              <option value="25%">25%</option>
                              <option value="30%">30%</option>
                              <option value="35%">35%</option>
                              <option value="40%">40%</option>
                              <option value="45%">45%</option>
                              <option value="50%">50%</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit button */}
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoomDiscountSeasonal;
