import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import { ThemeContext } from '@emotion/react';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import { useTranslation } from 'react-i18next';
import './index.css';
import BoughtTicketsPage from './pages/BoughtTicketsPage';
import CalendarPage from './pages/CalendarPage';
import CartPage from './pages/CartPage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import LogPage from './pages/LogPage';
import ProfilePage from './pages/ProfilePage';
import './theme/variables.css';
import { createContext, useState } from 'react';

setupIonicReact();

export const LanguageContext = createContext({
  selectedLanguage: 'es',
  setSelectedLanguage: (language: string) => { },
});

const App: React.FC = () => {
  const { t, i18n } = useTranslation(['str']);
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  return (

    <IonApp>
      <ThemeContext.Provider value={{ t, i18n }}>
        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
          <IonReactRouter >
            <IonRouterOutlet>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/events" component={EventsPage} />
              <Route exact path="/tickets" component={BoughtTicketsPage} />
              <Route exact path="/login" component={LogPage} />
              <Route exact path="/cart" component={CartPage} />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
          </IonReactRouter>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </IonApp>
  )
};

export default App;