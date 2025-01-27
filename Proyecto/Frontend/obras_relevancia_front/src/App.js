import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./vista/pagina/Login.js";
import InicioSecretaria from "./vista/pagina/secretaria/InicioSecretaria";
import InicioDocente from "./vista/pagina/docente/InicioDocente";
import CambioContraSecretaria from "./vista/pagina/secretaria/CambioContraSecretaria";
import CambioContrasenaDocente from "./vista/pagina/docente/CambioContraDocente.js";
import Solicitudes from "./vista/pagina/docente/Solicitudes.js";
import AsignarPerfilSecretaria from "./vista/pagina/secretaria/AsignarPerfil";
import SolicitudesSecretaria from "./vista/pagina/secretaria/SolicitudesSecretaria";
import EvaluacionSecretaria from "./vista/pagina/secretaria/EvaluacionSecretaria";
import ReporteDocente from "./vista/pagina/docente/ReporteDocente.js";
import LogSolicitudSecretaria from "./vista/componentes/secretaria/ModalLogSolicitud.js";
import CrearEvaluador from "./vista/pagina/secretaria/CrearEvaluador.js";
import Usuarios from "./vista/pagina/secretaria/Usuarios.js";
import UsuariosComite from "./vista/pagina/comite/Usuarios.js";
import InicioEvaIntern from "./vista/pagina/evaluador_interno/InicioEvaluadorInterno.js";
import SolEvaInt from "./vista/pagina/evaluador_interno/MisSolicitudesEvaInt.js";
import EvaluacionesEvaInt from "./vista/pagina/evaluador_interno/EvaluacionesEvaInt.js";
import InicioEvaExterno from "./vista/pagina/evaluador_externo/InicioEvaluadorExt.js";
import SolEvaExt from "./vista/pagina/evaluador_externo/MisSolicitudesEvaExt.js";
import EvaluacionesEvaExt from "./vista/pagina/evaluador_externo/EvaluacionesEvaExt.js";
import CambioContraEvaInt from "./vista/pagina/evaluador_interno/CambioContraEvaInt.js";
import CambioContraEvaExt from "./vista/pagina/evaluador_externo/CambioContraEvaExt.js";
import InicioComite from "./vista/pagina/comite/InicioComite";
import CambioContraComite from "./vista/pagina/comite/CambioContraComite";
import AsignarPerfilComite from "./vista/pagina/comite/AsignarPerfil";
import SolicitudesComite from "./vista/pagina/comite/SolicitudesComite";
import EvaluacionComite from "./vista/pagina/comite/EvaluacionComite";
import LogSolicitudComite from "./vista/componentes/comite/ModalLogSolicitud.js";
import CrearEvaluadorComite from "./vista/pagina/comite/CrearEvaluador.js";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

function App() {
  const token = Cookies.get("token");
  let userType = null;
  if (token) {
    const decodedToken = decodeToken(token);
        userType = decodedToken && decodedToken.userType ? decodedToken.userType : null;
    //console.log(decodedToken.idUsuario);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuariosComite" element={<UsuariosComite />} />
      

        {/*SECRETARIA*/}
        <Route path="/inicioSecretaria" element={ token && userType ==='Secretaria'?(<InicioSecretaria />):(<Navigate to="/"/>)} />
        <Route path="/cambioContraSecretaria" element={ token && userType ==='Secretaria'?(<CambioContraSecretaria />):(<Navigate to="/"/>)} />
        <Route path="/asignarPerfilSecretaria" element={ token && userType ==='Secretaria'?(<AsignarPerfilSecretaria />):(<Navigate to="/"/>)} />
        <Route path="/solicitudesSecretaria" element={ token && userType ==='Secretaria'?(<SolicitudesSecretaria />):(<Navigate to="/"/>)} />
        <Route path="/evaluacionSecretaria" element={ token && userType ==='Secretaria'?(<EvaluacionSecretaria />):(<Navigate to="/"/>)} />
        <Route path="/logSolicitudSecretaria" element={ token && userType ==='Secretaria'?(<LogSolicitudSecretaria />):(<Navigate to="/"/>)} />
        <Route path="/evaluadores" element={ token && userType ==='Secretaria'?(<CrearEvaluador />):(<Navigate to="/"/>)} />

        {/*COMITE*/}
        <Route path="/inicioComite" element={ token && userType ==='Comité'?(<InicioComite />):(<Navigate to="/"/>)} />
        <Route path="/cambioContraComite" element={ token && userType ==='Comité'?(<CambioContraComite />):(<Navigate to="/"/>)} />
        <Route path="/asignarPerfilComite" element={ token && userType ==='Comité'?(<AsignarPerfilComite />):(<Navigate to="/"/>)} />
        <Route path="/solicitudesComite" element={ token && userType ==='Comité'?(<SolicitudesComite />):(<Navigate to="/"/>)} />
        <Route path="/evaluacionComite" element={ token && userType ==='Comité'?(<EvaluacionComite />):(<Navigate to="/"/>)} />
        <Route path="/logSolicitudComite" element={ token && userType ==='Comité'?(<LogSolicitudComite />):(<Navigate to="/"/>)} />
        <Route path="/evaluadoresComite" element={ token && userType ==='Comité'?(<CrearEvaluadorComite />):(<Navigate to="/"/>)} />

        {/*DOCENTE*/}
        <Route path="/inicioDocente" element={ token && userType ==='Docente'?(<InicioDocente />):(<Navigate to="/"/>)} />
        <Route path="/cambioContraDocente" element={ token && userType ==='Docente'?(<CambioContrasenaDocente />):(<Navigate to="/"/>)} />
        <Route path="/solicitudesDocente" element={ token && userType ==='Docente'?(<Solicitudes />):(<Navigate to="/"/>)} />
        <Route path="/reporteDocente" element={ token && userType ==='Docente'?(<ReporteDocente />):(<Navigate to="/"/>)} />

        {/*EVALUADOR INTERNO*/}
        <Route path="/inicioEvaInt" element={ token && userType ==='Evaluador interno'?(<InicioEvaIntern />):(<Navigate to="/"/>)} />
        <Route path="/misEvaluacionesEvaInt" element={ token && userType ==='Evaluador interno'?(<SolEvaInt />):(<Navigate to="/"/>)} />
        <Route path="/evaluarSolicutd" element={ token && userType ==='Evaluador interno'?(<EvaluacionesEvaInt />):(<Navigate to="/"/>)} />
        <Route path="/cambioContraEvaInt" element={ token && userType ==='Evaluador interno'?(<CambioContraEvaInt />):(<Navigate to="/"/>)} />
      
        {/*EVALUADOR EXTERNO*/}
        <Route path="/inicioEvaExt" element={ token && userType ==='Evaluador externo'?(<InicioEvaExterno />):(<Navigate to="/"/>)} />
        <Route path="/misEvaluacionesEvaExt" element={ token && userType ==='Evaluador externo'?(<SolEvaExt />):(<Navigate to="/"/>)} />
        <Route path="/evaluarSolicitudExt" element={ token && userType ==='Evaluador externo'?(<EvaluacionesEvaExt />):(<Navigate to="/"/>)} />
        <Route path="/cambioContraEvaExt" element={ token && userType ==='Evaluador externo'?(<CambioContraEvaExt />):(<Navigate to="/"/>)} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
