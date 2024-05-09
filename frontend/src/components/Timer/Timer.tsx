import React, { useState, useEffect } from "react";
import "./Timer.css";
import { TARGET_DATE } from '../../env';
import { useTranslation } from "react-i18next";

// const TargetDate = new Date("2024-03-31T00:00:00");

const TargetDate = new Date(TARGET_DATE);


const CountdownTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [isFinished, setIsFinished] = useState(false);
  
  const { t, i18n } = useTranslation(['str']);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining();
      setTimeRemaining(newTimeRemaining);
      if (
        newTimeRemaining.days === 0 &&
        newTimeRemaining.hours === 0 &&
        newTimeRemaining.minutes === 0 &&
        newTimeRemaining.seconds === 0
      ) {
        setIsFinished(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    const currentTime = new Date();
    const difference = TargetDate.getTime() - currentTime.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="flex items-center justify-center m-4">
      <div
        className={`text-center ${isFinished ? "slide-out-blurred-top" : ""}`}
      >
        <h1 className="text-3xl font-bold">{t('homePage.timer.title')}</h1>
        <p className="text-sm text-gray-500 mb-4">{TargetDate.toLocaleString()}</p>
        <div className="flex justify-center">
          <div className="mx-4">
            <div className="text-4xl font-bold">
              {timeRemaining.days.toString().padStart(2, "0")}
            </div>
            <div className="text-sm">{t('homePage.timer.days')}</div>
          </div>
          <div className="text-4xl font-bold">:</div>
          <div className="mx-4">
            <div className="text-4xl font-bold">
              {timeRemaining.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-sm">{t('homePage.timer.hours')}</div>
          </div>
          <div className="text-4xl font-bold">:</div>
          <div className="mx-4">
            <div className="text-4xl font-bold">
              {timeRemaining.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-sm">{t('homePage.timer.mins')}</div>
          </div>
          <div className="text-4xl font-bold">:</div>
          <div className="mx-4">
            <div className="text-4xl font-bold">
              {timeRemaining.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-sm">{t('homePage.timer.segs')}</div>
          </div>
        </div>
      </div>
      {isFinished && (
        <div className="overlay">
          <div className="flex justify-center items-center">
            <div className="m-3 rounded-lg p-8 text-center">
              <div className="text-3xl text-red-600 font-bold m-4">🎉</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('homePage.timer.finishedLottery')}
              </h1>
              <p className="text-gray-600">
              {t('homePage.timer.thanks')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
