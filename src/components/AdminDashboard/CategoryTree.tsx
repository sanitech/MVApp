import React, { useEffect, useState } from "react";
import DeleteConformation from "./DeleteConformation";
import axios from "axios";
import Toasts from "../Toasts";
interface CategoryProps {
  category_id: string;
  global_category_id: string;
  business_type_id: string;
  category_name: string;
  description: string;
  business_type_name: string;
}

interface CategoryTreeProps {
  categoryList: CategoryProps[]; // updated to accept the array of businessCategory objects
  title: string;
  fetchCategoryType: () => void; // Add this prop type
}

const CategoryTree = ({
  categoryList,
  title,
  fetchCategoryType,
}: CategoryTreeProps) => {
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
                        <div className="grow">
                          <span className="text-sm text-gray-800 dark:text-neutral-200">
                            {category.category_name}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              (
                              {title.startsWith("Global")
                                ? "Global"
                                : category.business_type_name}
                              )
                            </span>
                          </span>
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
