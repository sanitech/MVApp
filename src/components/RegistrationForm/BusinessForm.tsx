import React, { useRef, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type FormProps = {
  vendor_name: string;
  vendor_type: string;
  first_name: string;
  last_name: string;
  description: string;
};
type BusinessFormProps = FormProps & {
  updateFields: (fields: Partial<FormProps>) => void;
};

const BusinessForm = ({
  vendor_name,
  vendor_type,
  first_name,
  last_name,
  description,
  updateFields,
}: BusinessFormProps) => {
  return (
    <FormWrapper title="Business Information">
      <div className="href-target" id="businessInfo" />
      {/* <!-- Grid --> */}
      {/* <!-- Grid --> */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-12">
        <div className="sm:col-span-3">
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
        {/* <!-- End Col --> */}

        <div className="sm:col-span-9">
          <input
            id="af-account-email"
            type="text"
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            placeholder="Hotel and Resonant"
            value={vendor_name}
            onChange={(e) => updateFields({ vendor_name: e.target.value })}
          />
        </div>

        {/* end col */}

        <div className="sm:col-span-3">
          <label
            htmlFor="af-submit-app-category"
            className="inline-block text-sm font-medium text-gray-800 mt-2.5"
          >
            Business Type
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

        <div className="sm:col-span-9">
          <select
            id="af-submit-app-category"
            className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            onChange={(e) => updateFields({ vendor_type: e.target.value })}
            value={vendor_type}
          >
            <option selected>Select a Type</option>
            <option value={"restaurant"}>Restaurant</option>
            <option value={"Hotel"}>Hotel </option>
            <option value={"cafe"}>Cafe</option>
            <option value={"Guest House"}>Guest House</option>
            <option value={"Other"}>Other</option>
          </select>
        </div>

        <div className="sm:col-span-3">
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
        {/* <!-- End Col --> */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input
              id="af-account-full-name"
              type="text"
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="Maria"
              value={first_name}
              onChange={(e) => updateFields({ first_name: e.target.value })}
            />
            <input
              type="text"
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="Boone"
              value={last_name}
              onChange={(e) => updateFields({ last_name: e.target.value })}
            />
          </div>
        </div>

        {/* <!-- End Col --> */}
        <div className="sm:col-span-3">
          <label
            htmlFor="af-account-bio"
            className="inline-block text-sm text-gray-800 mt-2.5 "
          >
            Description
          </label>
          <span className="text-sm text-gray-400 dark:text-neutral-600">
            (Optional)
          </span>
        </div>
        {/* <!-- End Col --> */}

        <div className="sm:col-span-9">
          <textarea
            onChange={(e) => updateFields({ description: e.target.value })}
            id="af-account-bio"
            className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            placeholder="Type your Business..."
          >
            {description}
          </textarea>
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
      {/* <!-- End Grid --> */}
    </FormWrapper>
  );
};

export default BusinessForm;
