import { getConnection } from "./../database/database";
import bcrypt from "bcrypt";
const multer = require("multer");
const path = require("path");

const updateContrasena = async (req, res) => {
  try {
    const { id, contrasenaActual, nuevaContrasena } = req.body;

    if (!id || !contrasenaActual || !nuevaContrasena) {
      return res.status(400).json({
        message: "Petición incorrecta. Por favor complete todos los campos.",
      });
    }

    const connection = await getConnection();

    const [result] = await connection
      .promise()
      .query(
        "SELECT USU_ID, USU_CONTRASENA FROM FRW_SEGURIDAD_USUARIO WHERE USU_ID = ?",
        [id]
      );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const usuario = result[0];

    const passwordMatch = await bcrypt.compare(
      contrasenaActual,
      usuario.USU_CONTRASENA
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Su contraseña actual no coincide con la almacenada anteriormente",
      });
    }

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    await connection
      .promise()
      .query(
        "UPDATE frw_seguridad_usuario SET USU_CONTRASENA = ? WHERE USU_ID = ?",
        [hashedPassword, id]
      );

    res.json({ message: "Contraseña actualizada", success: true });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const getEvaluacionesEvaExt = async (req, res) => {
  try {
    const { id } = req.params;
    // const { rol } = req.body;
    // console.log(rol);
    // console.log(id);
    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }
    //console.log(rol);

    const connection = await getConnection();
    const result = await connection
      .promise()
      //.query("UPDATE frw_seguridad_usuario SET USU_CONTRASENA = ? WHERE USU_ID = ?", [rol, id]);
      .query(
        "SELECT eoa.DOC_ID, eoa.EVA_ESTADO_NOMBRE, eoa.EVA_TIPO, eoa.EVA_ESTADO, ad.DOC_TITULO, tipo.TIP_NOMBRE, tipo.TIP_REQUISITOS FROM pmo_administracion_evaluacion_obra eoa JOIN pmo_administracion_documento ad ON eoa.DOC_ID = ad.DOC_ID JOIN pmo_administracion_tipo_obra tipo ON ad.TIP_ID = tipo.TIP_ID WHERE eoa.EVA_EVALUADOR = ? AND eoa.EVA_ESTADO_LOGICO = 1; ",
        [id]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getEvaluacionesModalExt = async (req, res) => {
  try {
    const { id } = req.params;
    // const { rol } = req.body;
    // console.log(rol);
    // console.log(id);
    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }
    //console.log(rol);

    const connection = await getConnection();
    const result = await connection
      .promise()
      //.query("UPDATE frw_seguridad_usuario SET USU_CONTRASENA = ? WHERE USU_ID = ?", [rol, id]);
      .query(
        "SELECT DOC.*, TIPO1.TIP_NOMBRE AS TIP_NOMBRE_1, TIPO2.TIP_NOMBRE AS TIP_NOMBRE_2, TIPO1.TIP_REQUISITOS, PER.PER_NOMBRE, PER.PER_APELLIDO, SOL.SOL_ID FROM PMO_ADMINISTRACION_DOCUMENTO DOC JOIN PMO_ADMINISTRACION_TIPO_OBRA TIPO1 ON DOC.TIP_ID = TIPO1.TIP_ID LEFT JOIN PMO_ADMINISTRACION_TIPO_OBRA TIPO2 ON DOC.DOC_TIPO_OBRA_SEC = TIPO2.TIP_ID JOIN frw_seguridad_usuario USU ON DOC.DOC_DOCENTE = USU.USU_ID JOIN frw_seguridad_persona PER ON USU.PER_ID = PER.PER_ID LEFT JOIN PMO_ADMINISTRACION_SOLICITUD_OBRA SOL ON DOC.DOC_ID = SOL.DOC_ID WHERE DOC.DOC_ID = ?;        ",
        [id]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getTTextosRequisitoExt = async (req, res) => {
  try {
    const { id } = req.params;

    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }

    const connection = await getConnection();
    const result = await connection
      .promise()

      .query("SELECT * FROM pmo_administracion_requisito WHERE REQ_TIPO = ?;", [
        id,
      ]);

    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const calificarEvaExt = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_so, idEva, idSolicitud } = req.body;

    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }

    const connection = await getConnection();

    if (estado_so == 0) {
      await connection
        .promise()
        .query(
          "UPDATE pmo_administracion_evaluacion_obra SET EVA_ESTADO = 1, EVA_ESTADO_NOMBRE = 'Aceptado', EVA_FECHA_EVALUACION = NOW() WHERE DOC_ID = ? AND EVA_EVALUADOR = ?",
          [id, idEva]
        );

      const observaciones = "Calificación Externa de la solicitud Aceptada";
      await connection
        .promise()
        .query(
          "INSERT INTO pmo_administracion_log_solicitud_obra (SOL_ID, LOG_FECHA_ACTUALIZACION, LOG_OBSERVACION) VALUES (?, NOW(),? )",
          [idSolicitud, observaciones]
        );

      res.json({ message: "Operación realizada con éxito." });
    } else if (estado_so == 1) {
      await connection
        .promise()
        .query(
          "UPDATE pmo_administracion_evaluacion_obra SET EVA_ESTADO = 2, EVA_ESTADO_NOMBRE = 'Rechazado', EVA_FECHA_EVALUACION = NOW() WHERE DOC_ID = ? AND EVA_EVALUADOR = ?",
          [id, idEva]
        );

      const observaciones = "Calificación Externa de la solicitud Rechazada";
      await connection
        .promise()
        .query(
          "INSERT INTO pmo_administracion_log_solicitud_obra (SOL_ID, LOG_FECHA_ACTUALIZACION, LOG_OBSERVACION) VALUES (?, NOW(),? )",
          [idSolicitud, observaciones]
        );

      res.json({ message: "Operación realizada con éxito." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const crearInformeExt = async (req, res) => {
  try {
      const {
        infoEvaluador,
        infoTipo,
        infoInforme,
        infoRecomendacion,
        infoEstado,
        docId,
        evaId,
        infLink,
        infRecomendador,
      } = req.body;

      // Determinar el nombre del estado según el valor de infoEstado
      const infoEstadoNombre = infoEstado === 0 ? "Rechazado" : "Aceptado";

      const connection = await getConnection();

      // Consulta SQL para obtener el valor de infoEvaId
      const [rows] = await connection
        .promise()
        .query(
          "SELECT EVA_ID FROM PMO_ADMINISTRACION_EVALUACION_OBRA  WHERE DOC_ID = ? AND EVA_EVALUADOR = ?",
          [docId, evaId]
        );

      const infoEvaId = rows[0].EVA_ID;

      // Procesar los demás campos y el archivo PDF
      const informe = {
        EVA_ID: infoEvaId,
        INF_EVALUADOR: infoEvaluador,
        INF_TIPO: infoTipo,
        INF_INFORME: infoInforme,
        INF_RECOMENDACION: infoRecomendacion,
        INF_ESTADO: infoEstado,
        INF_ESTADO_NOMBRE: infoEstadoNombre,
        INF_LINK: infLink,
        INF_RECOMENDADOR: infRecomendador,
      };

      // Inserción en la tabla PMO_ADMINISTRACION_DOCUMENTO
      await connection
        .promise()
        .query("INSERT INTO PMO_ADMINISTRACION_INFORME SET ?", informe);

      return res.json({ message: "Informe añadido exitosamente" });
    
  } catch (error) {
    console.error("Error al realizar el informe", error);
    return res
      .status(500)
      .json({ message: "El informe no se creó, hubo un error." });
  }
};

const getUsuariosFiltradoExt = async (req, res) => {
  try {
    const { id } = req.params;
    // const { rol } = req.body;
    // console.log(rol);
    // console.log(id);
    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }
    //console.log(rol);

    const connection = await getConnection();
    const result = await connection
      .promise()

      //.query("SELECT DOC.*, TIPO.TIP_NOMBRE FROM PMO_ADMINISTRACION_DOCUMENTO DOC JOIN PMO_ADMINISTRACION_TIPO_OBRA TIPO ON DOC.TIP_ID = TIPO.TIP_ID WHERE DOC.DOC_ID = ? ", [id]);
      .query(
        "SELECT fu.USU_ID, fu.USU_USUARIO, fa.*, fp.* FROM frw_seguridad_usuario fu JOIN pmo_administracion_academico fa ON fu.ACA_ID = fa.ACA_ID JOIN frw_seguridad_persona fp ON fu.PER_ID = fp.PER_ID WHERE fu.USU_ID = ?;",
        [id]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../pdfs/evaluaciones'),
  filename: (req, file, cb) => {
    const nuevoNombre = file.originalname;
    cb(null, nuevoNombre);
  },
});

const upload = multer({
  storage: storage,
}).single('pdf');

const guardarPdf = async (req, res) => {
  try {
    // Manejar la subida del archivo PDF antes de procesar otros campos
    upload(req, res, async (err) => {
      if (err) {
        console.log('Error al subir el archivo PDF', err);
        return res.status(500).json({ message: 'Error al subir el archivo PDF' });
      }

      // Acceder al archivo PDF desde req.file
      const pdfFile = req.file;
      if (!pdfFile) {
        console.log('Error: No se recibió el archivo PDF');
        return res.status(400).json({ message: 'No se recibió el archivo PDF' });
      }

      console.log('pdf', pdfFile);

      // Puedes realizar otras operaciones con el archivo PDF aquí

      return res.json({ message: 'Archivo PDF recibido y guardado exitosamente.' });
    });
  } catch (error) {
    console.error('Error al procesar la solicitud', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

const cambiarEstadoSolEvaExt = async (req, res) => {
  try {
    const { id } = req.params;

    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }

    const connection = await getConnection();
    const result = await connection
      .promise()

      .query("UPDATE pmo_administracion_solicitud_obra SET SOL_ESTADO_NOMBRE = 'Evaluando', SOL_ESTADO = 2 WHERE DOC_ID = ?", [
        id,
      ]);

    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const methods = {
  cambiarEstadoSolEvaExt,
  guardarPdf,
  calificarEvaExt,
  getTTextosRequisitoExt,
  getEvaluacionesModalExt,
  getEvaluacionesEvaExt,
  updateContrasena,
  crearInformeExt,
  getUsuariosFiltradoExt,
};
