import React, { useRef, useState } from "react";
import { FormWrapper } from "./FormWrapper";
type upProps = {
  tin: number;
  vendor_logo: File | null;
  property_images: File[] | null;
  license_image: File | null;
};
type UploadProps = upProps & {
  updateFields: (fields: Partial<upProps>) => void;
};
const UploadDocuments = ({ tin, vendor_logo, updateFields }: UploadProps) => {
  const [logoPreview, setLogoPreview] = useState<string>(
    "https://preline.co/assets/img/160x160/img1.jpg"
  );
  const [licensePreview, setLicensesPreview] = useState<string | null>(null);

  const [propertyImg, setPropertyImg] = useState<string[]>([]);
  const logoRef = useRef<HTMLInputElement>(null);

  const handleLicenseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setLicensesPreview(reader.result as string);
        updateFields({ license_image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
        updateFields({ vendor_logo: file }); // Update vendor_logo field
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePropertyImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;

      const images: File[] = [];
      const previewImages: string[] = [];

      Array.from(files).forEach((file) => {
        images.push(file);
        previewImages.push(URL.createObjectURL(file));
      });

      setPropertyImg(propertyImg);
      updateFields({
        property_images: images,
      });
    }
  };

  const handleLogoClick = () => {
    logoRef.current?.click();
  };
  return (
    <FormWrapper title="Upload Documents">
      <div className="href-target" id="upload"></div>
      {/* <!-- Grid --> */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-12">
        <div className="sm:col-span-3">
          <label
            htmlFor="af-account-email"
            className="inline-block text-sm text-gray-800 mt-2.5 "
          >
            Tax Identification Number (TIN)
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div className="sm:col-span-9">
          <input
            id="af-account-email"
            type="number"
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            placeholder="Enter Tax Identification Number (TIN)"
            value={tin}
            onChange={(e) => updateFields({ tin: parseInt(e.target.value) })}
          />
        </div>
        {/* <!-- End Col --> */}

        <div className="sm:col-span-3">
          <label
            htmlFor="af-submit-app-upload-images"
            className="inline-block text-sm font-medium text-gray-800 mt-2.5"
          >
            License image
          </label>
        </div>
        <div className="sm:col-span-9">
          <label
            htmlFor="af-submit-app-upload-images"
            className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700"
          >
            <input
              id="af-submit-app-upload-images"
              name="af-submit-app-upload-images"
              type="file"
              className="sr-only"
              onChange={handleLicenseChange}
            />
            <svg
              className="size-10 mx-auto text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
              />
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
            </svg>
            <span className="mt-2 block text-sm text-gray-800 ">
              Browse your device or{" "}
              <span className="group-hover:text-blue-700 text-blue-600">
                drag 'n drop'
              </span>
            </span>
            <span className="mt-1 block text-xs text-gray-500 ">
              Maximum file size is 2 MB
            </span>
          </label>
          <div className="flex justify-center items-center mt-4">
            {licensePreview && (
              <img className="h-56" src={licensePreview} alt="" />
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
            Upload Business Logo
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div className="sm:col-span-9">
          <div className="flex items-center gap-5">
            <img
              className="inline-block size-16 rounded-full ring-2 ring-white"
              src={logoPreview}
              alt="Avatar"
              onClick={handleLogoClick}
            />
            <div className="flex gap-x-2">
              <div>
                <button type="button">
                  <label
                    htmlFor="af-submit-app-upload-logo"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent "
                  >
                    <input
                      id="af-submit-app-upload-logo"
                      name="af-submit-app-upload-logo"
                      type="file"
                      className="sr-only"
                      onChange={handleLogoChange}
                      ref={logoRef}
                    />
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    Upload Logo
                  </label>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- End Col --> */}

        <div className="sm:col-span-3">
          <label
            htmlFor="af-submit-app-upload-images"
            className="inline-block text-sm font-medium text-gray-800 mt-2.5"
          >
            Property image
          </label>
        </div>
        <div className="sm:col-span-9">
          <label
            htmlFor="property-images"
            className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700"
          >
            <input
              id="property-images"
              name="af-submit-app-upload-images"
              type="file"
              className="sr-only"
              onChange={handlePropertyImageChange}
              multiple
              accept=".png, .gif, .jpg, .jpeg"
            />
            <svg
              className="size-10 mx-auto text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
              />
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
            </svg>
            <span className="mt-2 block text-sm text-gray-800 ">
              Browse your device or{" "}
              <span className="group-hover:text-blue-700 text-blue-600">
                drag 'n drop'
              </span>
            </span>
            <span className="mt-1 block text-xs text-gray-500 ">
              Maximum file size is 2 MB
            </span>
          </label>
        </div>
      </div>
      <div className="grid gap-3  bg-slate-100 grid-cols-5 mt-4">
        {propertyImg?.map((url, index) => (
          <img
            className="w-96"
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
          />
        ))}
      </div>
      {/* <!-- End Grid --> */}

      {/* <!-- End Card --> */}
    </FormWrapper>
  );
};

export default UploadDocuments;
