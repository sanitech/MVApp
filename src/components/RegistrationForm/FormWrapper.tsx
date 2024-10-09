import React from "react";
import { useMultiForm } from "./useMultiForm";

type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};
export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  const { next } = useMultiForm([]);
  return (
    <div>
      <h1 className="font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-layers"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        {title}
      </h1>

      <div className="mb-8">
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Manage your name, password and account settings.
        </p>
      </div>
      {children}
    </div>
  );
};
