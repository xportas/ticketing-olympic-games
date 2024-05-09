import React, { useState, useEffect } from "react";
import { Zone } from "../../models/Zone";
import { useCart } from "../Cart/CartProvider";
import { toast } from "sonner";
import { Ticket } from "../../models/Ticket";
import { Sport } from "../../models/Sport";
import { useTranslation } from "react-i18next";
import { Sit } from "../../models/Sit";

interface ZoneCardProps {
    zone: Zone;
    sport: Sport | null;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, sport }) => {
    const { addTicket, undoAddTicket, tickets } = useCart();
    const [ticketFromZone, setTicketFromZone] = useState<Ticket | null>(null);
    const { t, i18n } = useTranslation(['str']);

    useEffect(() => {
        const newTicketFromZone = new Ticket({
            type: sport?.name + " " + zone.name,
            price: (sport?.price || 0) * (zone.price_multiplier || 1),
            date: new Date(),
            sit: new Sit(),
            sport: sport,
            zone: zone
        });
        setTicketFromZone(newTicketFromZone);
    }, [zone, sport]);

    const handleZoneSelect = () => {
        if (ticketFromZone) {
            addTicket(ticketFromZone);
        }
    };

    const formattedDate = ticketFromZone?.date ? new Date(ticketFromZone.date).toLocaleDateString() : 'N/A';

    return (
        <div className="flex mb-3 flex-col p-4 bg-neutral-50 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 w-full cursor-pointer hover:shadow-md select-none">
            <div className="px-4 py-2">
                <div className="flex justify-between">
                    <h3 className="text-3xl font-semibold text-gray-800">{zone.name}</h3>
                    <p className="text-4xl text-gray-700">
                        {(sport?.price || 0) * (zone.price_multiplier || 1)}
                        <span className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">€</span>
                    </p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{formattedDate}</p>
            </div>
            <div className="px-4 py-2">
                <p className="text-base text-gray-700">{t('ticketCard.description')} {zone.description}</p>
                <p className="text-base text-gray-700">{t('ticketCard.seatsNum')}{zone.availableSitsCount}</p>
            </div>
            <div>
                <div className="flex justify-end space-x-4">
                <button
                    onClick={zone && zone!.availableSitsCount! > 0 ? handleZoneSelect : undefined}
                    className={`inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base ${zone && zone!.availableSitsCount! > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
                    aria-haspopup="true"
                    aria-expanded="false"
                    type="button"
                    disabled={!zone || zone!.availableSitsCount! <= 0}
                >
                   
                        <span className="font-medium"><i className="fa-solid fa-cart-plus mr-2"></i>{t('ticketCard.addCart')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default ZoneCard;
