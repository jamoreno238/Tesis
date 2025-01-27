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
      `${apiUrl}/api/evaluadorExternoCambiarContrasena/`,
      datos,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getEvaluacionesEvaluadorExterno(id) {
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
      `${apiUrl}/api/obtenerEvaluacionesEvaExt/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getEvaluacionesEvaluadorExternoModal(id) {
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
      `${apiUrl}/api/obtenerDatosEvaluacionExt/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerRequisitosExt(id) {
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
      `${apiUrl}/api/obtenerRequisitosExt/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function calificacionEvaExt(id, datos) {
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
      `${apiUrl}/api/calificarEvaExt/${id}`,
      datos,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function crearInformeExt(datos) {
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
      `${apiUrl}/api/crearInformeExt/`,
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
      `${apiUrl}/api/obtenerUsuariosFiltradoExt/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function guardarReporteExterno(datos) {

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
      `${apiUrl}/api/guardarReporteExterno/`,
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

export async function cambiarEstadoSolEvaExt(id) {
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