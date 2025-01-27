import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL;
const token = Cookies.get("token");

export async function registrarse(datos) {
  try {
    //   if (!token) {
    //     throw new Error("No se encontró el token de autenticación");
    //   }

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
    //     },
    //   };
    const response = await axios.post(
      `${apiUrl}/api/registrarse`,
      datos
      // config
    );
    return response;
  } catch (error) {
    console.log(error);
    // También puedes propagar el error para que pueda ser manejado en el componente que use esta función
    throw error;
  }
}

export async function recuperarContrasena(datos) {
  try {
    //   if (!token) {
    //     throw new Error("No se encontró el token de autenticación");
    //   }

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
    //     },
    //   };
    const response = await axios.post(
      `${apiUrl}/api/recuperarContrasena`,
      datos
      // config
    );
    return response;
  } catch (error) {
    console.log(error);
    // También puedes propagar el error para que pueda ser manejado en el componente que use esta función
    throw error;
  }
}
