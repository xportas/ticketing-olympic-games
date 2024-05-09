import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CalendarComponent from '../components/Events/Calendar';
import { IonContent } from '@ionic/react';
import { useTranslation } from "react-i18next";

const CalendarPage: React.FC = () => {
    const { t, i18n } = useTranslation(['str']);

    return (
        <IonContent>
            <Header />
            <div className="relative flex flex-col max-w-screen-xl px-4 mx-auto sm:px-6 p-8">
                <div className="flex">
                    <div className="text-left">
                        <h2
                            className="text-2xl font-medium leading-10 tracking-tight text-gray-800 sm:text-5xl sm:leading-none md:text-6xl">
                            {t('calendarPage.title')}
                        </h2>
                        <p
                            className="max-w-md mx-auto font-medium mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            {t('calendarPage.subtitle')}
                        </p>

                    </div>
                </div>
                <div className="flex">
                    <div className="relative w-full rounded">
                        <CalendarComponent />
                    </div>
                </div>
            </div>

            <Footer />
        </IonContent>
    );
};

export default CalendarPage;