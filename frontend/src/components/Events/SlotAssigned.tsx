import React, { useEffect, useState } from "react";
import * as auth0 from "@auth0/auth0-react";
import { User } from "../../models/User";
import { Slot } from "../../models/Slot";
import { SYMFONY_API_URL, TARGET_DATE } from "../../env";
import * as example from "../../models/EXAMPLES";
import { useTranslation } from "react-i18next";

interface SlotAssignedProps {
    updateSlot: (slot: Slot) => void;
}

const SlotAssigned: React.FC<SlotAssignedProps> = ({ updateSlot }) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const { isAuthenticated, isLoading, user, loginWithPopup, getAccessTokenSilently } = auth0.useAuth0();
    const today = new Date();
    const { t, i18n } = useTranslation(['str']);

    const selectSlot = (slot: Slot) => {
        const startDate = new Date(slot.dateStart!);
        const endDate = new Date(slot.dateEnd!);
        if (today >= startDate && today <= endDate) {
            setSelectedSlot(slot);
            updateSlot(slot);
        }
    };

    async function getUserIdWithRetry(): Promise<string> {
        let userId: string | undefined;
        while (!userId || userId === undefined) {
            await new Promise((resolve) => setTimeout(resolve, 0));
            if (user && user.sub) {
                userId = user.sub.split("|")[1];
            }
        }
        return userId!;
    }

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

    const getUserInfoByAuth0Id = async (userId: string) => {
        try {
            const apiUrl = `${SYMFONY_API_URL}/user/auth0/${userId}`;
            const response = await fetch(apiUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserInfo(data.data);
            data.data.slots?.forEach(selectSlot);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchData = async () => {
            const userId = await getUserIdWithRetry();
            if (userId) {
                getUserInfoByAuth0Id(userId);
            }
        };
        fetchData();
    }, [user?.sub, isAuthenticated]);  // Depend on user.sub and isAuthenticated

    if (!isAuthenticated) {
        return (
            <div className="h-screen px-2 text-center select-none">
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-8xl font-extrabold text-red-500">401</h1>
                    <p className="text-4xl font-medium text-gray-800">
                        {t('eventsPage.slotAssigned.mustLogIn')}
                    </p>
                    <p className="text-xl text-gray-800 mt-4">
                        {t('eventsPage.slotAssigned.apologize')}
                    </p>
                    <div className="p-4">
                        {/* <LoginButton /> */}
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => loginWithPopup()}
                                className="inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base"
                                aria-haspopup="true"
                                aria-expanded="false"
                                type="button"
                            >
                                <span className="">{t('eventsPage.slotAssigned.login')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (TARGET_DATE > new Date()) {
        return (
            <div className="h-screen px-2 text-center select-none">
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-extrabold text-red-500 mb-1">No hay eventos disponibles</h1>
                    <p className="text-3xl font-medium text-gray-800">
                        Los eventos se desbloquearán el {TARGET_DATE.toLocaleDateString()}
                    </p>
                    <p className="text-xl text-gray-800 mt-4">

                    </p>
                </div>

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
                        <span className="sr-only">{t('eventsPage.slotAssigned.loading')}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative m-4 p-4 items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6">
            <h2 className="font-heading dark:text-gray-100 mb-4 text-3xl font-bold lg:text-4xl">
                {t('eventsPage.slotAssigned.shoppingWeeks')}
            </h2>

            {userInfo && userInfo.slots && userInfo.slots.length <= 0 && (
                <div
                    className="p-4 mb-4 text-base font-medium text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 border"
                    role="alert"
                >
                    {t('eventsPage.slotAssigned.noSlots')}
                </div>
            )}

            {userInfo && userInfo.slots && userInfo.slots.length > 0 && (
                <div className="">
                    <p className="text-gray-600 dark:text-slate-400">
                        {t('eventsPage.slotAssigned.bienvenido')}{`${user?.name}`}{t('eventsPage.slotAssigned.yesSlots')}
                    </p>

                    <p className="text-gray-600 dark:text-slate-400 mb-1">
                        {t('eventsPage.slotAssigned.dispones')}{userInfo?.slots?.length}{t('eventsPage.slotAssigned.infoSlots')}
                    </p>
                    <div
                        className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 items-center justify-center align-middle border"
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
                        <span className="font-medium"></span>{t('eventsPage.slotAssigned.maxTickets')}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        {t('eventsPage.slotAssigned.assignedWeeks')}
                    </h3>



                    <div className="md:flex md:flex-row md:space-x-2">
                        {userInfo?.slots?.map((slot: Slot) => (
                            console.log(slot),

                            <div

                                key={slot.id}
                                className={`flex mb-3 flex-col p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 border-2 ${today >= new Date(slot!.dateStart!) && today <= new Date(slot!.dateEnd!) ? "block cursor-pointer" : "bg-gray-300 cursor-not-allowed opacity-50 "} border-gray-200 dark:border-gray-700 w-full  hover:shadow-md transition duration-300 ease-in-out active:scale-95 select-none`}
                            >

                                <div
                                    className="flex items-center justify-between"
                                >
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        {t('eventsPage.slotAssigned.week')} {slot.id}{" "}
                                        {today >= new Date(slot!.dateStart!) && today <= new Date(slot!.dateEnd!) ? (
                                            <span className="inline-block w-3 h-3 rounded-full bg-green-500 border-2 border-white relative blink"></span>
                                        ) : (
                                            <span className="inline-block w-3 h-3 rounded-full bg-red-500 border-2 border-white relative blink"></span>
                                        )}
                                    </h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-300">
                                        {slot.dateStart ? new Date(slot.dateStart).toLocaleDateString() : ""} -
                                        {slot.dateEnd ? " " + new Date(slot.dateEnd).toLocaleDateString() : ""}
                                    </span>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SlotAssigned;