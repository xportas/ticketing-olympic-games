import React from 'react';
import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';
import Footer from '../components/Footer/Footer';
import { IonContent } from '@ionic/react';

const ProfilePage: React.FC = () => {
    return (
        <IonContent>
            <Header />
            <Profile />
            <Footer />
        </IonContent>
    );
};

export default ProfilePage;