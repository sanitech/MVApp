import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VendorsCard() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const retryDelay = 1000;

  const fetchVendor = async () => {
    try {
      await axios
        .get("/v1/vendor")
        .then((res) => {
          console.log(res.data.vendors);
          setVendor(res.data.vendors);
        })
        .catch((error) => {
          if (retryCount < maxRetries) {
            setRetryCount(retryCount + 1);
            console.log(`Retry ${retryCount + 1} in ${retryDelay}ms`);
            setTimeout(fetchVendor, retryDelay);
          } else {
            console.error(error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteVendor = async (id) => {
    try {
      await axios.delete(`/v1/vendor/${id}`);
      console.log("Vendor deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchVendor();
  }, []);
  return (
    <div>
      {/* <!-- Card Blog --> */}
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Grid --> */}
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-6">
          {/* <!-- Card --> */}
          {vendor.map((vendor) => {
            return (
              <div class="group flex flex-col h-full bg-white border border-gray-200  shadow-xl rounded-xl">
                <div class="h-52 flex flex-col justify-center items-center bg-amber-500 rounded-t-xl">
                  <img
                    src={vendor.vendor_logo}
                    alt=""
                    className="w-fit border-red-800 border-4"
                  />
                </div>
                <div class="p-4 md:p-6">
                  <span class="block mb-1 text-xs font-semibold uppercase text-amber-500">
                    {vendor?.vendor_type}ss
                  </span>
                  <h3 class="text-xl font-semibold text-gray-800 ">
                    {vendor.vendor_name}
                  </h3>
                  <p class="mt-3 text-gray-500 dark:text-neutral-500">
                    {vendor.vendor_description}
                  </p>
                </div>
                <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                  <div
                    onClick={() =>
                      navigate(`${vendor.vendor_id}`, {
                        state: vendor,
                      })
                    }
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    View sample
                  </div>
                  <div
                    onClick={() => handleDeleteVendor(vendor?.vendor_id)}
                    class="w-full py-3 bg-red-500 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl   text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    Delete Vendor
                  </div>
                </div>
              </div>
            );
          })}
          {/* <!-- End Card --> */}
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Card Blog --> */}
    </div>
  );
}

export default VendorsCard;
