import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import "./UserNav.css";
import { useLocation } from "react-router";
import * as context from "../Cart/CartProvider";
import blank from "../../assets/images/blank.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ContainerProps { }

const UserNav: React.FC<ContainerProps> = () => {
  const { isAuthenticated, user, isLoading, logout } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation(['str']);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { tickets } = context.useCart();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmLogout) {
      logout();
    }
  };

  if (isLoading) {
    return (

      <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">{t('userNav.loading')}</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="w-full">


        <div className="flex justify-between ">
          <div
            className={`cursor-pointer flex items-center relative  mr-5 ${location.pathname === '/cart' ? 'text-blue-600 hover:transition hover:duration-150 hover:ease-in-out hover:transform hover:scale-105' : 'text-gray-900 hover:text-blue-600 hover:transition hover:duration-150 hover:ease-in-out hover:transform hover:scale-105 '}`}
          >
            <Link to="/cart" href="/cart" className={`flex mr-1`} aria-current={location.pathname === '/' ? 'page' : undefined}>
            {t('userNav.cesta')}<svg className="w-6 h-6 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
            </svg></Link>
            
            <div className="absolute inline-flex items-center justify-center w-6 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-6 -end-2 dark:border-gray-900 truncate">{tickets.length > 99 ? '99+' : tickets.length}</div>
          </div>
          <img
            id="avatarButton"
            onClick={toggleDropdown}
            className="flex w-12 h-12 rounded-full cursor-pointer hover:opacity-75 hover:shadow-lg hover:transition hover:duration-150 hover:ease-in-out hover:transform hover:scale-105 border-2 hover:border-gray-200 dark:hover:border-gray-600 overflow-hidden"
            src={user?.picture || blank}
            alt={user?.name}
          />
        </div>


        {isDropdownOpen && (
          <div
            id="userDropdown"
            className="box stripeswd"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white border-b-2">
              <div className="font-medium">{user?.name}</div>
              <div className="font-medium truncate">{user?.email}</div>
              {/* <p className="font-medium">Cartera: 200€</p> */}
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton" >
              <li>
                <Link
                  to={"/profile"}
                  href="/profile"
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center "
                >
                  <svg className="w-5 h-5 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                  {t('perfil')}
                </Link>
              </li>
              <li>
                <Link
                  to={"/tickets"}
                  href="/tickets"
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 flex-shrink-0 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12a3.001 3.001 0 00-2-2.83V7.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C3.76 6 4.04 6 4.6 6h14.8c.56 0 .84 0 1.054.109a1 1 0 01.437.437C21 6.76 21 7.04 21 7.6v1.57a3.002 3.002 0 000 5.66v1.57c0 .56 0 .84-.109 1.054a1 1 0 01-.437.437C20.24 18 19.96 18 19.4 18H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 17.24 3 16.96 3 16.4v-1.57A3.001 3.001 0 005 12z"
                    ></path>
                  </svg>
                  {t('userNav.tickets')}
                </Link>
              </li>
              <li>
                <Link
                to={"/cart"}
                  href="/cart"
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
                >
                  <svg className="w-5 h-5 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                  </svg>

                  {t('userNav.cesta')}
                </Link>
              </li>
            </ul>
            <hr></hr>
            <div className="py-1 hover:bg-gray-100 rounded-b-lg ">
              <a
                onClick={handleLogout}
                href="#"
                className="block px-4 py-2 text-sm text-red-400 font-bold hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                <div className="flex">
                  <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                  </svg>

                  <span className="ml-2 flex flex-shrink-0 justify-center items-center">
                    {t('userNav.logout')}
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default UserNav;
