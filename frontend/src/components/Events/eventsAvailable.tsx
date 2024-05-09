import * as auth0 from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { SYMFONY_API_URL, TARGET_DATE } from "../../env";
import { Slot } from "../../models/Slot";
import { Sport } from "../../models/Sport";
import SportCard from "./sportCard";
import TicketCard from "./ticketCard";
import { useTranslation } from "react-i18next";


const Loader = () => (
    <div
        role="status"
        className="m-4 p-4 items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 justify-center flex "
    >
        <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
);

interface EventsAvailableProps {
    selectedSlot: Slot | null;
}

const EventsAvailable: React.FC<EventsAvailableProps> = ({ selectedSlot }) => {
    const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation(['str']);


    const {
        loginWithRedirect,
        isAuthenticated,
        user,
        loginWithPopup,
        getAccessTokenSilently,
    } = auth0.useAuth0();

    const [sports, setSports] = useState([]);

    let slotId: number | null | undefined = selectedSlot?.id;
    let token: any = {};
    const fetchData = async () => {
        let options = {
            audience: 'http://localhost/8100',
            scope: 'read:records',
            responseType: 'token',
            algorithm: 'HS256',
            detailedResponse: true 
        }
        token = await getAccessTokenSilently(options);
        token = token.id_token;
        console.log(token);
    }
    fetchData();

    useEffect(() => {
        if (!selectedSlot || !isAuthenticated) return;

        const fetchSports = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${SYMFONY_API_URL}/slot/${selectedSlot.id}/sports`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSports(data.sports);
            } catch (error) {
                console.error("Error fetching sports:", error);
                toast.error(t('eventsAvailable.toastError'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchSports();
    }, [isAuthenticated, getAccessTokenSilently, slotId]);
    useEffect(() => {
        if (selectedSport) {
            setIsLoading(true);
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 400);

            // Limpia el timeout cuando el componente se desmonta o cuando se selecciona otro deporte
            return () => clearTimeout(timeout);
        } else {
            setIsLoading(true);
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 200);

            // Limpia el timeout cuando el componente se desmonta o cuando se selecciona otro deporte
            return () => clearTimeout(timeout);
        }
    }, [selectedSport]);

    const handleSportSelect = (sport: Sport) => {
        setIsLoading(true);
        setSelectedSport(sport);
    };

    const previousPage = () => {
        setSelectedSport(null);
    };

    if (!isAuthenticated) {
        return (
            <div className="">

            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-screen px-2 text-center select-none">
                <div className="h-screen flex flex-col justify-center items-center">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">{t('userNav.loading')}</span>
                    </div>
                </div>
            </div>
        );
    }

    if(TARGET_DATE > new Date()){
        return (
            <div>
            </div>
        );
    }


    return selectedSlot ? (
        <div className="m-4 p-4 items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 ">
            <div className="flex justify-between items-center p-2">
                <div className="font-heading dark:text-gray-100 mb-4 text-xl font-bold lg:text-4xl">
                    <nav className="flex select-none" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <p className="inline-flex items-center text-sm font-medium text-gray-700  dark:text-gray-400 dark:hover:text-white">
                                    {selectedSlot
                                        ? selectedSlot.dateStart
                                            ? new Date(selectedSlot.dateStart).toLocaleDateString()
                                            : "Eventos disponibles"
                                        : "No slot selected"}
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg
                                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <p className="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                        {selectedSport?.name || "Deportes"}
                                    </p>
                                </div>
                            </li>
                            {selectedSport && !isLoading && (
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                            {t('userNav.tickets')}
                                        </span>
                                    </div>
                                </li>
                            )}
                        </ol>
                    </nav>
                </div>
                {selectedSport && (
                    <div className="inline-flex border rounded-lg">
                        <button
                            onClick={previousPage}
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </div>
                )}
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
                {isLoading && <Loader />} {/* Muestra el loader si isLoading es true */}
                {!selectedSport && !isLoading && (
                    <>
                        <h2 className="text-xl font-bold mb-2 select-none">
                            {t('eventsAvailable.selectSport')}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sports.length > 0 ? (
                                sports.map((sport, index) => (
                                    <SportCard
                                        key={index}
                                        sport={sport}
                                        onSelect={() => handleSportSelect(sport)}
                                    />
                                ))
                            ) : (
                                <Loader />
                            )}
                        </div>
                    </>
                )}

                {selectedSport && !isLoading && (
                    <div className="">
                        <h2 className="text-6xl font-bold mb-2 p-2">
                            {selectedSport.name}
                        </h2>
                        <div className="p-2">
                            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                <i className="fas fa-map-marker-alt"></i>
                                <p className="text-sm">{selectedSport.stadium?.name},</p>
                                <p className="text-sm">{selectedSport.stadium?.location}</p>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                <i className="fas fa-user"></i>
                                <p className="text-sm">{selectedSport.stadium?.capacity}</p>
                            </div>
                        </div>

                        <p className="text-base text-gray-800 dark:text-gray-300 leading-relaxed p-2">
                            {selectedSport?.description}
                        </p>

                        {selectedSport?.stadium?.zones.map((zone, index) => (
                            <TicketCard key={index} zone={zone} sport={selectedSport} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="m-4 p-4 max-w-screen-xl h-52 px-4 mx-auto  sm:px-6 justify-center flex flex-col items-center">
            <h1 className="text-3xl font-medium mb-4">
                {t('eventsAvailable.selectWeek')}
            </h1>
            <Loader />
        </div>
    );
};

export default EventsAvailable;
