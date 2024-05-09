import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BoughtTicket from '../components/BoughtTickets/BoughtTicket';
import { IonContent } from '@ionic/react';

const BoughtTicketsPage: React.FC = () => {
    return (
        <IonContent>
            <Header />
            <div className='h-auto'>

                <BoughtTicket />
            </div>

            <Footer />
        </IonContent>
    );
};

export default BoughtTicketsPage;