import React from "react";
import { FormWrapper } from "./FormWrapper";

type Phone = {
  code: string;
  number: string;
};

type Branch = {
  address: string;
  phones: Phone[];
};

type BusinessAddressProse = {
  branches: Branch[];
  updateFields: (fields: Partial<BusinessAddressProse>) => void;
};

const BusinessAddress: React.FC<BusinessAddressProse> = ({
  branches,
  updateFields,
}) => {
  const addBranch = () => {
    const newBranches: Branch[] = [
      ...branches,
      {
        address: "",
        phones: [
          { code: "+251", number: "" },
          { code: "+251", number: "" },
        ],
      },
    ];
    updateFields({ branches: newBranches });
  };

  const updateBranch = (index: number, field: keyof Branch, value: string) => {
    const newBranches = branches.map((branch, i) => {
      if (i === index) {
        return { ...branch, [field]: value };
      }
      return branch;
    });
    updateFields({ branches: newBranches });
  };

  const removeBranch = (index: number) => {
    const newBranches = branches.filter((_, i) => i !== index);
    updateFields({ branches: newBranches });
  };

  const updatePhone = (
    branchIndex: number,
    phoneIndex: number,
    field: keyof Phone,
    value: string
  ) => {
    const newBranches = branches.map((branch, i) => {
      if (i === branchIndex) {
        const newPhones = branch.phones.map((phone, j) => {
          if (j === phoneIndex) {
            return { ...phone, [field]: value };
          }
          return phone;
        });
        return { ...branch, phones: newPhones };
      }
      return branch;
    });
    updateFields({ branches: newBranches });
  };

  return (
    <FormWrapper title="Business Address">
      <div className="href-target" id="contact"></div>

      <div className="grid sm:grid-cols-12 gap-2 sm:gap-12">
        {branches.map((branch, index) => (
          <React.Fragment key={index}>
            <div className="sm:col-span-3">
              <label
                htmlFor={`branch-address-${index}`}
                className="inline-block text-sm font-medium"
              >
                Branch address
              </label>
            </div>

            <div className="sm:col-span-9">
              <h2 className="font-bold">
                {index === 0 ? "Main Branch" : `Branch ${index + 1}`}
              </h2>
              <input
                type="text"
                id={`branch-address-${index}`}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter branch address"
                required
                value={branch.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateBranch(index, "address", e.target.value)
                }
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor={`branch-phone-${index}`}
                className="inline-block text-sm font-medium"
              >
                Phone
              </label>
            </div>

            <div className="sm:col-span-9">
              {branch.phones.map((phone, phoneIndex) => (
                <div className="phoneCard" key={phoneIndex}>
                  <div className="sm:flex mt-3 mb-3">
                    <select
                      className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      value={phone.code}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updatePhone(index, phoneIndex, "code", e.target.value)
                      }
                    >
                      <option value="+251">+251</option>
                      <option value="+253">+253</option>
                      <option value="+252">+252</option>
                      <option value="+254">+254</option>
                    </select>
                    <input
                      id={`branch-phone-${index}-${phoneIndex}`}
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Enter phone number"
                      required
                      minLength={9}
                      maxLength={9}
                      value={phone.number}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updatePhone(index, phoneIndex, "number", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}

        <p className="mt-3 sm:col-span-3">
          <button
            type="button"
            onClick={addBranch}
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
    </FormWrapper>
  );
};

export default BusinessAddress;
