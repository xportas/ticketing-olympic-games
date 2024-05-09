import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from "react-i18next";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation(['str']);
  return (
    !isAuthenticated &&(
      <div className="flex justify-center space-x-4">
      <a
        href='login'
        className="inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base"
        aria-haspopup="true"
        aria-expanded="false"
        type="button">
          {t('loginButton.login')}
      </a>
    </div> 
    )
  )
};

export default LoginButton;