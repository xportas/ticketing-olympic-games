import React from 'react';
import { Sport } from '../../models/Sport';


interface SportCardProps {
    sport: Sport;
    onSelect: () => void;
}

const SportCard: React.FC<SportCardProps> = ({ sport, onSelect }) => {
    const formattedDate = sport.date ? new Date(sport.date).toLocaleDateString() : 'N/A';
    return (
        <div onClick={onSelect} className="flex mb-3 flex-col p-4 bg-neutral-50 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 w-full cursor-pointer hover:shadow-lg transition duration-300 ease-in-out active:scale-95 select-none">
            <h2 className="text-xl font-bold mb-2">{sport.name}</h2>
            <p className="text-gray-700 mb-2 truncate">{sport.description}</p>
            <p className="text-gray-700 mb-2 truncate">{formattedDate}</p>
            <div className="flex items-center mb-2">
                <span className="text-gray-600"><i className="fa-solid fa-location-dot"></i> </span>
                <span className="ml-1">{sport.stadium?.name || 'N/A'}</span>
            </div>
        </div>
    );
};

export default SportCard;
