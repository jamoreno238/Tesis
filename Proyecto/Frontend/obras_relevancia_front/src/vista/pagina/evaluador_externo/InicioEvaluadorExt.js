import * as React from "react";
import Plantilla from "../../componentes/menu/PlantillaEvaExt.js";
import logoEspe from "../../../img/logoEspe.png";
import "../../../css/inicioDocente.css";
import Cookies from "js-cookie";


const InicioEvaluadorExt = () => {
  const title = "BIENVENIDO EVALUADOR EXTERNO";

  React.useEffect(() => {
    const tokenExpirationTime = 60 * 60 * 1000;
    const sessionWarningTime = 55 * 60 * 1000;
    const tokenTimer = setTimeout(() => {
      // Verifica si la cookie "token" ha dejado de existir
      if (!Cookies.get("token")) {
        // Si la cookie "token" no existe, redirige a /Admin
        console.log(
          "Cookie 'token' ha dejado de existir, redirigiendo a /Admin"
        );
        window.location.href = "/";
      }
    }, tokenExpirationTime);

    const sessionWarningTimer = setTimeout(() => {
      // Muestra un alert al usuario a los 55 minutos para advertirle que la sesión se cerrará en 5 minutos
      alert(
        "Su sesión se cerrará automáticamente en 5 minutos. Guarde su trabajo."
      );
    }, sessionWarningTime);

    return () => {
      clearTimeout(tokenTimer); // Limpia el temporizador de token al desmontar el componente
      clearTimeout(sessionWarningTimer);
    }; // Limpia el temporizador al desmontar el componente
  }, []);
  return (
    <Plantilla title={title}>
      <img src={logoEspe} className="imgInicio" alt="Imagen Docente" />
    </Plantilla>
  );
};

export default InicioEvaluadorExt;
