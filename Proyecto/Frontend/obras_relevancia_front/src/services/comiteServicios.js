import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL;
const token = Cookies.get("token");

export async function getUsuarioWithRol() {
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
      `${apiUrl}/api/comiteAsignarPerfil/`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getSolicitudesTabla() {
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
      `${apiUrl}/api/comiteSolicitudes/`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getSolicitudesTablaModal(id) {
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
      `${apiUrl}/api/comiteSolicitudesModal/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getEvaluacionesComite(id) {
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
      `${apiUrl}/api/comiteEvaluaciones/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getEvaluadoresComite() {
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
      `${apiUrl}/api/comiteEvaluadores/`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function asignarEvaluadorSolicitud(datos) {
  console.log("Datos a enviar:", JSON.stringify(datos, null, 2));
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
      `${apiUrl}/api/comiteAsignarEvaluadorObra`,
      datos,
      config
    );

    return response;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function obtenerEvaluadores() {
  console.log("token eva: " + token);
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
      `${apiUrl}/api/comiteObtenerEvaluadores/`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateRol(datos) {
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
      },
    };
    const response = await axios.put(`${apiUrl}/api/comiteEditarRol/`, datos, config);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteEvaluadorEvaluaciones(id) {
  try {
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado "Authorization"
      },
    };
    const response = await axios.post(`${apiUrl}/api/comiteBorrarEva/${id}`,id, config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerUsuarios() {
 
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
      `${apiUrl}/api/comiteObtenerUsuarios/`,
      config
    );
    //console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

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
      `${apiUrl}/api/comiteCambiarContrasena/`,
      datos,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
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
      `${apiUrl}/api/comiteObtenerUsuariosFiltrado/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerLogSolicitudes(id) {
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
      `${apiUrl}/api/comiteObtenerLogSolicitudes/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function calificarInicial(id, datos) {
 // console.log("Datos a enviar:", JSON.stringify(datos, null, 2));
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
      `${apiUrl}/api/comiteCalificarSolInicial/${id}`,
      datos,
      config
    );

    return response;
  } catch (error) {
    console.log(error);

    throw error;
  }
}