import React, { useState, useEffect } from 'react';
import { Ticket } from '../../models/Ticket';
import * as context from './CartProvider';
import { useTranslation } from "react-i18next";


interface ProductCardProps {
    ticket: Ticket;
    updateTotal: (id: number, totalPrice: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ ticket, updateTotal }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(ticket.price || 0);
    const [duplicateQuantity, setDuplicateQuantity] = useState<number>(0);
    const { t, i18n } = useTranslation(['str']);
    const { addTicket, removeTicket, duplicateTickets, uniqueTickets, tickets } = context.useCart();

    useEffect(() => {
        const calculateTotalPrice = () => {
            const newTotalPrice = ticket.price ? ticket.price * (quantity + duplicateQuantity) : 0;
            setTotalPrice(newTotalPrice);
            if (ticket.id !== null && ticket.id !== undefined) {
                updateTotal(ticket.id, newTotalPrice);
            }
        };
        calculateTotalPrice();
    }, [ticket.price, quantity, duplicateQuantity, ticket.id, updateTotal]);

    useEffect(() => {
        const newDuplicateQuantity = duplicateTickets.filter((t) => t.type === ticket.type).length;
        setQuantity(uniqueTickets.filter((t) => t.type === ticket.type).length);
        setDuplicateQuantity(newDuplicateQuantity);
    }, [duplicateTickets, ticket.id]);

    const decrement = () => {
        if (duplicateTickets.filter((t) => t.type === ticket.type).length >= 1) {
            console.log("decrementing duplicate");
            setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
            console.log("decrementing duplicate: " + quantity);
            removeTicket(ticket);
        }
    };

    const increment = () => {
        console.log("Attempting to increment...");
        const initialLength = tickets.length;
        addTicket(ticket);
        setTimeout(() => {
            if (tickets.length > initialLength) {
                console.log("Increment successful, updating quantity.");
                setQuantity(prevQuantity => prevQuantity + 1);
            } else {
                console.log("Increment failed, ticket not added.");
            }
        }, 100);
    };

    const formattedDate = ticket?.sport?.date ? new Date(ticket?.sport?.date).toLocaleDateString() : 'N/A';

    return (
        <div className="flex mb-3 flex-col p-2 dark:bg-gray-800 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 w-full select-none">
            <div className="px-4 py-2">
                <div className="flex justify-between font-medium">
                    <h3 className="text-3xl font-bold text-gray-800">{ticket.sport?.name}</h3>
                    <p className="text-4xl text-gray-700">
                        {ticket.price}
                        <span className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">€</span>
                        <span className="text-base text-gray-600 flex">{t('productCard.total')}{totalPrice}€</span>
                    </p>

                </div>

            </div>
            <div className="px-4 py-2">
                <p className="text-base text-gray-700">{t('productCard.zone')}{ticket.zone?.name}</p>
                <p className="text-base text-gray-700">{t('productCard.date')}{formattedDate}</p>
                <p className="text-base text-gray-700">{t('productCard.numTicketsAvailable')}{ticket.zone?.availableSitsCount}</p>
            </div>
            <div>
                <div className="flex justify-end space-x-4">
                    <form className="max-w-xs m-3 flex">
                        <div className="relative flex items-center">
                            <button onClick={decrement} type="button" className="flex-shrink-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none font-medium text-xl select-none">
                                <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent focus:outline-none focus:ring-0 max-w-[2.5rem] text-center font-medium text-xl select-none" value={quantity + duplicateQuantity} readOnly required />
                            <button onClick={increment} type="button" className="flex-shrink-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
