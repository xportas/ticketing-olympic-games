import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Calendar } from 'rsuite';
import { Toaster, toast } from 'sonner';
import { SYMFONY_API_URL } from '../../env';
import { Sport } from '../../models/Sport';
import './index.less';

function getSportEvents(data: Sport[]): { date: Date; event: string }[] {
    return data.filter(sport => sport.date).map(sport => ({
        date: new Date(sport.date!),
        event: sport.name || 'Unknown event'
    }));
}

function getEventName(date: Date, sportsEvents: { date: Date; event: string }[]): string {
    const event = sportsEvents.find(event => date.toDateString() === event.date.toDateString());
    return event ? event.event : "";
}

const CalendarComponent: React.FC = () => {
    const today = new Date();
    const [sportsEvents, setSportsEvents] = useState<{ date: Date; event: string }[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SYMFONY_API_URL}/sports`);
                if (!response.ok) {
                    throw new Error(t('calendarPage.noEvents'));
                }
                const json = await response.json();
                const sports: Sport[] = json.sports.map((item: any) => ({
                    ...item,
                    date: item.date ? new Date(item.date) : null
                }));
                setSportsEvents(getSportEvents(sports));
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        fetchData();
    }, [t]);

    function renderCell(date: Date) {
        const eventName = getEventName(date, sportsEvents);
        if (eventName) {
            return (
                <div className="flex items-center flex-col justify-center md:p-2">
                    {today > date ? (
                        <span className="inline-block w-3 h-3 rounded-full bg-red-500 border-2 border-white relative"></span>
                    ) : (
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 border-2 border-white relative"></span>
                    )}
                    <p className={`font-medium text-xs ml-2 ${today > date ? 'text-gray-500 line-through' : ''}`}>
                        {eventName}
                    </p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className='flex justify-center items-center'>
            <Toaster position="bottom-right" richColors />
            <div className='w-full'>
                <Calendar bordered renderCell={renderCell} />
            </div>
        </div>
    );
};

export default CalendarComponent;
