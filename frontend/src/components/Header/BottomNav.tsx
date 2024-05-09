import React from 'react';

const BottomNav: React.FC = () => {
    return (
        <div className="fixed z-50 md:hidden w-full h-16 max-w-lg left-1/2 -translate-x-1/2 bottom-4 bg-white border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg mx-auto grid-cols-3">
            <button data-tooltip-target="tooltip-home" type="button" className="inline-flex items-center justify-center px-5 rounded-s-full group hover:bg-gray-50 dark:hover:bg-gray-800">
                <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                <span className="sr-only">Home</span>
            </button>
            <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip transition-opacity duration-300 dark:bg-gray-700">
                Home
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div id="tooltip-wallet" role="tooltip" className="absolute z-10 invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip transition-opacity duration-300 dark:bg-gray-700">
                Wallet
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="flex items-center justify-center">
                <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full group hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    <span className="sr-only">New item</span>
                </button>
            </div>
            <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip transition-opacity duration-300 dark:bg-gray-700">
                Create new item
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip transition-opacity duration-300 dark:bg-gray-700">
                Settings
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-profile" type="button" className="inline-flex items-center justify-center px-5 rounded-e-full group hover:bg-gray-50 dark:hover:bg-gray-800">
                <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <span className="sr-only">Profile</span>
            </button>
            <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip transition-opacity duration-300 dark:bg-gray-700">
                Profile
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    </div>
    );
};

export default BottomNav;