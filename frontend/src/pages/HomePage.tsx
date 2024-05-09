import { Toaster } from 'sonner';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Herov2 from '../components/HeroV2/Herov2';
import Timer from '../components/Timer/Timer';
import HomeAccordion from '../components/HomeAccordion/HomeAccordion';
import HomeDescription from '../components/HomeDescription/HomeDescription';
import "../index.css";
import { IonContent } from '@ionic/react';

const HomePage: React.FC = () => {
  return (
    <IonContent>
      <Header />
      <Herov2 />
      
      <Timer />
      <br className='mt-8'></br>
      <HomeDescription />
      <HomeAccordion />
      <Toaster position="bottom-right" richColors />
      <Footer />
      
    </IonContent>
  );
};

export default HomePage;
