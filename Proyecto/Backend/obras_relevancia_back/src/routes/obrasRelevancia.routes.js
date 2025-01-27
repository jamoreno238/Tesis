import { Router } from "express";
import { methods as usuariosController } from "./../controllers/usuarios";
import { methods as secretariaController } from "../controllers/secretaria";
import { methods as comiteController } from "../controllers/comite";
import { methods as docenteController } from "../controllers/docente";
import { methods as evaluadorInternoController } from "../controllers/evaluadorInterno";
import { methods as evaluadorExternoController } from "../controllers/evaluadorExterno";
import jwt from "jsonwebtoken";
const path = require("path");
const express = require("express");
const app = express();
const router = Router();


const secretKey = process.env.SECRET_KEY;

// Verificar Token Middleware
const verificarTokenYTipoUsuario = (tipoUsuario) => (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token.split(" ")[1], secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.userType = decoded.userType;
    if (req.userType !== tipoUsuario) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  });
};

// Uso de la función genérica para cada tipo de usuario
const verificarTokenSecretaria = verificarTokenYTipoUsuario('Secretaria');
const verificarTokenDocente = verificarTokenYTipoUsuario('Docente');
const verificarTokenEvaluadorInterno = verificarTokenYTipoUsuario('Evaluador interno');
const verificarTokenEvaluadorExterno = verificarTokenYTipoUsuario('Evaluador externo');
const verificarTokenMiembroComite = verificarTokenYTipoUsuario('Comité');
const verificarTokenAdministrador = verificarTokenYTipoUsuario('Administrador');


//USUARIOS
router.post("/registrarse", usuariosController.registrarse);
router.post("/login", usuariosController.loginUsuario);
router.post("/recuperarContrasena", usuariosController.recuperarContrasena);


//SECRETARIA
router.get("/secretariaAsignarPerfil/", verificarTokenSecretaria, secretariaController.getUsuariosWithRol);
router.get("/secretariaSolicitudes/", verificarTokenSecretaria, secretariaController.getSolicitudesTabla);
router.get("/secretariaSolicitudesModal/:id", verificarTokenSecretaria, secretariaController.getSolicitudesModal);
router.get("/secretariaEvaluaciones/:id", verificarTokenSecretaria, secretariaController.getEvaluacionesSecretaria);
router.get("/evaluadoresSecretaria/", verificarTokenSecretaria, secretariaController.getEvaluadoresSecretaria);
router.get("/obtenerEvaluadores/", verificarTokenSecretaria, secretariaController.getEvaluadores);
router.get("/obtenerUsuarios/", verificarTokenSecretaria, secretariaController.getUsuariosSecretaria);
router.get("/obtenerUsuariosFiltrado/:id", verificarTokenSecretaria, secretariaController.getUsuariosSecretariaFiltrado);
router.get("/obtenerLogSolicitudes/:id", verificarTokenSecretaria, secretariaController.getLogSolicitud);
router.post("/registrarEvaluadorExterno/", verificarTokenSecretaria, secretariaController.registrarEvaluadorExterno);
router.post("/registrarEvaluadorInterno/", verificarTokenSecretaria, secretariaController.registrarEvaluadorInterno);
router.post("/secretariaCambiarContrasena", verificarTokenSecretaria, secretariaController.updateContrasena);
router.post("/asignarEvaluadorObra/", verificarTokenSecretaria, secretariaController.asignarEvaluadorObra);
router.post("/borrarEva/:id", verificarTokenSecretaria, secretariaController.borrarEvaluador);
router.post("/calificarSolInicial/:id", verificarTokenSecretaria, secretariaController.updateSolInicial);
router.put("/editarRol/", verificarTokenSecretaria, secretariaController.updateRol);
router.get("/obtenerLinkEvaluaciones/:id", verificarTokenSecretaria, secretariaController.getLinkEvaluaciones);

//COMITE

router.get("/comiteAsignarPerfil/", verificarTokenMiembroComite, comiteController.getUsuariosWithRol);
router.get("/comiteSolicitudes/", verificarTokenMiembroComite, comiteController.getSolicitudesTabla);
router.get("/comiteSolicitudesModal/:id", verificarTokenMiembroComite, comiteController.getSolicitudesModal);
router.get("/comiteEvaluaciones/:id", verificarTokenMiembroComite, comiteController.getEvaluacionesComite);
router.get("/comiteEvaluadores/", verificarTokenMiembroComite, comiteController.getEvaluadoresComite);
router.get("/comiteObtenerEvaluadores/", verificarTokenMiembroComite, comiteController.getEvaluadores);
router.get("/comiteObtenerUsuarios/", verificarTokenMiembroComite, comiteController.getUsuariosComite);
router.get("/comiteObtenerUsuariosFiltrado/:id", verificarTokenMiembroComite, comiteController.getUsuariosComiteFiltrado);
router.get("/comiteObtenerLogSolicitudes/:id", verificarTokenMiembroComite, comiteController.getLogSolicitud);
router.post("/comiteCambiarContrasena", verificarTokenMiembroComite, comiteController.updateContrasena);
router.post("/comiteAsignarEvaluadorObra/", verificarTokenMiembroComite, comiteController.asignarEvaluadorObra);
router.post("/comiteBorrarEva/:id", verificarTokenMiembroComite, comiteController.borrarEvaluador);
router.post("/comiteCalificarSolInicial/:id", verificarTokenMiembroComite, comiteController.updateSolInicial);
router.put("/comiteEditarRol/", verificarTokenMiembroComite, comiteController.updateRol);

//DOCENTE
router.post("/docenteCambiarContrasena", verificarTokenDocente, docenteController.updateContrasena);
router.get("/obtenerSolicitudesDocID/:idDoc", verificarTokenDocente, docenteController.getSolicitudesDocID);
router.get("/obtenerSolicitudesUsuID/:idUsu",  verificarTokenDocente, docenteController.getSolicitudesUsuID);
router.post("/crearSolicitudes/",  verificarTokenDocente, docenteController.crearSolicitudes);
router.get("/obtenerLinkEvaluacionesDocente/:id", verificarTokenDocente, docenteController.getLinkEvaluaciones);
router.get("/docenteEvaluaciones/:id", verificarTokenDocente, docenteController.getEvaluacionesDocente);


//EVALUADOR INTERNO
router.post("/evaluadorInternoCambiarContrasena", verificarTokenEvaluadorInterno, evaluadorInternoController.updateContrasena);
router.get("/obtenerEvaluacionesEvaInt/:id", verificarTokenEvaluadorInterno, evaluadorInternoController.getEvaluacionesEvaInt);
router.get("/obtenerDatosEValuacion/:id", verificarTokenEvaluadorInterno, evaluadorInternoController.getEvaluacionesModal);
router.get("/obtenerRequisitos/:id", verificarTokenEvaluadorInterno,evaluadorInternoController.getTTextosRequisito);
router.post("/calificarEvaInt/:id", verificarTokenEvaluadorInterno,evaluadorInternoController.calificarEvaInt);
router.post("/actualizarSolicitudesEvaInt/:id", verificarTokenEvaluadorInterno,evaluadorInternoController.actualizarSolicitudesEvaInt);
router.get("/obtenerUsuariosFiltradoInt/:id",  verificarTokenEvaluadorInterno,evaluadorInternoController.getUsuariosFiltradoInt);
router.post("/crearInformeInt", verificarTokenEvaluadorInterno, evaluadorInternoController.crearInformeInt);
router.post("/guardarReporteInterno", verificarTokenEvaluadorInterno, evaluadorInternoController.guardarPdfInt);
router.post("/cambiarEstadoSolEvaInt/:id",  /*verificarTokenEvaluadorInterno,*/evaluadorInternoController.cambiarEstadoSolEvaInt);

//EVALUADOR Externo
router.post("/evaluadorExternoCambiarContrasena", verificarTokenEvaluadorExterno, evaluadorExternoController.updateContrasena);
router.get("/obtenerEvaluacionesEvaExt/:id", verificarTokenEvaluadorExterno, evaluadorExternoController.getEvaluacionesEvaExt);
router.get("/obtenerDatosEvaluacionExt/:id", verificarTokenEvaluadorExterno, evaluadorExternoController.getEvaluacionesModalExt);
router.get("/obtenerRequisitosExt/:id", verificarTokenEvaluadorExterno,evaluadorExternoController.getTTextosRequisitoExt);
router.post("/calificarEvaExt/:id", verificarTokenEvaluadorExterno, evaluadorExternoController.calificarEvaExt);
router.get("/obtenerUsuariosFiltradoExt/:id",  verificarTokenEvaluadorExterno,evaluadorExternoController.getUsuariosFiltradoExt);
router.post("/crearInformeExt", verificarTokenEvaluadorExterno, evaluadorExternoController.crearInformeExt);
router.post("/guardarReporteExterno", verificarTokenEvaluadorExterno, evaluadorExternoController.guardarPdf);
router.post("/cambiarEstadoSolEvaExt/:id",  /*verificarTokenEvaluadorExterno,*/evaluadorExternoController.cambiarEstadoSolEvaExt);

router.use("/pdfs", express.static(path.join(__dirname, "../pdfs/documentos")));
router.use("/pdfEvaluaciones", express.static(path.join(__dirname, "../pdfs/evaluaciones")));
export default router;
