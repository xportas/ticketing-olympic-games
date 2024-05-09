import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cart from '../components/Cart/Cart';
import { IonContent } from '@ionic/react';
import { Toaster } from 'sonner';

const CartPage: React.FC = () => {
    return (
        <IonContent>
            <Header />
            <Cart />
            <Footer />
            <Toaster position="bottom-right" richColors />
        </IonContent>
    );
};

export default CartPage;