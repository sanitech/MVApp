import React from "react";

interface BranchCardProps {
  device: string;
  location: string;
  browser: string;
  ipAddress: string;
  recentActivity: string;
  isCurrentSession: boolean;
}

const BranchCard: React.FC<BranchCardProps> = ({
  device,
  location,
  browser,
  ipAddress,
  recentActivity,
  isCurrentSession,
}) => {
  return (
    <div className="w-full max-w-md p-6 border rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75h.008v.008H9v-.008zm0 3.75h.008v.008H9V16.5zm0-7.5h.008v.008H9V9zm3 3.75h.008v.008H12v-.008zm0 3.75h.008v.008H12V16.5zm0-7.5h.008v.008H12V9zm3 3.75h.008v.008H15v-.008zm0 3.75h.008v.008H15V16.5zm0-7.5h.008v.008H15V9zM3.375 6.75A2.625 2.625 0 016 4.125h12A2.625 2.625 0 0120.625 6.75v10.5a2.625 2.625 0 01-2.625 2.625H6a2.625 2.625 0 01-2.625-2.625V6.75z"
              />
            </svg>
          </div>
          <span className="text-lg font-medium">{device}</span>
        </div>

        {/* Sign out button */}
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm">
          <span>↗ Sign out</span>
        </button>
      </div>

      {/* Status Tag */}
      <div className="mb-4">
        <span
          className={`${
            isCurrentSession
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-gray-500"
          } px-3 py-1 rounded-full text-sm`}
        >
          {isCurrentSession ? "Current session" : "Expired"}
        </span>
      </div>

      {/* Session Info */}
      <div className="text-sm text-gray-600 space-y-2">
        <div>
          <span className="font-medium">Location:</span> {location}
        </div>
        <div>
          <span className="font-medium">Device:</span> {browser}
        </div>
        <div>
          <span className="font-medium">IP Address:</span> {ipAddress}
        </div>
        <div>
          <span className="font-medium">Recent Activity:</span> {recentActivity}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-4 pt-4">
        <button className="flex items-center gap-2 text-sm text-blue-500 hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 8.25v7.5m1.5-7.5v7.5m-9-3.75h16.5m-16.5 0a9 9 0 0116.5 0m-16.5 0a9 9 0 0016.5 0"
            />
          </svg>
          <span>Don’t recognize something?</span>
        </button>
      </div>
    </div>
  );
};

export default BranchCard;
