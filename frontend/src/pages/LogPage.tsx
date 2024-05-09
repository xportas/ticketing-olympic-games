import { Toaster } from 'sonner';
import LogIn from '../components/FormLogIn/LogIn';
import { TARGET_DATE } from '../env';
import * as auth0 from '@auth0/auth0-react';
import { useAuth0 } from "@auth0/auth0-react";

const LogPage: React.FC = () => {

  const today = new Date();
  const { isAuthenticated, user, isLoading, logout, loginWithRedirect } =
  useAuth0();



  if(TARGET_DATE <= today){
    loginWithRedirect();
    return (
        <div>
        </div>
    );
}


  return (
    <div>
      

      <LogIn />

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default LogPage;
