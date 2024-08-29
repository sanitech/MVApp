import React from "react";
import { FormWrapper } from "./FormWrapper";

type LoginProps = {
  username: string;
  email: string;
  password: string;
  updateFields: (fields: Partial<LoginProps>) => void;
};

const LoginCredentials = ({
  username,
  email,
  password,
  updateFields,
}: LoginProps) => {
  return (
    <FormWrapper title=" Login Credentials">
      <div className="href-target dark:bg-neutral-800" id="loginCred"></div>

      <form>
        {/* <!-- Grid --> */}
        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-email"
              className="inline-block text-sm text-gray-800 mt-2.5 "
            >
              Username
            </label>
          </div>
          {/* <!-- End Col --> */}

          <div className="sm:col-span-9">
            <input
              id="af-account-email"
              type="text"
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="@maria"
              value={username}
              onChange={(e) => updateFields({ username: e.target.value })}
            />
          </div>
          {/* <!-- End Col --> */}
          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-email"
              className="inline-block text-sm text-gray-800 mt-2.5 "
            >
              Email
            </label>
          </div>
          {/* <!-- End Col --> */}

          <div className="sm:col-span-9">
            <input
              id="af-account-email"
              type="email"
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="maria@site.com"
              value={email}
              onChange={(e) => updateFields({ email: e.target.value })}
            />
          </div>
          {/* <!-- End Col --> */}

          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-password"
              className="inline-block text-sm text-gray-800 mt-2.5 "
            >
              Password
            </label>
          </div>
          {/* <!-- End Col --> */}

          <div className="sm:col-span-9">
            <div className="space-y-2">
              <input
                id="af-account-password"
                type="password"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Enter current password"
                value={password}
                onChange={(e) => updateFields({ password: e.target.value })}
              />
              <input
                type="password"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Enter new password"
              />
            </div>
          </div>
          {/* <!-- End Col --> */}
        </div>
        {/* <!-- End Grid --> */}
      </form>
      {/* <!-- End Card --> */}
    </FormWrapper>
  );
};

export default LoginCredentials;
