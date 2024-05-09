import React from "react";
import { IonImg } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Herov2: React.FC = () => {
  const { t, i18n } = useTranslation(['str']);

  return (
    <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6">
      <div className="flex p-3 flex-col items-center md:flex-row text-center">
        <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10 p-5 rounded-xl">
          <div className="relative w-full p-3 rounded md:p-8">
            <div className="rounded-lg bg-white text-black w-full">
              <IonImg
                src="https://img.olympics.com/images/image/private/t_4-3_1280/f_auto/primary/o4sf7sxliizsfo2xljck"
                alt="Imagen de Mascota de los Juegos Olímpicos París 2024"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
          <div className="text-left">
            <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-800 sm:text-5xl sm:leading-none md:text-6xl">
              {t('homePage.hero.title')}
            </h2>
            <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {t('homePage.hero.subtitle')}
            </p>
            <div className="mt-5 sm:flex md:mt-8">
              <button
                className="w-full m-1 inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base font-medium"
                aria-haspopup="true"
                aria-expanded="false"
                type="button"
              >
                <span><i className="fa-regular fa-credit-card mr-1"></i>{t('homePage.hero.btnBuyTickets')}</span>
              </button>
              <Link
              to={"/calendar"}
                href="/calendar"
                className="w-full m-1 inline-flex bg-[#2557D6] hover:bg-[#2557D6]/90 text-white ring-1 items-center justify-center rounded-full py-2 px-4 focus:outline-none ring-slate-200 hover:ring-slate-300 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base font-medium"
                aria-haspopup="true"
                aria-expanded="false"
                type="button"
              >
                <span><i className="fa-solid fa-clock mr-1"></i>{t('homePage.hero.btnCalendar')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herov2;
