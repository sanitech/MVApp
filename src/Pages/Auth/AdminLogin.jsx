import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // new state for phone number
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post("/v1/auth/admin", {
        username,
        password_hash: password,
      });

      const userData = response.data;
      console.log("adminis", userData);
      login(userData);
      setIsLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err;
        if (axiosError.response) {
          setError(
            axiosError.response.data.message ||
              "Login failed. Please try again."
          );
        } else {
          setError("Network error. Please try again.");
        }
      } else {
        setError(
          err.message || "An unexpected error occurred. Please try again."
        );
      }
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="h-full w-[30rem] m-auto">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm ">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 ">Admin Login</h1>
          </div>

          <div class="mt-5">
            <form onSubmit={handleLogin}>
              <div class="grid gap-y-4">
                <div>
                  <label htmlFor="email" class="block text-sm mb-2 ">
                    Email address
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      class="py-3 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none   dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      aria-describedby="email-error"
                      onInput={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                    <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        class="size-5 text-red-500"
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
                  <p class="hidden text-xs text-red-600 mt-2" id="email-error">
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>

                <div>
                  <label htmlFor="password" class="block text-sm mb-2 ">
                    Password
                  </label>
                  <div class="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      class="py-3 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none   dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      aria-describedby="password-error"
                      onInput={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        class="size-5 text-red-500"
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
                  {error && (
                    <p class=" text-xs text-red-600 mt-2" id="password-error">
                      {error}
                    </p>
                  )}
                </div>

                <div class="flex justify-center">
                  <button
                    type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
