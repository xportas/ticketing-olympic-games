import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <button
        onClick={() => logout()}
        className="flex items-center bg-slate-300 text-white  rounded-lg max-w-xs px-4 py-2 font-medium hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-lg"
      >
            <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10.5 12H17M14.5 9l2.5 3M14.5 15l2.5-3M17 17c0 2.21-1.79 3-4 3h-3a4 4 0 01-4-4V8a4 4 0 014-4h3c2.21 0 4 .79 4 3"
      ></path>
    </svg>
      </button>
    )
  );
};

export default LogoutButton;
