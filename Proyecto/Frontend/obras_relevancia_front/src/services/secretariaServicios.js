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
      `${apiUrl}/api/secretariaAsignarPerfil/`,
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
      `${apiUrl}/api/secretariaSolicitudes/`,
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
      `${apiUrl}/api/secretariaSolicitudesModal/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getEvaluacionesSecretaria(id) {
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
      `${apiUrl}/api/secretariaEvaluaciones/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getEvaluadoresSecretaria() {
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
      `${apiUrl}/api/evaluadoresSecretaria/`,
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
      `${apiUrl}/api/asignarEvaluadorObra`,
      datos,
      config
    );

    return response;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function registrarEvaluadorInterno(datos) {
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
      `${apiUrl}/api/registrarEvaluadorInterno`,
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

export async function registrarEvaluadorExterno(datos) {
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
      `${apiUrl}/api/registrarEvaluadorExterno`,
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
      `${apiUrl}/api/obtenerEvaluadores/`,
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
    const response = await axios.put(`${apiUrl}/api/editarRol/`, datos, config);
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
    const response = await axios.post(`${apiUrl}/api/borrarEva/${id}`,id, config);
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
      `${apiUrl}/api/obtenerUsuarios/`,
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
      `${apiUrl}/api/secretariaCambiarContrasena/`,
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
      `${apiUrl}/api/obtenerUsuariosFiltrado/${id}`,
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
      `${apiUrl}/api/obtenerLogSolicitudes/${id}`,
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
      `${apiUrl}/api/calificarSolInicial/${id}`,
      datos,
      config
    );

    return response;
  } catch (error) {
    console.log(error);

    throw error;
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
      `${apiUrl}/api/obtenerLinkEvaluaciones/${id}`,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}