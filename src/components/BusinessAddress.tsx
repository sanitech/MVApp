import React, { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { type } from "os";

type BusinessAddressProse = {
  address: string;
  vendor_phones: [];
  updateFields: (field: Partial<BusinessAddressProse>) => void;
};
const BusinessAddress = ({
  address,
  vendor_phones,
  updateFields,
}: BusinessAddressProse) => {
  // const [phoneNumbers, setPhoneNumbers] = useState([
  //   { id: 1, code: "+251", number: "", type: "Mobile" },
  // ]);

  // const addPhoneNumber = () => {
  //   setPhoneNumbers([
  //     ...phoneNumbers,
  //     { id: Date.now(), code: "+251", number: "", type: "Mobile" },
  //   ]);
  // };

  // const removePhoneNumber = (id) => {
  //   setPhoneNumbers(phoneNumbers.filter((phone) => phone.id !== id));
  // };

  // const handlePhoneChange = (id, field, value) => {
  //   setPhoneNumbers(
  //     phoneNumbers.map((phone) =>
  //       phone.id === id ? { ...phone, [field]: value } : phone
  //     )
  //   );
  // };
  return (
    <FormWrapper title="Business Address">
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
              Branch address
            </label>
          </div>

          <div className="sm:col-span-9">
            <h2 className="font-bold">Main Branch</h2>
            <input
              type="text"
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="Ex:- mebrathayl infront of awash bank building mnch building 5th flour"
              value={address}
              onChange={(e) => updateFields({ address: e.target.value })}
            />
          </div>

          <div className="sm:col-span-3">
            <div className="inline-block">
              <label
                htmlFor="af-account-phone"
                className="inline-block text-sm text-gray-800 mt-2.5 "
              >
                Phone
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
          </div>

          {/* <!-- End Col --> */}
          <div className="sm:col-span-9">
            <div className="phoneCard">
              <div className="sm:flex mt-3 mb-3">
                <select className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                  <option value="+251">+251</option>
                  <option value="+253">+253</option>
                  <option value="+252">+252</option>
                  <option value="+254">+254</option>
                </select>
                <input
                  id="af-account-phone"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="+x(xxx)xxx-xx-xx"
                  maxLength={9}
                  value={vendor_phones}
                  // onChange={ (e) => updateFields({ vendor_phones:'phone_number': e.target.value} }) }
                />
              </div>
            </div>
            <div className="phoneCard">
              <div className="sm:flex mt-3 mb-3">
                <select className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                  <option value="+251">+251</option>
                  <option value="+253">+253</option>
                  <option value="+252">+252</option>
                  <option value="+254">+254</option>
                </select>
                <input
                  id="af-account-phone"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="+x(xxx)xxx-xx-xx"
                  maxLength={9}
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
                Add Branch
              </button>
            </p>
          </div>
        </div>
        {/* <!-- End Grid --> */}
      </form>
    </FormWrapper>
  );
};

export default BusinessAddress;
