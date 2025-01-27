import { getConnection } from "./../database/database";
import bcrypt from "bcrypt";
const multer = require("multer");
const path = require("path");

const updateContrasena = async (req, res) => {
  try {
    const { id, contrasenaActual, nuevaContrasena } = req.body;

    if (!id || !contrasenaActual || !nuevaContrasena) {
      // console.log("id: " + id);
      // console.log("actual: " + contrasenaActual);
      // console.log("nuevaContra" + nuevaContrasena);
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

//Configuración de Multer para almacenar los archivos PDF
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../pdfs/documentos"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-obraRelevancia-" + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single("pdf");

const crearSolicitudes = async (req, res) => {
  try {
    // Manejar la subida del archivo PDF antes de procesar otros campos
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error al subir el archivo PDF", err);
        return res
          .status(500)
          .json({ message: "Error al subir el archivo PDF" });
      }

      // Obtener los datos del cuerpo de la solicitud después de que se haya subido el PDF
      const {
        tipoObra,
        tituloObra,
        coautores,
        isbn,
        formato,
        autor,
        numeroRegistro,
        lugarRegistro,
        categoria,
        detalleObra,
        numeroHojas,
        fechaEmision,
      } = req.body;

      const pdf = req.file; // El archivo PDF se encuentra en req.file
      console.log(pdf);

      // Verificar si se proporcionó un archivo PDF
      if (!pdf) {
        return res
          .status(400)
          .json({ message: "Debe proporcionar un archivo PDF" });
      }

      // Procesar los demás campos y el archivo PDF
      const documento = {
        TIP_ID: tipoObra,
        DOC_TITULO: tituloObra,
        DOC_AUTOR: coautores,
        DOC_ISBN: isbn,
        DOC_FORMATO: formato,
        DOC_DOCENTE: autor,
        DOC_NUMERO_REGISTRO: numeroRegistro,
        DOC_LUGAR_REGISTRO: lugarRegistro,
        DOC_TIPO_OBRA_SEC: categoria,
        DOC_DETALLE: detalleObra,
        DOC_LINK: pdf.filename, // Guarda solo el nombre del archivo en la base de datos
        DOC_NUMERO_HOJAS: numeroHojas,
        DOC_FECHA_EMISION: fechaEmision,
      };

      console.log(pdf.filename);
      console.log(req.file);

      const moment = require("moment-timezone");

      const fecha = moment
        .tz("America/Guayaquil")
        .format("YYYY-MM-DD HH:mm:ss");

      const solicitud = {
        SOL_SECRETARIA: 0,
        SOL_FECHA_ACTUALIZACION: fecha,
        SOL_FECHA_CREACION: fecha,
        SOL_ESTADO: 0,
        SOL_ESTADO_NOMBRE: "Creado",
      };

      const connection = await getConnection();

      // Inserción en la tabla PMO_ADMINISTRACION_DOCUMENTO
      await connection
        .promise()
        .query("INSERT INTO PMO_ADMINISTRACION_DOCUMENTO SET ?", documento);

      // Obtener el ID del documento recién insertado
      const [documentoIdRows] = await connection
        .promise()
        .query("SELECT LAST_INSERT_ID() AS DOC_ID");

      const documentoID = documentoIdRows[0].DOC_ID;

      // Inserción en la tabla PMO_ADMINISTRACION_SOLICITUD_OBRA
      await connection
        .promise()
        .query(
          "INSERT INTO PMO_ADMINISTRACION_SOLICITUD_OBRA (DOC_ID, SOL_SECRETARIA, SOL_FECHA_ACTUALIZACION, SOL_FECHA_CREACION, SOL_ESTADO, SOL_ESTADO_NOMBRE) VALUES (?, ?, ?, ?, ?, ?)",
          [
            documentoID,
            solicitud.SOL_SECRETARIA,
            solicitud.SOL_FECHA_ACTUALIZACION,
            solicitud.SOL_FECHA_CREACION,
            solicitud.SOL_ESTADO,
            solicitud.SOL_ESTADO_NOMBRE,
          ]
        );

      const [solIdRows] = await connection
        .promise()
        .query("SELECT LAST_INSERT_ID() AS SOL_ID");

      const solID = solIdRows[0].SOL_ID;
      const observaciones = "Solicitud Creada";
      await connection
        .promise()
        .query(
          "INSERT INTO pmo_administracion_log_solicitud_obra (SOL_ID, LOG_FECHA_ACTUALIZACION, LOG_OBSERVACION) VALUES (?, NOW(),? )",
          [solID, observaciones]
        );

      return res.json({ message: "Solicitud añadida exitosamente" });
    });
  } catch (error) {
    console.error("Error al realizar la solicitud", error);
    return res
      .status(500)
      .json({ message: "La solicitud no se creó, hubo un error." });
  }
};

const getSolicitudesUsuID = async (req, res) => {
  try {
    const { idUsu } = req.params;

    if (idUsu == undefined) {
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
        "SELECT " +
          "s.SOL_ID, " +
          "p.PER_NOMBRE, " +
          "p.PER_APELLIDO, " +
          "d.DOC_TITULO, " +
          "d.DOC_FECHA_EMISION," +
          "d.DOC_ID," +
          "s.SOL_FECHA_ACTUALIZACION, " +
          "s.SOL_ESTADO_NOMBRE " +
          "FROM " +
          "pmo_administracion_documento d " +
          "INNER JOIN " +
          "frw_seguridad_usuario u ON d.DOC_DOCENTE = u.USU_ID " +
          "INNER JOIN " +
          "pmo_administracion_solicitud_obra s ON d.DOC_ID = s.DOC_ID " +
          "INNER JOIN " +
          "frw_seguridad_persona p ON u.PER_ID = p.PER_ID " +
          "WHERE " +
          "u.USU_ID = ?",
        [idUsu]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getSolicitudesDocID = async (req, res) => {
  try {
    const { idDoc } = req.params;

    if (idDoc == undefined) {
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
        "SELECT DOC.*, TIPO1.TIP_NOMBRE AS TIP_NOMBRE_1, TIPO2.TIP_NOMBRE AS TIP_NOMBRE_2, TIPO1.TIP_REQUISITOS FROM PMO_ADMINISTRACION_DOCUMENTO DOC JOIN PMO_ADMINISTRACION_TIPO_OBRA TIPO1 ON DOC.TIP_ID = TIPO1.TIP_ID LEFT JOIN PMO_ADMINISTRACION_TIPO_OBRA TIPO2 ON DOC.DOC_TIPO_OBRA_SEC = TIPO2.TIP_ID WHERE DOC.DOC_ID = ?; ",
        [idDoc]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getLinkEvaluaciones = async (req, res) => {
  try {
    const { id } = req.params;

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

      .query("SELECT * FROM pmo_administracion_informe WHERE EVA_ID = ?;", [
        id,
      ]);
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getEvaluacionesDocente = async (req, res) => {
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
        "SELECT EVA.EVA_ID, EVA.DOC_ID, EVA.EVA_FECHA_ASIGNACION, EVA.EVA_ESTADO, EVA.EVA_ESTADO_NOMBRE, EVA.EVA_TIPO, EVA.EVA_EVALUADOR, EVA.EVA_FECHA_EVALUACION, EVA.EVA_INFORME, PERSONA.PER_NOMBRE, PERSONA.PER_APELLIDO, ACADEMICO.ACA_AREA_CONOCIMIENTO, ACADEMICO.ACA_ESPECIALIDAD FROM PMO_ADMINISTRACION_EVALUACION_OBRA AS EVA JOIN FRW_SEGURIDAD_PERSONA AS PERSONA ON EVA.EVA_EVALUADOR = PERSONA.PER_ID JOIN FRW_SEGURIDAD_USUARIO AS USUARIO ON PERSONA.PER_ID = USUARIO.PER_ID JOIN PMO_ADMINISTRACION_ACADEMICO AS ACADEMICO ON USUARIO.ACA_ID = ACADEMICO.ACA_ID WHERE EVA.DOC_ID = ? AND EVA.EVA_ESTADO_LOGICO = 1",
        [id]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getLinkEvaluaciones,
  getEvaluacionesDocente,
  updateContrasena,
  getSolicitudesDocID,
  getSolicitudesUsuID,
  crearSolicitudes,
};
