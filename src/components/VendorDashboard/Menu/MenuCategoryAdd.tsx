import axios from "axios";
import React, { useRef, useState } from "react";

const MenuCategoryCardAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  const modelRef = useRef<HTMLDivElement>(null);
  const createCategoryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Access form elements
    const category = e.currentTarget.elements.namedItem(
      "category"
    ) as HTMLInputElement;
    const description = e.currentTarget.elements.namedItem(
      "description"
    ) as HTMLInputElement;

    try {
      // Post data to the server
      const response = await axios.post("/v1/menu/category", {
        category: category.value,
        description: description.value,
        vendor_id: user.vendor_id,
      });

      // Close modal and clear inputs if the response is successful
      setIsModalOpen(false);
      console.log(response.data);
      category.value = "";
      description.value = "";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Check for error response and status which might be undefined
        setError(error.response?.data?.message);
        const status = error.response?.status;
      } else {
        // Handle non-Axios error
        console.error("An unknown error occurred");
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="card shadow-md bg-slate-100  ml-3 cursor-pointer hover:bg-slate-200">
      <button
        type="button"
        className="flex justify-center items-center h-[100%] px-4 py-4"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-slide-up-animation-modal"
        data-hs-overlay="#hs-slide-up-animation-modal"
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-plus-lg size-10 text-gray-900"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
      </button>

      <div
        id="hs-slide-up-animation-modal"
        className={`hs-overlay ${
          isModalOpen ? "" : "hidden"
        } size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none`}
        role="dialog"
        aria-labelledby="hs-slide-up-animation-modal-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3
                id="hs-slide-up-animation-modal-label"
                className="font-bold text-gray-800 dark:text-white"
              >
                Category Create
              </h3>
              <button
                type="button"
                className="hs-dropup-toggle size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-slide-up-animation-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={createCategoryHandler}>
              <div className="p-4 overflow-y-auto">
                <div className="grid gap-y-4">
                  {/* <!-- Form Group --> */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 ">
                      Category Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="category"
                        name="category"
                        className="py-3 px-4 block w-full  border-2 border-gray-300 border-spacing-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                        required
                        aria-describedby="category-error"
                        placeholder="Enter Category Name"
                      />
                      <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          className="size-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 ">
                      Description(optional)
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        id="af-submit-app-description"
                        className="py-2 px-3 block w-full border-gray-200bo border-2 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none  "
                        placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page."
                      />
                      <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          className="size-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {error && (
                    <p
                      className="text-base py-3 px-2 rounded-sm bg-red-300 text-red-600 mt-2"
                      id="email-error"
                    >
                      {error}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <button
                  type="button"
                  className="hs-dropup-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-slide-up-animation-modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-900 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCategoryCardAdd;

// <div
//   id="hs-modal-recover-account"
//   className={`hs-overlay ${
//     isModalOpen ? "" : "hidden"
//   } size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto`}
//   role="dialog"
//   // tabindex="-1"
//   ref={modelRef}
//   aria-labelledby="hs-modal-recover-account-label"
//   aria-label="Close"
// >
//   <div
//     onClick={(e) => e.stopPropagation()}
//     className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
//     // className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
//   >
//     <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm">
//       <div className="p-4 sm:p-7">
//         <div className="absolute top-2 end-2">
//           <button
//             type="button"
//             className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
//             aria-label="Close"
//             data-hs-overlay="#hs-modal-recover-account"
//           >
//             <span className="sr-only">Close</span>
//             <svg
//               className="shrink-0 size-4"
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M18 6 6 18" />
//               <path d="m6 6 12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="text-center">
//           <h3
//             id="hs-modal-recover-account-label"
//             className="block text-2xl font-bold text-gray-800 "
//           >
//             Create Category
//           </h3>
//           <p className="mt-2 text-sm text-gray-600 ">
//             Remember your password?
//             <a
//               className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
//               href="../examples/html/modal-signin.html"
//             >
//               Sign in here
//             </a>
//           </p>
//         </div>

//         <div className="mt-5">
//           {/* <!-- Form --> */}
//           <form onSubmit={createCategoryHandler}>
//             <div className="grid gap-y-4">
//               {/* <!-- Form Group --> */}
//               <div>
//                 <label htmlFor="email" className="block text-sm mb-2 ">
//                   Category Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="category"
//                     name="category"
//                     className="py-3 px-4 block w-full  border-2 border-gray-300 border-spacing-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
//                     required
//                     aria-describedby="category-error"
//                     placeholder="Enter Category Name"
//                   />
//                   <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
//                     <svg
//                       className="size-5 text-red-500"
//                       width="16"
//                       height="16"
//                       fill="currentColor"
//                       viewBox="0 0 16 16"
//                       aria-hidden="true"
//                     >
//                       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <p
//                   className="hidden text-xs text-red-600 mt-2"
//                   id="email-error"
//                 >
//                   Please include a valid email address so we can get back to
//                   you
//                 </p>
//               </div>
//               {/* <!-- End Form Group --> */}

//               {/* <!-- Form Group --> */}
//               <div>
//                 <label htmlFor="email" className="block text-sm mb-2 ">
//                   Description(optional)
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     name="description"
//                     id="af-submit-app-description"
//                     className="py-2 px-3 block w-full border-gray-200bo border-2 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none  "
//                     placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page."
//                   />
//                   <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
//                     <svg
//                       className="size-5 text-red-500"
//                       width="16"
//                       height="16"
//                       fill="currentColor"
//                       viewBox="0 0 16 16"
//                       aria-hidden="true"
//                     >
//                       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <p
//                   className="hidden text-xs text-red-600 mt-2"
//                   id="email-error"
//                 >
//                   Please include a valid email address so we can get back to
//                   you
//                 </p>
//               </div>
//               {/* <!-- End Form Group --> */}

//               {error && (
//                 <p
//                   className="text-base py-3 px-2 rounded-sm bg-red-300 text-red-600 mt-2"
//                   id="email-error"
//                 >
//                   {error}
//                 </p>
//               )}
//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
//               >
//                 Create Category
//               </button>
//             </div>
//           </form>
//           {/* <!-- End Form --> */}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>;
