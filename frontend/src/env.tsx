// env.tsx
// Variables de entorno para la aplicación.
const originalDateResponse = await fetch('http://localhost:8000/date');
const originalDateData = await originalDateResponse.json();
const originalDate = new Date(originalDateData);
//const originalDate = new Date("2021-07-23T00:00:00.000Z");
export const TARGET_DATE = new Date(originalDate);

// Symfony API URL
export const SYMFONY_API_URL = "http://localhost:8000";

// Auth0
export const AUTH0_DOMAIN = "olympics.eu.auth0.com";
export const AUTH0_CLIENT_ID = "wS7Lked6YAVzCMFzDg6CwqjgCv5oT8jf";
export const AUTH0_REDIRECT_URI = window.location.origin;
export const AUTH0_AUDIENCE = "http://localhost:8100";
export const AUTH0_SCOPE = "read:records";
export const AUTH0_TENANT = "olympics";
export const AUTH0_TOKEN_ISSUER = "olympics.eu.auth0.com/oauth/token";



