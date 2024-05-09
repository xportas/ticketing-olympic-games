import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ruta actual
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import '../../index.css';
import LoginButton from '../Login/LoginButton';
import UserNav from '../User/UserNav';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
//import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { t } = useTranslation(['str']);
  const location = useLocation(); // Obtén la ruta actual

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className=" bg-gray-100 dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/home"} className="flex items-center space-x-3 rtl:space-x-reverse">
          
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Olympic_rings_without_rims.svg/300px-Olympic_rings_without_rims.svg.png" className="h-8" alt="Logo JJOO"/>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center mx-4">
          <LanguageSelector />
          </div>
          <div id="loginLogoutButtons">
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <UserNav />}
          </div>
          <button onClick={toggleMenu} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">{t('homePage.header.openMainMenu')}</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? '' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/home" className={`block py-2 px-3 ${location.pathname === '/home' ? 'text-blue-600' : 'text-gray-900 hover:bg-gray-100 rounded hover:text-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`} aria-current={location.pathname === '/' ? 'page' : undefined}>{t('homePage.header.btnHome')}</Link>
            </li>
            {isAuthenticated ? (
              <li>
              <Link to="/events" className={`block py-2 px-3 ${location.pathname === '/events' ? 'text-blue-600' : 'text-gray-900 hover:bg-gray-100 rounded hover:text-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`} aria-current={location.pathname === '/events' ? 'page' : undefined}>{t('homePage.header.btnEvents')}</Link>
            </li>
            ) : null}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
