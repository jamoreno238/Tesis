import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const apiUrl = process.env.REACT_APP_API_URL;

export async function actualizarContrasena(datos) {
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${apiUrl}/api/docenteCambiarContrasena/`,
      datos,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getEvaluacionesDocente(id) {
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
      },
    };
    const response = await axios.get(
      `${apiUrl}/api/docenteEvaluaciones/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getLinkEvaluaciones(id) {
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
      },
    };
    const response = await axios.get(
      `${apiUrl}/api/obtenerLinkEvaluacionesDocente/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function crearSolicitudes(datos) {
  console.log("DAtos de servicio: " + JSON.stringify(datos));
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
      },
    };
    const response = await axios.post(
      `${apiUrl}/api/crearSolicitudes/`,
      datos,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    // También puedes propagar el error para que pueda ser manejado en el componente que use esta función
    throw error;
  }
}

export async function obtenerSolicitudesDocID(idDoc) {
  console.log("Datos de servicio: " + JSON.stringify(idDoc));
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
      },
    };
    const response = await axios.get(
      `${apiUrl}/api/obtenerSolicitudesDocID/${idDoc}`,

      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerSolicitudesUsuID(idUsuario) {
  console.log("ID de usuario: ", idUsuario);
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
      },
    };
    const response = await axios.get(
      `${apiUrl}/api/obtenerSolicitudesUsuID/${idUsuario}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
