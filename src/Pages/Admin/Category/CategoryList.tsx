import axios from "axios";
import React, { useEffect, useState } from "react";
import Toasts from "../../../components/Toasts";
import CategoryTree from "../../../components/AdminDashboard/CategoryTree";

interface BusinessProps {
  business_type_id: string;
  business_type_name: string;
}

interface globalProps {
  global_category_id: string;
  category_name: string;
  description: string;
}

interface CategoryListProps {
  category_id: string;
  global_category_id: string;
  business_type_id: string;
  category_name: string;
  description: string;
  business_type_name: string;
}

interface CategoryProps {
  global: CategoryListProps[];
  businessCategory: CategoryListProps[];
}

const CategoryList = () => {
  const [businessType, setBusinessType] = useState<BusinessProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [category, setCategory] = useState<CategoryProps>({
    global: [],
    businessCategory: [],
  });
  const [businessCat, setBusinessCat] = useState<CategoryProps | null>(null);

  // Function to fetch business types
  const fetchBusinessType = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/v1/businessType");
      setBusinessType(response.data);
      setError(null);
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch categories
  const fetchCategoryType = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/v1/category");
      setCategory({
        global: response.data.global || [],
        businessCategory: response.data.businessCategory || [],
      });
      console.log(response.data);
      setError(null);
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Error handler
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

  // Function to create a new category
  const createCategory = async () => {
    setIsLoading(true);
    if (!categoryName || !categoryType) {
      setToastMessage(
        "Please select a business type and enter a category name."
      );
      setToastType("error");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } else {
      try {
        const response = await axios.post("/v1/category", {
          categoryName,
          categoryType,
        });
        setCategoryName("");
        setCategoryType("");
        setToastMessage("Category created successfully.");
        setToastType("success");
        setShowToast(true);
        fetchCategoryType(); // Fetch updated categories after creation
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } catch (err: any) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchBusinessType();
    fetchCategoryType();
    console.log(category);
  }, []);

  // console.log("busin1", Object.keys(category.businessCategory));
  console.log("busin", category.businessCategory);
  // console.log("busin", categoryLists);
  return (
    <div className="bg-white dark:bg-gray-800 py-5 px-8 rounded-lg ">
      <div className="flex flex-row justify-between item-center">
        <h1 className="dark:text-gray-200 font-medium text-2xl mb-3">
          Category
        </h1>
        {showToast && <Toasts type={toastType} message={toastMessage} />}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            onChange={(e) => setCategoryType(e.target.value)}
            value={categoryType}
          >
            <option value={""}>Select Business Type</option>
            <option value="global">Global</option>
            {businessType?.map((type) => (
              <option key={type.business_type_id} value={type.business_type_id}>
                {type.business_type_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            placeholder="Category"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />

          <button
            className="py-2 px-3 w-full inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            onClick={createCategory}
          >
            <svg
              className="shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Create Category
          </button>
        </div>
      </div>

      <div className="mt-5">
        {category.global.length > 0 && (
          <div>
            {/* <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
              Global Categories
            </h2> */}

            <CategoryTree
              categoryList={category.global}
              title={"Global Categories"}
              fetchCategoryType={fetchCategoryType} // Add this prop
            />
          </div>
        )}

        {category.businessCategory && (
          <div>
            <CategoryTree
              categoryList={category.businessCategory}
              title={"Business Categories"}
              fetchCategoryType={fetchCategoryType} // Add this prop
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
