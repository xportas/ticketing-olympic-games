import React, { useState } from 'react';
import SlotAssigned from '../components/Events/SlotAssigned';
import EventsAvailable from '../components/Events/eventsAvailable'; // Importamos EventsAvailable
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

import { Slot } from '../models/Slot';
import { Toaster } from 'sonner';
import { IonContent } from '@ionic/react';

const EventsPage: React.FC = () => {
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    // Función para actualizar el slot seleccionado
    const updateSlot = (slot: Slot) => {
        setSelectedSlot(slot);
    };

    return (
        <IonContent>
            
            <Header />
            <SlotAssigned updateSlot={updateSlot} />


            {/* Pasamos el slot seleccionado como prop a EventsAvailable */}
            <EventsAvailable selectedSlot={selectedSlot} />
            <Footer />
            <Toaster position="bottom-right" richColors />

        </IonContent>
    );
};

export default EventsPage;
