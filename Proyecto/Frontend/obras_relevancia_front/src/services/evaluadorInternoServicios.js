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
      `${apiUrl}/api/evaluadorInternoCambiarContrasena/`,
      datos,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getEvaluacionesEvaluadorInterno(id) {
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
        `${apiUrl}/api/obtenerEvaluacionesEvaInt/${id}`,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getEvaluacionesEvaluadorInternoModal(id) {
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
        `${apiUrl}/api/obtenerDatosEValuacion/${id}`,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export async function obtenerRequisitos(id) {
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
        `${apiUrl}/api/obtenerRequisitos/${id}`,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export async function calificacionEvaInt(id,datos) {
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
        `${apiUrl}/api/calificarEvaInt/${id}`,
        datos,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export async function crearInformeInt(datos) {
    // console.log("DAtos de servicio del informe: " + JSON.stringify(datos));
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
        `${apiUrl}/api/crearInformeInt/`,
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

  export async function getUsuariosFiltrado(id) {
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
        `${apiUrl}/api/obtenerUsuariosFiltradoInt/${id}`,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  export async function guardarReporteInterno(datos) {

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
        `${apiUrl}/api/guardarReporteInterno/`,
        datos.formData,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
      // También puedes propagar el error para que pueda ser manejado en el componente que use esta función
      throw error;
    }
  }
  export async function cambiarEstadoSolEvaInt(id) {
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
        `${apiUrl}/api/cambiarEstadoSolEvaExt/${id}`,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }