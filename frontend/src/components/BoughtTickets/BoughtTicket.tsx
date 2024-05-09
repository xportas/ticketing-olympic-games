import React from 'react';
import * as context from '../Cart/CartProvider';
import QRCode from 'react-qr-code'; // Importa la biblioteca de código QR
import * as auth0 from '@auth0/auth0-react';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import { SYMFONY_API_URL } from '../../env';


interface BoughtTicketProps {

}

const BoughtTicket: React.FC<BoughtTicketProps> = () => {
    const { boughtTickets, tickets } = context.useCart();
    const { t, i18n } = useTranslation(['str']);
    const {
        loginWithRedirect,
        isAuthenticated,
        user,
        loginWithPopup,
        getAccessTokenSilently,
    } = auth0.useAuth0();

    
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
    }
    fetchData();

    const getUserIdWithRetry = async (): Promise<string | undefined> => {
        let userId = user?.sub;
        while (!userId) {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            userId = user?.sub;  
        }
        return userId;
    };

    const getBoughtTickets = async (userId: string) => {
        try {
            const apiUrl = `${SYMFONY_API_URL}/user/${userId}/tickets`;
            const response = await fetch(apiUrl, {
                headers: { Authorization: `Bearer ${token}`},
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            boughtTickets.forEach((ticket) => {
                data.forEach((boughtTicket: any) => {
                    if (ticket.id === boughtTicket.id) {
                        boughtTickets.push(ticket);
                    }
                });
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchData = async () => {
            const userId = await getUserIdWithRetry();
            if (userId) {
                getBoughtTickets(userId);
            }
        };
        fetchData();
    }, [user?.sub, isAuthenticated]); 






    if (!isAuthenticated) {
        return (
            <div className="h-screen px-2 text-center select-none">
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-8xl font-extrabold text-red-500">401</h1>
                    <p className="text-4xl font-medium text-gray-800">
                        {t('boughtTicket.mustLogIn')}
                    </p>
                    <p className="text-xl text-gray-800 mt-4">
                        {t('boughtTicket.apologize')}
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
                                <span className="">{t('loginButton.login')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }




    return (
        <div className="p-2 h-full">
            <h2 className="text-2xl font-semibold pl-6 pt-6 pb-3">
            {t('boughtTicket.buyedTickets')}({boughtTickets.length})
            </h2>
            <div className="flex flex-col items-start pl-6 pb-2">
                <p className="text-gray-500 text-xl">
                {t('boughtTicket.seeTickets')}
                </p>
                <p className='text-gray-500 text-sm'>{t('boughtTicket.qr')}</p>
            </div>
            <hr></hr>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2">
                {boughtTickets.map((ticket, i) => (
                    <div key={ticket.id} className="flex gap-3 bg-white border-2 border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <QRCode fgColor='black' xlinkTitle='RICKROLLEDXDXD' level='H' className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" value={`Ticket ID: ${i + Math.random().toFixed()}`} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold">{ticket.type}</h3>
                            <p className="text-gray-500 truncate">{ticket.date?.toLocaleString()}</p>
                            <p className="text-gray-500 text-xl">{ticket.price}€</p>
                            <div className="flex items-center justify-start text-gray-500">
                                <svg className="w-4 h-4 mr-1 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                                </svg>
                                <a href="/tickets" rel="noopener noreferrer">olympics/tickets/{i + Math.random().toFixed()}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoughtTicket;
