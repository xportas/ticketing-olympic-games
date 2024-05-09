import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const date = new Date();
  const { t, i18n } = useTranslation(['str']);


  return (
    <footer className="bg-gray-100  border-gray-300 border-t-2">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
     
        <div className="w-full h-1/2 flex justify-center items-center">
          <svg
            className="w-1/5 text-white cursor-pointer"
            version="1.1"
            id="Layer"
            x="0px"
            y="0px"
            viewBox="0 0 148 70"
          >
            <style type="text/css">{`.st0{fill:#9ca3af;}`}</style>
            <path
              id="Olympic_rings"
              className="st0"
              d="M124.6,0.9c-12.3,0-22.3,9.5-23.3,21.5c-0.7-0.1-1.3-0.1-2-0.1c-0.7,0-1.4,0-2,0.1
c-0.9-12-11-21.5-23.3-21.5c-12.3,0-22.3,9.5-23.3,21.5c-0.7-0.1-1.3-0.1-2-0.1s-1.4,0-2,0.1c-0.9-12-11-21.5-23.3-21.5
C10.5,0.9,0,11.4,0,24.3c0,12.9,10.5,23.4,23.4,23.4c0.7,0,1.4,0,2-0.1c0.9,12,11,21.5,23.3,21.5C61,69.1,71,59.6,72,47.6
c0.7,0.1,1.3,0.1,2,0.1c0.7,0,1.4,0,2-0.1c0.9,12,11,21.5,23.3,21.5c12.3,0,22.3-9.5,23.3-21.5c0.7,0.1,1.3,0.1,2,0.1
c12.9,0,23.4-10.5,23.4-23.4C148,11.4,137.5,0.9,124.6,0.9z M3.9,24.3c0-10.8,8.7-19.5,19.5-19.5c10.4,0,18.8,8.1,19.4,18.3
c-9.4,2.4-16.5,10.6-17.4,20.6c-0.7,0.1-1.3,0.1-2,0.1C12.6,43.8,3.9,35,3.9,24.3z M42.6,27.2c-1.1,7.3-6.3,13.3-13.2,15.6
C30.5,35.5,35.7,29.5,42.6,27.2z M48.7,65.2c-10.4,0-18.8-8.1-19.4-18.3c9.4-2.4,16.5-10.6,17.4-20.6c0.7-0.1,1.3-0.1,2-0.1
c0.7,0,1.4,0,2,0.1c0.9,10,8,18.1,17.4,20.6C67.5,57.1,59,65.2,48.7,65.2z M54.7,27.2c6.9,2.3,12.1,8.3,13.2,15.6
C61,40.5,55.8,34.5,54.7,27.2z M72,43.7c-0.9-10-8-18.1-17.4-20.6C55.2,12.9,63.6,4.8,74,4.8c10.4,0,18.8,8.1,19.4,18.3
C84,25.5,76.9,33.7,76,43.7c-0.7,0.1-1.3,0.1-2,0.1C73.3,43.8,72.6,43.7,72,43.7z M93.3,27.2c-1.1,7.3-6.3,13.3-13.2,15.6
C81.2,35.5,86.4,29.5,93.3,27.2z M99.3,65.2c-10.4,0-18.8-8.1-19.4-18.3c9.4-2.4,16.5-10.6,17.4-20.6c0.7-0.1,1.3-0.1,2-0.1
c0.7,0,1.4,0,2,0.1c0.9,10,8,18.1,17.4,20.6C118.1,57.1,109.7,65.2,99.3,65.2z M105.4,27.2c6.9,2.3,12.1,8.3,13.2,15.6
C111.7,40.5,106.5,34.5,105.4,27.2z M124.6,43.8c-0.7,0-1.4,0-2-0.1c-0.9-10-8-18.1-17.4-20.6c0.6-10.2,9.1-18.3,19.4-18.3
c10.8,0,19.5,8.7,19.5,19.5C144.1,35,135.4,43.8,124.6,43.8z"
            ></path>
          </svg>
        </div>

        {/* Navegación */}
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              {t('homePage.footer.politicaCookies')}
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              {t('homePage.footer.ajustesCookies')}
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              {t('homePage.footer.politicaPrivacidad')}
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              {t('homePage.footer.terminosServicios')}
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              {t('homePage.footer.centroContact')}
            </a>
          </div>
        </nav>
        {/* Mapa */}
        <div className="flex justify-center space-x-6">
          <iframe
            className="w-1/2 h-1/2 border-2 border-gray-400 rounded-lg"
            src="https://www.openstreetmap.org/export/embed.html?bbox=6.5984487533569345%2C46.50712117366131%2C6.6267728805542%2C46.52041124556147&amp;layer=mapnik&amp;marker=46.51376661586855%2C6.612610816955566"
          ></iframe>
          <br />
        </div>
        {/* Redes Sociales */}
        <div className="flex justify-center mt-8 space-x-6">
          <a
            href="https://www.instagram.com/JuegosOlimpicos/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Instagram</span>
            <i className="fa-brands fa-instagram text-2xl"></i>
          </a>
          <a
            href="https://twitter.com/JuegosOlimpicos"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Twitter</span>
            <i className="fa-brands fa-x-twitter text-2xl"></i>
          </a>
          <a
            href="https://www.tiktok.com/@olympics"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Tiktok</span>
            <i className="fa-brands fa-tiktok text-2xl"></i>
          </a>
          <a
            href="https://www.facebook.com/olympics/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Facebook</span>
            <i className="fa-brands fa-facebook text-2xl"></i>
          </a>
          <a
            href="https://www.youtube.com/olympics"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Youtube</span>
            <i className="fa-brands fa-youtube text-2xl"></i>
          </a>
          <a
            href="https://www.snapchat.com/add/olympics"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Snapchat</span>
            <i className="fa-brands fa-snapchat text-2xl"></i>
          </a>
          <a
            href="https://www.vk.com/olympics"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Vk</span>
            <i className="fa-brands fa-vk text-2xl"></i>
          </a>
          <a
            href="https://www.weibo.com/olympics"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Weibo</span>
            <i className="fa-brands fa-weibo text-2xl"></i>
          </a>
        </div>
                {/* Formulario de suscripción */}
                <div className="mx-auto max-w-md">
          <strong className="block text-center text-base font-bold text-gray-500">
          {t('homePage.footer.getNews')}
          </strong>

          <form className="mt-6">
            <div className="relative max-w-lg">
              <label className="sr-only" htmlFor="email">
                {t('homePage.footer.email')}
              </label>
              <input
                className="w-full rounded-full border-gray-400 bg-gray-200 p-4 pe-32 text-xs font-medium"
                id="email"
                type="email"
                placeholder="john@doe.com"
              />

              <button className="absolute end-1 top-1/2 -translate-y-1/2 text-white bg-blue-500 cursor-pointer inline-flex items-center justify-center space-x-2 ring-1 ring-slate-200 rounded-full py-2 px-4 focus:outline-none hover:ring-slate-300 active:bg-blue-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base">
                {t('homePage.footer.subs')}
              </button>
            </div>
          </form>
        </div>
        {/* Botones Apps Descarga */}
        <div
          id="botonesApps"
          className="flex items-center justify-center flex-shrink-0"
        >
          <a
            href="https://apps.apple.com/es/app/olympics/id808794344"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-200 cursor-pointer inline-flex items-center justify-center space-x-2 ring-1 ring-slate-200 rounded-full py-2 px-4 focus:outline-none hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base"
            aria-haspopup="true"
            aria-expanded="false"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 820 950"
            >
              <path d="M404.345 229.846c52.467 0 98.494-20.488 138.08-61.465s59.38-88.626 59.38-142.947c0-5.966-.472-14.444-1.414-25.434-6.912.942-12.096 1.727-15.552 2.355-48.383 6.908-90.954 30.615-127.713 71.12-36.758 40.506-55.137 83.838-55.137 129.996 0 5.337.785 14.13 2.356 26.375zM592.379 950c37.387 0 78.701-25.59 123.943-76.772S796.122 761.915 820 692.836c-88.912-45.844-133.368-111.626-133.368-197.348 0-71.591 35.973-132.82 107.92-183.688-49.954-62.486-115.931-93.729-197.931-93.729-34.56 0-66.134 5.181-94.724 15.543l-17.908 6.594-24.035 9.42c-15.709 5.966-30.004 8.95-42.885 8.95-10.054 0-23.25-3.455-39.586-10.363l-18.38-7.536-17.436-7.065c-25.449-10.676-52.782-16.014-82-16.014-78.23 0-141.065 26.376-188.506 79.128C23.72 349.479 0 419.03 0 505.379c0 121.517 38.015 233.772 114.046 336.763C166.828 914.047 215.054 950 258.724 950c18.537 0 36.916-3.611 55.138-10.833l23.092-9.42 18.38-6.594c25.762-9.106 49.482-13.659 71.16-13.659 22.935 0 49.326 5.81 79.173 17.427l14.609 5.652C550.75 944.191 574.786 950 592.379 950z"></path>
            </svg>

            <div className="flex flex-col">
              <span className="text-xs">{t('homePage.footer.disponible')}</span>
              <span className="text-lg">App Store</span>
            </div>
          </a>
          <div style={{ width: "16px" }}></div>

          <a
            href="https://play.google.com/store/apps/details?id=org.olympic.app.mobile"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-200 cursor-pointer inline-flex items-center justify-center space-x-2 ring-1 ring-slate-200 rounded-full py-2 px-4 focus:outline-none hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base"
            aria-haspopup="true"
            aria-expanded="false"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 -0.5 408 467.8"
            >
              <linearGradient
                id="a"
                x2="261.746"
                y1="112.094"
                y2="112.094"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#63be6b"></stop>
                <stop offset="0.506" stopColor="#5bbc6a"></stop>
                <stop offset="1" stopColor="#4ab96a"></stop>
              </linearGradient>
              <linearGradient
                id="b"
                x1="0.152"
                x2="179.896"
                y1="223.393"
                y2="223.393"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3ec6f2"></stop>
                <stop offset="1" stopColor="#45afe3"></stop>
              </linearGradient>
              <linearGradient
                id="c"
                x1="179.896"
                x2="407.976"
                y1="229.464"
                y2="229.464"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#faa51a"></stop>
                <stop offset="0.387" stopColor="#fab716"></stop>
                <stop offset="0.741" stopColor="#fac412"></stop>
                <stop offset="1" stopColor="#fac80f"></stop>
              </linearGradient>
              <linearGradient
                id="d"
                x1="1.744"
                x2="272.296"
                y1="345.521"
                y2="345.521"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#ec3b50"></stop>
                <stop offset="1" stopColor="#e7515b"></stop>
              </linearGradient>
              <path
                fill="url(#a)"
                d="M261.7 142.3L15 1.3C11.9-.5 8-.4 5 1.4c-3.1 1.8-5 5-5 8.6 0 0 .1 13 .2 34.4l179.7 179.7z"
              ></path>
              <path
                fill="url(#b)"
                d="M.2 44.4C.5 121.6 1.4 309 1.8 402.3L180 224.1z"
              ></path>
              <path
                fill="url(#c)"
                d="M402.9 223l-141.2-80.7-81.9 81.8 92.4 92.4L403 240.3c3.1-1.8 5-5.1 5-8.6 0-3.6-2-6.9-5.1-8.7z"
              ></path>
              <path
                fill="url(#d)"
                d="M1.7 402.3c.2 33.3.3 54.6.3 54.6 0 3.6 1.9 6.9 5 8.6 3.1 1.8 6.9 1.8 10 0l255.3-148.9-92.4-92.4z"
              ></path>
            </svg>
            <div className="flex flex-col">
              <span className="text-xs">{t('homePage.footer.disponible')}</span>
              <span className="text-lg">Google Play</span>
            </div>
          </a>
        </div>

        {/* Derechos de autor */}
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
        {t('homePage.footer.copyright')}{date.getFullYear()}{t('homePage.footer.derechosReservados')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
