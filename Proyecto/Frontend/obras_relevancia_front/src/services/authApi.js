import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (usuario, contrasena) => {
  try {
    const response = await axios.post(apiUrl + "/api/login", {
      usu_usuario: usuario,
      usu_contrasena: contrasena,
    });

    const tokenObject = response.data;

// Asegúrate de que "token" exista en el objeto antes de intentar decodificarlo
if (tokenObject && tokenObject.token) {
  const token = tokenObject.token;

  // Almacena el token en la cookie
  Cookies.set("token", token, { expires: 1 / 24 });

  // Decodifica el token
  const decodedToken = decodeToken(token);
  const userType = decodedToken.userType;
  const userID = decodedToken.idUsuario;
  return { userType , userID };
} else {
  console.error("El objeto de token no tiene la propiedad 'token'");
  return false;
}
  } catch (error) {
    console.error("Hubo un error durante el inicio de sesión:", error);
    return false;
  }
};


export const getUsuarios = async () => {
  try {
    const response = await axios.get(apiUrl + "/api/usuarios");

    // return console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
