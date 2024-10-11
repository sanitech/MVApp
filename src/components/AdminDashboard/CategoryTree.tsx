import React, { useEffect, useState } from "react";
import DeleteConformation from "./DeleteConformation";
import axios from "axios";
import Toasts from "../Toasts";
interface CategoryProps {
  category_id: string;
  global_category_id: string;
  business_type_id: string;
  category_name: string;
  icon: string;
  business_type_name: string;
}

interface CategoryTreeProps {
  categoryList: CategoryProps[]; // updated to accept the array of businessCategory objects
  title: string;
  fetchCategoryType: () => void; // Add this prop type
  // editCategory: () => void; // Add this prop type
}

const CategoryTree = ({
  categoryList,
  title,
  fetchCategoryType,
}: // editCategory,
CategoryTreeProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>();
  const deleteCategory = async (category_id: string, category_type: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `/v1/category/${category_id}/${category_type}`
      );
      fetchCategoryType();
      setToastType("success");
      setToastMessage("Success deleted category");

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      setError(null);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data.message || "Something went wrong.");
      setToastMessage(err.response?.data.message || "Something went wrong.");
    } else {
      setError(err.message || "An unexpected error occurred.");
      setToastMessage(err.message || "An unexpected error occurred.");
    }
    setToastType("error");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handelEdit = () => {
    alert();
  };

  return (
    <div
      className="hs-accordion-treeview-root"
      role="tree"
      aria-orientation="vertical"
    >
      <div
        className="hs-accordion-group"
        role="group"
        data-hs-accordion-always-open=""
      >
        <div
          className="hs-accordion active"
          role="treeitem"
          aria-expanded="true"
          id="hs-basic-usage-example-tree-heading-one"
        >
          <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
            <button
              className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              aria-expanded="true"
              aria-controls="hs-basic-usage-example-tree-collapse-one"
            >
              <svg
                className="size-4 text-gray-800 dark:text-neutral-200"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path
                  className="hs-accordion-active:hidden block"
                  d="M12 5v14"
                ></path>
              </svg>
            </button>

            <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
              <div className="flex items-center gap-x-3">
                <svg
                  className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                </svg>
                <div className="grow">
                  <span className="text-sm text-gray-800 dark:text-neutral-200">
                    {title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            id="hs-basic-usage-example-tree-collapse-one"
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            role="group"
            aria-labelledby="hs-basic-usage-example-tree-heading-one"
          >
            {/* Category List */}
            <div
              className="hs-accordion-group ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700"
              role="group"
              data-hs-accordion-always-open=""
            >
              {categoryList.map((category) => (
                <div
                  key={
                    title.startsWith("Global")
                      ? category.global_category_id
                      : category.category_id
                  }
                  className="hs-accordion active"
                  role="treeitem"
                  aria-expanded="true"
                  id={`hs-category-${
                    title.startsWith("Global")
                      ? category.global_category_id
                      : category.category_id
                  }`}
                >
                  <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                    <button
                      className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      aria-expanded="true"
                      aria-controls={`hs-collapse-${category.category_id}`}
                      onClick={() =>
                        deleteCategory(
                          title.startsWith("Global")
                            ? category.global_category_id
                            : category.category_id,
                          title.startsWith("Global") ? "global" : "business"
                        )
                      }
                    >
                      <svg
                        className="size-4 text-gray-800 dark:text-neutral-200"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path
                          className="hs-accordion-active:hidden block"
                          d="M12 5v14"
                        ></path>
                      </svg>
                    </button>

                    <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                      <div className="flex items-center gap-x-3">
                        <svg
                          className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                        </svg>
                        <div className="grow flex  flex-row gap-3">
                          <span className="text-sm text-gray-800 dark:text-neutral-200 ">
                            {category.category_name}
                            {category.icon}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              (
                              {title.startsWith("Global")
                                ? "Global"
                                : category.business_type_name}
                              )
                            </span>
                          </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            width={20}
                            height={20}
                            className="text-gray-50"
                            onClick={handelEdit}
                          >
                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showToast && <Toasts type={toastType} message={toastMessage} />}
    </div>
  );
};

export default CategoryTree;
