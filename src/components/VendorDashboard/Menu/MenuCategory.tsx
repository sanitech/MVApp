import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type categoryProps = {
  category_id: string;
  category_name: string;
  description: string;
  vendor_id: number;
  created_at: string;
  updated_at: string;
  menuItemCount: number;
};
const MenuCategoryCard = (
  { category }: { category: categoryProps },
  setDeletedCategory: HTMLFormElement
) => {
  // const [deletedCategory, setDeletedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="card shadow-md bg-slate-100 px-4 py-4 cursor-pointer relative">
        <img
          className="size-7"
          src="https://th.bing.com/th/id/R.a3bbc1907945ec724e78991fb9b42e1f?rik=eAP20UMj8H9eOA&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fpixelkit%2ftasty-bites%2f512%2fhamburger-icon.png&ehk=WM9MLiuIKJeTHIjfDi1e3sBNDWtPrAxUYiqCN0qt8iI%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />
        <div className="text-sm text-slate-400 my-1 line-clamp-1">
          {category.category_name}
        </div>
        <div className="text-base font-medium text-slate-500  whitespace-nowrap ">
          {category.menuItemCount} items
        </div>
        <div className="absolute top-[-10px] right-0 left-0 flex justify-between ">
          <button
            className="text-sm bg-white shadow-md p-2 py-2 rounded-full"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-edit-category"
            data-hs-overlay="#edit-category-model"
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-pencil-square size-4"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>
          <button
            className="text-sm bg-white shadow-md p-2 py-2 rounded-full"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-delete-alert"
            data-hs-overlay="#hs-delete-alert"
            // onClick={() => setDeletedCategory(category.category_name)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3 text-red-600 size-3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
        </div>

        <div
          id="edit-category-model"
          className={`hs-overlay ${
            isModalOpen ? "" : "hidden"
          } size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto`}
          role="dialog"
          // tabindex="-1"
          aria-labelledby="hs-edit-category-label"
          aria-label="Close"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
          >
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-4 sm:p-7">
                <div className="absolute top-2 end-2">
                  <button
                    type="button"
                    className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Close"
                    data-hs-overlay="#hs-edit-category"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                <div className="text-center">
                  <h3
                    id="hs-edit-category-label"
                    className="block text-2xl font-bold text-gray-800 "
                  >
                    Create Category
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 ">
                    Remember your password?
                    <a
                      className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                      href="../examples/html/modal-signin.html"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>

                <div className="mt-5">
                  {/* <!-- Form --> */}
                  <form>
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
                          Please include a valid email address so we can get
                          back to you
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
                          Please include a valid email address so we can get
                          back to you
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
                      <button
                        type="submit"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Create Category
                      </button>
                    </div>
                  </form>
                  {/* <!-- End Form --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* pop up model */}
    </>
  );
};

export default MenuCategoryCard;
