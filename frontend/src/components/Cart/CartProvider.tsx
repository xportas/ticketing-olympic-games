import React, { createContext, useContext, useEffect, useState } from "react";
import { Ticket } from "../../models/Ticket";
import { Toaster, toast } from "sonner";
import { useTranslation } from "react-i18next";

// Crear el contexto
const CartContext = createContext<{
    tickets: Ticket[];
    uniqueTickets: Ticket[];
    duplicateTickets: Ticket[];
    boughtTickets: Ticket[];
    addTicket: (ticket: Ticket) => void;
    removeTicket: (ticket: Ticket) => void;
    delteAllDuplicateTickets: (ticket: Ticket) => void;
    buyTickets: () => void;
    deleteAllTickets: () => void;
    undoAddTicket: () => void;
}>({
    tickets: [],
    uniqueTickets: [],
    duplicateTickets: [],
    boughtTickets: [],
    addTicket: () => { },
    removeTicket: () => { },
    delteAllDuplicateTickets: () => { },
    buyTickets: () => { },
    deleteAllTickets: () => { },
    undoAddTicket: () => { },
});

// Crear el proveedor del contexto
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [uniqueTickets, setUniqueTickets] = useState<Ticket[]>([]);
    const [duplicateTickets, setDuplicateTickets] = useState<Ticket[]>([]);
    const [boughtTickets, setBoughtTickets] = useState<Ticket[]>([]);
    const { t, i18n } = useTranslation(['str']);

    // Función para guardar los tickets en el almacenamiento local
    const saveTicketsToLocalStorage = (tickets: Ticket[]) => {
        localStorage.setItem("tickets", JSON.stringify(tickets));
    };

    const saveBoughtTicketsToLocalStorage = (boughtTickets: Ticket[]) => {
        localStorage.setItem("boughtTickets", JSON.stringify(boughtTickets));
    };

    // Función para cargar los tickets desde el almacenamiento local al inicio
    const loadTicketsFromLocalStorage = () => {
        const savedTickets = localStorage.getItem("tickets");
        if (savedTickets) {
            const parsedTickets: Ticket[] = JSON.parse(savedTickets);
            setTickets(parsedTickets);
            updateTicketArrays(parsedTickets);
        }
    };

    const loadBoughtTicketsFromLocalStorage = () => {
        const savedBoughtTickets = localStorage.getItem("boughtTickets");
        if (savedBoughtTickets) {
            const parsedBoughtTickets: Ticket[] = JSON.parse(savedBoughtTickets);
            setBoughtTickets(parsedBoughtTickets);
        }
    }

    useEffect(() => {
        loadTicketsFromLocalStorage(); // Cargar los tickets almacenados al inicio
        loadBoughtTicketsFromLocalStorage();
    }, []);

    const updateTicketArrays = (newTickets: Ticket[]) => {
        const uniqueTicketsMap = new Map<string, Ticket>();
        const duplicateTickets: Ticket[] = [];

        newTickets.forEach(ticket => {
            if (uniqueTicketsMap.has(ticket.type as string)) {
                duplicateTickets.push(ticket);
            } else {
                uniqueTicketsMap.set(ticket.type as string, { ...ticket, quantity: 1 } as Ticket);
            }
        });

        const uniqueTicketsArray = Array.from(uniqueTicketsMap.values());
        setUniqueTickets(uniqueTicketsArray);
        setDuplicateTickets(duplicateTickets);
    };

    const addTicket = (ticket: Ticket) => {
        setTickets((currentTickets) => {
            const allTickets = [...currentTickets, ...boughtTickets];
            const countsBySport = new Map<number, number>();
    
            allTickets.forEach(t => {
                if (t.sport?.id != null) {
                    countsBySport.set(t.sport.id, (countsBySport.get(t.sport.id) || 0) + 1);
                }
            });
    
            if (ticket.sport?.id != null) {
                const sportId = ticket.sport.id;
                
                const ticketCountForSport = countsBySport.get(sportId) || 0;
    
                if (ticketCountForSport >= 5) {
                    toast.error(t('cartProvider.toast1'));
                    return currentTickets;
                }
    
                if (countsBySport.size >= 3 && !countsBySport.has(sportId)) {
                    toast.error(t('cartProvider.toast2'));
                    return currentTickets;
                }
    
                const newTickets = [...currentTickets, ticket];
                saveTicketsToLocalStorage(newTickets);
                updateTicketArrays(newTickets);
                toast.success(t('cartProvider.toast3'));
                return newTickets;
            } else {
                return currentTickets;
            }
        });
    };
    
    
    
    
    

    const deleteAllTickets = () => {
        setTickets([]);
        saveTicketsToLocalStorage([]);
        updateTicketArrays([]);
    };

    const undoAddTicket = () => {
        const newTickets = [...tickets];
        newTickets.pop();
        setTickets(newTickets);
        saveTicketsToLocalStorage(newTickets);
        updateTicketArrays(newTickets);
    };

    function removeTicket(ticket: Ticket): void {
        const index = tickets.map(t => t.type).lastIndexOf(ticket.type); // Find the last index of the ticket type
        console.log(index);
        if (index !== -1) {
            const updatedTickets = [...tickets]; // Clone the array of tickets
            updatedTickets.splice(index, 1); // Remove the ticket from the cloned array
            setTickets(updatedTickets); // Update the cart state
            saveTicketsToLocalStorage(updatedTickets); // Save the updated tickets
            updateTicketArrays(updatedTickets);
        }
    }
    

    function delteAllDuplicateTickets(ticket: Ticket): void {
        const updatedTickets = tickets.filter(t => t.type !== ticket.type);
        setTickets(updatedTickets);
        saveTicketsToLocalStorage(updatedTickets);
        updateTicketArrays(updatedTickets);
    }

    function buyTickets(): void {
        const allBoughtTickets = [...boughtTickets, ...tickets];
        setBoughtTickets(allBoughtTickets);
        setTickets([]);
        saveTicketsToLocalStorage([]);
        updateTicketArrays([]);
        saveBoughtTicketsToLocalStorage(allBoughtTickets);
    }



    return (
        <CartContext.Provider value={{ tickets, uniqueTickets, duplicateTickets,boughtTickets, addTicket, removeTicket, delteAllDuplicateTickets, buyTickets, deleteAllTickets, undoAddTicket }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useCart = () => useContext(CartContext);
