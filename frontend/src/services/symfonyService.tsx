import { SYMFONY_API_URL } from "../env";
import { Slot } from "../models/Slot";
import { Ticket } from "../models/Ticket";
import { User } from "../models/User";
import * as auth0 from "@auth0/auth0-react";

// Definición de la interfaz de la respuesta de la API
interface ApiResponse {
  id: number;
  email: string;
  roles: string[];
  password: string;
  slots: Slot[];
  tickets: Ticket[];
  picture: string;
  tokenAuth: string;
  name: string;
}

// Función para manejar la respuesta de la API y transformarla a User
const handleResponse = async (response: Response): Promise<User> => {
  if (response.ok) {
    const data: ApiResponse = await response.json();
    const user: User = {
      id: data.id,
      email: data.email,
      roles: data.roles,
      password: data.password,
      slots: data.slots,
      tickets: data.tickets,
      picture: data.picture,
      tokenAuth: data.tokenAuth,
      name: data.name,
    };
    return user;
  } else {
    throw new Error(
      `Error en la solicitud: ${response.status} - ${response.statusText}`
    );
  }
};

// Función para manejar errores
const handleError = (error: Error): never => {
  console.error("Error en la solicitud:", error.message);
  throw error;
};

const {
  loginWithRedirect,
  isAuthenticated,
  user,
  loginWithPopup,
  getAccessTokenSilently,
} = auth0.useAuth0();

// Función para obtener información del usuario por ID
const getUserInfoByAuth0Id = async () => {
  try {
    if(!isAuthenticated){
      loginWithRedirect();
      throw new Error("No se ha iniciado sesión.");
    }
    const token = await getAccessTokenSilently();
    if (!token) {
      loginWithPopup();
      throw new Error("No se pudo obtener el token de acceso.");
    }
    const userId = user?.sub?.split("|")[1];
    if (!userId) {
      loginWithPopup();
      throw new Error("No se pudo obtener el ID de usuario.");
    }
    const apiUrl = `${SYMFONY_API_URL}/user/${userId}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      handleResponse(response);
      return;
    }
    const data = await response.json();
    const userData: User = data;
    return userData;
  } catch (error: any) {
    console.error("Error al obtener el Usuario:", error.message);
    handleError(error);
  }
};

export default getUserInfoByAuth0Id;
