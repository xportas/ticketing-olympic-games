import React, { useEffect } from "react";
import { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import CountdownTimer from "../Timer/Timer";
import { Timer } from "@mui/icons-material";

const Hero: React.FC = () => {
  const initialFormState = { fullName: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [hideForm, setHideForm] = useState(false);
  const { isAuthenticated, user, isLoading, logout } = useAuth0();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    const currentDate = new Date();
    const targetDate = new Date("2024-03-31T00:00:00");
    console.log(currentDate > targetDate);
    console.log(currentDate);
    console.log(targetDate);
    if (currentDate > targetDate) {
      setHideForm(true);
    }
    if (isAuthenticated) {
      setHideForm(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        setFormData(initialFormState);
        toast.success("Registro completado");
        // TODO: REDIRIGIR A LA PÁGINA DEL USUARIO
      } else {
        const responseData = await response.json();
        responseData && responseData.message
          ? toast.error(responseData.message)
          : toast.error("Error desconocido en la respuesta de la API");
      }
    } catch (error) {
      console.error("Entra en el catch");
      toast.error("Error en el servidor");
    }
  };

  return (
    
    <div className="mt-16 lg:mt-20 md:mt-20 sm:mt-16 flex flex-col md:flex-row bg-white">
      <div className="flex flex-1 flex-col text-white p-8">
        <div className="container mx-auto px-6 py-12 sm:text-center md:text-left xl:text-left ">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-5xl lg:6xl xl:text-7xl">
            Entradas Juegos Olímpicos París 2024
          </h1>
          <h2 className="text-2xl text-gray-700 mt-4">
            Tu puerta de entrada para vivir el pináculo del logro deportivo.
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center md:flex-col md:justify-start xl:items-start items-start xl:flex-row w-full">
            <div className="relative flex flex-1 flex-col items-stretch sm:flex-none">
              <button
                className="inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right"
                id="headlessui-menu-button-:r4:"
                aria-haspopup="true"
                aria-expanded="false"
                data-headlessui-state=""
                type="button"
              >
                <span className="ml-3">Comprar Entradas</span>
              </button>
            </div>
            <div className="relative flex flex-1 flex-col items-stretch sm:flex-none">
              <button
                className="inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right"
                id="headlessui-menu-button-:r4:"
                aria-haspopup="true"
                aria-expanded="false"
                data-headlessui-state=""
                type="button"
              >
                <span className="ml-3">Calendario Eventos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <CountdownTimer />

      {hideForm ? null : (
        <div className="flex flex-1 justify-center items-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className=" p-6 rounded-lg shadow-md bg-white">
              <h2 className="text-base mb-4">Inicia sesion con</h2>

              <div className="flex items-center justify-between mb-6 space-x-2">
                <div className="flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 text-gray-500 hover:bg-gray-100 h-12 w-28 cursor-pointer">
                  <FacebookIcon sx={{ fontSize: "24px" }} />
                </div>
                <div className="flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 text-gray-500 hover:bg-gray-100 h-12 w-28 cursor-pointer">
                  <TwitterIcon sx={{ fontSize: "24px" }} />
                </div>
                <div className="flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 text-gray-500 hover:bg-gray-100 h-12 w-28 cursor-pointer">
                  <MailRoundedIcon sx={{ fontSize: "24px" }} />
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400">O</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Nombre completo"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      placeholder="Correo electrónico"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      id="password"
                      placeholder="Contrasena"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button className="w-full bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700">
                    Crea tu cuenta
                  </button>

                  <p className="mt-4 text-xs text-gray-500">
                    Al registrarte, aceptas nuestras{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Política de Datos
                    </a>{" "}
                    y{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Política de Cookies
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
