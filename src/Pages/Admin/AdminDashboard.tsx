import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      {/* <!-- Card Section --> */}
      {/* <!-- Grid --> */}
      <div className="grid md:grid-cols-4 border border-gray-200 shadow-sm rounded-xl overflow-hidden dark:border-neutral-800">
        {/* <!-- Card --> */}
        <a
          className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent dark:bg-neutral-900 dark:before:bg-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          href="#"
        >
          <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
            <svg
              className="shrink-0 size-5 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>

            <div className="grow">
              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-neutral-200">
                Total users
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-500">
                72,540
              </h3>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  from{" "}
                  <span className="font-semibold text-gray-800 dark:text-neutral-200">
                    70,104
                  </span>
                </p>
                <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
                  <svg
                    className="inline-block size-3 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                  <span className="inline-block">12.5%</span>
                </span>
              </div>
            </div>
          </div>
        </a>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <a
          className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent dark:bg-neutral-900 dark:before:bg-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          href="#"
        >
          <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
            <svg
              className="shrink-0 size-5 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 22h14" />
              <path d="M5 2h14" />
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
            </svg>

            <div className="grow">
              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-neutral-200">
                Sessions
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-500">
                29.4%
              </h3>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  from{" "}
                  <span className="font-semibold text-gray-800 dark:text-neutral-200">
                    29.1%
                  </span>
                </p>
                <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
                  <svg
                    className="inline-block size-3 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                  <span className="inline-block">1.7%</span>
                </span>
              </div>
            </div>
          </div>
        </a>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <a
          className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent dark:bg-neutral-900 dark:before:bg-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          href="#"
        >
          <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
            <svg
              className="shrink-0 size-5 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
              <path d="m12 12 4 10 1.7-4.3L22 16Z" />
            </svg>

            <div className="grow">
              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-neutral-200">
                Avg. Click Rate
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-500">
                56.8%
              </h3>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  from{" "}
                  <span className="font-semibold text-gray-800 dark:text-neutral-200">
                    61.2%
                  </span>
                </p>
                <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
                  <svg
                    className="inline-block size-3 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  <span className="inline-block">4.4%</span>
                </span>
              </div>
            </div>
          </div>
        </a>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <a
          className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent dark:bg-neutral-900 dark:before:bg-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          href="#"
        >
          <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
            <svg
              className="shrink-0 size-5 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
              <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
              <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
            </svg>

            <div className="grow">
              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-neutral-200">
                Pageviews
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-500">
                92,913
              </h3>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  from{" "}
                  <span className="font-semibold text-gray-800 dark:text-neutral-200">
                    94,012
                  </span>
                </p>
                <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
                  <svg
                    className="inline-block size-3 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  <span className="inline-block">0.1%</span>
                </span>
              </div>
            </div>
          </div>
        </a>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Grid --> */}
      {/* <!-- End Card Section --> */}
    </div>
  );
};

export default AdminDashboard;
