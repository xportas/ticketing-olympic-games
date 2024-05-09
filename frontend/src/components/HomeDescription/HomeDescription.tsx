import { TARGET_DATE } from "../../env";
import "../../index.css";
import React from "react";
import "./HomeDescription.css";
import { useTranslation } from "react-i18next";

const HomeDescription: React.FC = () => {
  const TARGETDATE: Date = new Date(TARGET_DATE);
  const TargetDateScheduler: Date = new Date(TARGETDATE);
  TargetDateScheduler.setDate(TargetDateScheduler.getDate() - 1);
  const today: Date = new Date();
  const { t, i18n } = useTranslation(['str']);

  return (
    <div className="relative m-4 items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6">
      
      <h2 className="font-heading dark:text-gray-100 mb-8 text-3xl font-bold lg:text-4xl">
        {t('homePage.homeDescription.question')}
      </h2>
      <p className="text-gray-600 dark:text-slate-400 mb-8">
        {t('homePage.homeDescription.body')} <br /> {t('homePage.homeDescription.body2')}
      </p>

      <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-800 dark:text-slate-200"
              >
                <path d="M12 5l0 14"></path>
                <path d="M18 13l-6 6"></path>
                <path d="M6 13l6 6"></path>
              </svg>
            </div>
          </div>
          <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
        </div>
        <div className="pt-1 pb-8">
          <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
            {t('homePage.homeDescription.register')}{" "}
            {today < new Date(TARGET_DATE) ? (
              <span className="inline-block w-4 h-4 rounded-full bg-green-500 border-2 border-white relative blink"></span>
            ) : (
              <span className="inline-block w-4 h-4 rounded-full bg-red-500 border-2 border-white relative blink"></span>
            )}
          </p>

          <p className="text-gray-600 dark:text-slate-400">
          {t('homePage.homeDescription.p1')} {TARGET_DATE.toDateString()}{t('homePage.homeDescription.p12')}
          </p>
          <div
            className="flex items-center p-4 mt-2 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">{t('homePage.homeDescription.span')}</span>
            <div>
              <span className="font-medium">{t('homePage.homeDescription.span2')}</span>{t('homePage.homeDescription.span3')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-800 dark:text-slate-200"
              >
                <path d="M12 5l0 14"></path>
                <path d="M18 13l-6 6"></path>
                <path d="M6 13l6 6"></path>
              </svg>
            </div>
          </div>
          <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
        </div>
        <div className="pt-1 pb-8">
          <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
          {t('homePage.homeDescription.p2')}
            {today == new Date(TARGET_DATE) ? (
              <span className="inline-block w-4 h-4 rounded-full bg-green-500 border-2 border-white relative blink"></span>
            ) : (
              <span className="inline-block w-4 h-4 rounded-full bg-red-500 border-2 border-white relative blink"></span>
            )}
          </p>
          <p className="text-gray-600 dark:text-slate-400">
          {t('homePage.homeDescription.p3')} {TargetDateScheduler.toDateString()} {t('homePage.homeDescription.p31')}
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-800 dark:text-slate-200"
              >
                <path d="M12 5l0 14"></path>
                <path d="M18 13l-6 6"></path>
                <path d="M6 13l6 6"></path>
              </svg>
            </div>
          </div>
          <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
        </div>
        <div className="pt-1 pb-8">
          <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
          {t('homePage.homeDescription.p4')}
            {today > new Date(TARGET_DATE) ? (
              <span className="inline-block w-4 h-4 rounded-full bg-green-500 border-2 border-white relative blink"></span>
            ) : (
              <span className="inline-block w-4 h-4 rounded-full bg-red-500 border-2 border-white relative blink"></span>
            )}
          </p>
          <p className="text-gray-600 dark:text-slate-400">
          {t('homePage.homeDescription.p5')}
          </p>
          <div
            className="flex items-center mt-3 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">{t('homePage.homeDescription.span4')}</span>
            <div>
            {t('homePage.homeDescription.div')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white dark:text-slate-200"
              >
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="pt-1 ">
          <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
          {t('homePage.homeDescription.felicidades')}
          </p>
        </div>
      </div>
      <div className="max-w-screen mx-auto p-8  rounded-lg  text-gray-800 dark:text-gray-200">
        <h2 className="text-xl font-bold mb-4">
          <i className="fa-solid fa-circle-info mr-1"></i> {t('homePage.homeDescription.i')}
        </h2>
        <p className="mb-4">
        {t('homePage.homeDescription.info')}
        </p>
      </div>
    </div>
  );
};

export default HomeDescription;
