import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import * as env from './env';
import '../src/i18n/i18n';
import { CartProvider } from './components/Cart/CartProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
console.log = () => {}
console.error = () => {}
console.debug = () => {}
root.render(
  <Auth0Provider
    domain={env.AUTH0_DOMAIN}
    clientId={env.AUTH0_CLIENT_ID}
    useRefreshTokens={true}
    useRefreshTokensFallback={false}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation='localstorage'

  >
    <React.StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </React.StrictMode>
  </Auth0Provider>
);
