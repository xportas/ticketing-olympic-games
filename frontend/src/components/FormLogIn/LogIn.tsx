import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import "./logbackground.css";
import paris from "../../assets/images/paris.jpg";
import { useTranslation } from "react-i18next";
import auth0 from 'auth0-js';
import * as config from '../../env';

type Props = {};

const LogIn: React.FC<Props> = () => {
  const initialFormState = { name: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [formDataLogin, setFormDataLogin] = useState(initialFormState);
  const [hideForm, setHideForm] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { t, i18n } = useTranslation(['str']);

  const [webAuth] = useState<any>(() => {
    const params = Object.assign({
      overrides: {
        __tenant: config.AUTH0_DOMAIN,
        __token_issuer: config.AUTH0_TOKEN_ISSUER
      },
      domain: config.AUTH0_DOMAIN,
      clientID: config.AUTH0_CLIENT_ID,
      redirectUri: config.AUTH0_REDIRECT_URI,
      responseType: 'code'
    }, config.AUTH0_AUDIENCE ? { audience: config.AUTH0_AUDIENCE } : {
      audience: `https://${config.AUTH0_DOMAIN}/userinfo`
    });

    return new auth0.WebAuth(params);
  });

  const databaseConnection = 'Username-Password-Authentication';

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const username = formDataLogin.email;
    const password = formDataLogin.password;
    button.disabled = true;
    webAuth.login({
      realm: databaseConnection,
      username: username,
      password: password,
    }, (err: any) => {
      if (err) toast(err);
    });
  };

  const handleSubmitLogIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    login(e);
  }

  const { isAuthenticated, user, isLoading, logout, loginWithRedirect } =
    useAuth0();

  
    const handleInputChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormDataLogin((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };
    


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  function changeFormToLogin() {
    setHideForm(true);
  }
  function changeFormToSingIn() {
    setHideForm(false);
  }

  const handleRetypePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRetypePassword(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password === retypePassword) {
        if(formData.name.length <= 0) {
            setErrorMessage(t('logInPage.logIn.toastErrorName'));
            toast.error(t('logInPage.logIn.toastErrorName'));
            return;
        }
        if(formData.email.length <= 0) {
            setErrorMessage(t('logInPage.logIn.toastErrorMail'));
            toast.error(t('logInPage.logIn.toastErrorMail'));
            return;
        }
        if (formData.password.length < 8) {
          setErrorMessage(t('logInPage.logIn.toastErrorPass'));
          toast.error(t('logInPage.logIn.toastErrorPass'));
          return;
        }
      try {
        const response = await fetch("http://127.0.0.1:8000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        if (response.ok) {
          setFormData(initialFormState);
          toast.success(t('logInPage.logIn.toastSuccess'));
          // TODO: REDIRIGIR A LA PÁGINA DEL USUARIO
        } else {
          const responseData = await response.json();
          responseData && responseData.message
            ? setErrorMessage(responseData.message)
            : setErrorMessage(t('logInPage.logIn.toastErrorAPIresponse'));
            toast.error(errorMessage);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(t('logInPage.logIn.toastErrorServer'));
        toast.error(t('logInPage.logIn.toastErrorServer'));
      }
    } else {
      setErrorMessage(t('logInPage.logIn.toastErrorPassRep'));
      toast.error(t('logInPage.logIn.toastErrorPassRep'));
    }
  };

  const buttonCursorClass = !passwordsMatch
    ? "cursor-not-allowed"
    : "cursor-pointer";

  return (
    <div
      className={`bg-gray-400 dark:bg-gray-300 area`}

    >
      <ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
				<li></li>
				<li></li>
			</ul>
      <div className="h-screen flex justify-center items-center">
        <div className="overlay fixed top-0 left-0 w-full h-full flex justify-center items-center ">
          <div className="bg-slate-50 rounded-lg shadow-lg flex flex-col sm:flex-row w-auto sm:w-auto m-2">
            <div className="w-0 sm:w-1/2">
              <img
                src={paris}
                alt="Juegos Olimpicos Paris 2024"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-full sm:w-1/2 p-2">
              <div className="flex items-center justify-center space-x-4 p-3">
                <h1 className="max-w-4xl font-display text-4xl font-medium tracking-tight text-slate-900">
                  {hideForm ? ('Iniciar Sesión') : ('Registrate')}
                </h1>
              </div>
              <form onSubmit={handleSubmit} className={`w-full h-full  ${hideForm ? "hidden" : ""}`}>
                {/* Nombre Completo */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className=" bg-transparent h-10 w-full rounded-lg text-gray-900 placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                      placeholder="Nombre Completo"
                    />
                    <label
                      htmlFor="name"
                      className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >
                      {t('logInPage.logIn.fullName')}
                    </label>
                  </div>
                </div>
                {/* Correo Electronico */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className=" bg-transparent h-10 w-full rounded-lg text-gray-900 placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                      placeholder="Correo Electrónico"
                    />
                    <label
                      htmlFor="email"
                      className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >
                      {t('logInPage.logIn.mail')}
                    </label>
                  </div>
                </div>
                {/* Contraseña */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className=" bg-transparent h-10 w-full rounded-lg text-gray-900 placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 text-sm"
                      placeholder="Contraseña"
                    />
                    <label
                      htmlFor="password"
                      className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >
                      {t('logInPage.logIn.pass')}
                    </label>
                  </div>
                </div>

                {/* Repite Contraseña */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="password"
                      id="retypepassword"
                      name="retypepassword"
                      value={retypePassword}
                      onChange={handleRetypePasswordChange}
                      className=" bg-transparent h-10 w-full rounded-lg text-sm text-gray-900 placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                      placeholder="retypepassword"
                    />
                    <label
                      htmlFor="retypepassword"
                      className=" absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >
                      {t('logInPage.logIn.repPass')}
                    </label>
                  </div>
                </div>

                {/* Boton de Registro */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <button
                    type="submit"
                    disabled={!passwordsMatch}
                    className={`${buttonCursorClass} button-17`}
                  >
                    {t('logInPage.logIn.createAcc')}
                  </button>
                  {/* {errorMessage && (
                    <p className="mt-2 text-red-600">{errorMessage}</p>
                  )} */}
                  <p className="mt-4 text-xs text-gray-500">
                    {t('logInPage.logIn.aceptCookies')}
                    <a href="#" className="text-blue-600 hover:underline">
                      {t('logInPage.logIn.dataPolicy')}
                    </a>{" "}
                    y{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      {t('logInPage.logIn.cookiesPolicy')}
                    </a>
                    .
                  </p>
                  <div className="text-start">
                    <p
                      onClick={() => loginWithRedirect()}
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800 cursor-pointer"
                    >
                      {t('logInPage.logIn.logIn')}
                    </p>
                  </div>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
