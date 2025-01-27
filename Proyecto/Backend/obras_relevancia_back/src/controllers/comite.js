
import { getConnection } from "../database/database";
import bcrypt from "bcrypt";

const getUsuariosWithRol = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection
      .promise()
      .query(
        "SELECT p.PER_NOMBRE, p.PER_APELLIDO, r.ROL_NOMBRE, r.ROL_CODIGO, u.USU_ID, r.ROL_ID FROM FRW_SEGURIDAD_PERSONA p JOIN FRW_SEGURIDAD_USUARIO u ON p.PER_ID = u.PER_ID JOIN FRW_SEGURIDAD_USUARIO_ROL ur ON u.USU_ID = ur.USU_ID JOIN FRW_SEGURIDAD_ROL r ON ur.ROL_ID = r.ROL_ID"
      );
    res.json(result);
  } catch (error) {

    // console.log("entre en el catch");
    res.status(500);
    res.send("error.message");
  }
};

const getSolicitudesTabla = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection
      .promise()
      .query(
        "SELECT SOL.SOL_ID, SOL.SOL_FECHA_CREACION, SOL.SOL_FECHA_ACTUALIZACION, SOL.SOL_ESTADO_NOMBRE, DOC.DOC_ID, DOC.DOC_AUTOR, EVA_INT.EVA_ESTADO_NOMBRE AS EVA_ESTADO_NOMBRE_INTERNA, EVA_EXT.EVA_ESTADO_NOMBRE AS EVA_ESTADO_NOMBRE_EXTERNA, EVA_TER.EVA_ESTADO_NOMBRE AS EVA_ESTADO_NOMBRE_TERCERO FROM PMO_ADMINISTRACION_SOLICITUD_OBRA SOL JOIN PMO_ADMINISTRACION_DOCUMENTO DOC ON SOL.DOC_ID = DOC.DOC_ID LEFT JOIN PMO_ADMINISTRACION_EVALUACION_OBRA EVA_INT ON SOL.DOC_ID = EVA_INT.DOC_ID AND EVA_INT.EVA_TIPO = 'Evaluación Interna' AND EVA_INT.EVA_ESTADO_LOGICO = 1 LEFT JOIN PMO_ADMINISTRACION_EVALUACION_OBRA EVA_EXT ON SOL.DOC_ID = EVA_EXT.DOC_ID AND EVA_EXT.EVA_TIPO = 'Evaluación Externa' AND EVA_EXT.EVA_ESTADO_LOGICO = 1 LEFT JOIN PMO_ADMINISTRACION_EVALUACION_OBRA EVA_TER ON SOL.DOC_ID = EVA_TER.DOC_ID AND EVA_TER.EVA_TIPO = 'Evaluación Tercera' AND EVA_TER.EVA_ESTADO_LOGICO = 1; "
      );
    res.json(result);
  } catch (error) {
    // console.log("entre en el catch");
    res.status(500);
    res.send("error.message");
  }
};

const getSolicitudesModal = async (req, res) => {
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
        "SELECT DOC.*, TIPO1.TIP_NOMBRE AS TIP_NOMBRE_1, TIPO2.TIP_NOMBRE AS TIP_NOMBRE_2 FROM PMO_ADMINISTRACION_DOCUMENTO DOC JOIN PMO_ADMINISTRACION_TIPO_OBRA TIPO1 ON DOC.TIP_ID = TIPO1.TIP_ID LEFT JOIN PMO_ADMINISTRACION_TIPO_OBRA TIPO2 ON DOC.DOC_TIPO_OBRA_SEC = TIPO2.TIP_ID WHERE DOC.DOC_ID = ?; ",
        [id]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getEvaluacionesComite = async (req, res) => {
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

const getEvaluadoresComite = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection
      .promise()
      .query(
        "SELECT FRW_SEGURIDAD_USUARIO_ROL.ROL_ID, FRW_SEGURIDAD_PERSONA.PER_ID, FRW_SEGURIDAD_PERSONA.PER_NOMBRE, FRW_SEGURIDAD_PERSONA.PER_APELLIDO, PMO_ADMINISTRACION_ACADEMICO.ACA_AREA_CONOCIMIENTO, PMO_ADMINISTRACION_ACADEMICO.ACA_ESPECIALIDAD FROM FRW_SEGURIDAD_USUARIO_ROL JOIN FRW_SEGURIDAD_USUARIO ON FRW_SEGURIDAD_USUARIO_ROL.USU_ID = FRW_SEGURIDAD_USUARIO.USU_ID JOIN FRW_SEGURIDAD_PERSONA ON FRW_SEGURIDAD_USUARIO.PER_ID = FRW_SEGURIDAD_PERSONA.PER_ID JOIN PMO_ADMINISTRACION_ACADEMICO ON FRW_SEGURIDAD_USUARIO.ACA_ID = pmo_administracion_academico.ACA_ID WHERE FRW_SEGURIDAD_USUARIO_ROL.ROL_ID IN (4,5);"
      );
    res.json(result);
  } catch (error) {
    // console.log("entre en el catch");
    res.status(500);
    res.send("error.message");
  }
};

const asignarEvaluadorObra = async (req, res) => {
  try {
    const { doc_id, eva_tipo, eva_evaluador } = req.body;

    const connection = await getConnection(); // Suponiendo que tienes una función para obtener la conexión a la base de datos

    // Inserción en la tabla FRW_SEGURIDAD_PERSONA

    await connection
      .promise()
      .query(
        "INSERT INTO pmo_administracion_evaluacion_obra (DOC_ID, EVA_FECHA_ASIGNACION, EVA_ESTADO, EVA_ESTADO_NOMBRE, EVA_TIPO, EVA_FECHA_EVALUACION, EVA_INFORME, EVA_EVALUADOR, EVA_ESTADO_LOGICO) VALUES (?, NOW(), 0, 'Asignado', ?, NULL, NULL, ?, 1);",
        [doc_id, eva_tipo, eva_evaluador]
      );
    // Obtener el ID de la persona recién insertada

    return res.json({ message: "Evaluador añadido" });
  } catch (error) {
    console.error("Error al añadir Evaluacion':", error);
    return res.status(500).json({
      message: "Error al añadir Evaluacion 2",
    });
  }
};

const borrarEvaluador = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection
      .promise()
      .query(
        "UPDATE pmo_administracion_evaluacion_obra SET EVA_ESTADO_LOGICO = 0 WHERE EVA_ID = ?",
        id
      );
    //UPDATE frw_seguridad_usuario SET USU_CONTRASENA = ? WHERE USU_ID = ?
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getUsuariosComite = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection
      .promise()
      .query(
        "SELECT fu.USU_ID, fu.USU_USUARIO, fp.PER_NOMBRE, fp.PER_APELLIDO, fa.ACA_TITULO FROM frw_seguridad_usuario fu JOIN pmo_administracion_academico fa ON fu.ACA_ID = fa.ACA_ID JOIN frw_seguridad_persona fp ON fu.PER_ID = fp.PER_ID;"
      );
    res.json(result);
  } catch (error) {
    // console.log("entre en el catch");
    res.status(500);
    res.send("error.message");
  }
};

const getUsuariosComiteFiltrado = async (req, res) => {
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

const getLogSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }

    const connection = await getConnection();
    const result = await connection
      .promise()
      .query(
        "SELECT * FROM PMO_ADMINISTRACION_LOG_SOLICITUD_OBRA WHERE SOL_ID = ?;",
        [id]
      );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

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

const registrarEvaluadorInterno = async (req, res) => {
  try {
    const {
      cedula,
      nombre,
      apellido,
      correoInstitucional,
      correoPersonal,
      telefonoConvencional,
      nickUsuario,
      telefonoCelular,
      contrasena,
      institutoLabor,
      departamentoUnidad,
      areaConocimiento,
      especialidad,
      titulo,
      gradoAcademico,
      lineaInvestigacion,
      cargo,
      idEspe,
    } = req.body;

    // Elimina la validación === undefined

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Agrega más console.log para depurar
    // console.log("Datos recibidos:", req.body);

    // Inserción en la tabla FRW_SEGURIDAD_PERSONA
    const persona = {
      PER_CEDULA: cedula,
      PER_NOMBRE: nombre,
      PER_APELLIDO: apellido,
      PER_CORREO_INSTITUCIONAL: correoInstitucional,
      PER_CORREO_PERSONAL: correoPersonal,
      PER_TELEFONO_CONVENCIONAL: telefonoConvencional,
      PER_TELEFONO_CELULAR: telefonoCelular,
      PER_ESTADO: 1,
    };

    // Inserción en la tabla PMO_ADMINISTRACION_ACADEMICO
    const academico = {
      ACA_INSTITUCION_LABOR: institutoLabor,
      ACA_DEPARTAMENTO_UNIDAD: departamentoUnidad,
      ACA_AREA_CONOCIMIENTO: areaConocimiento,
      ACA_ESPECIALIDAD: especialidad,
      ACA_TITULO: titulo,
      ACA_GRADO_ACADEMICO: gradoAcademico,
      ACA_LINEA_INVESTIGACION: lineaInvestigacion,
      ACA_CARGO: cargo,
      ACA_ESTADO: 1,
      ACA_ID_ESPE: idEspe,
    };

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO
    const usuarioData = {
      USU_USUARIO: nickUsuario,
      USU_CONTRASENA: hashedPassword,
      USU_ESTADO: 1,
    };

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO_ROL
    const usuarioRol = {
      ROL_ID: 4,
    };

    // console.log("Datos de persona:", JSON.stringify(persona, null, 2));
    // console.log("Datos de Academico:", JSON.stringify(academico, null, 2));
    // console.log("Datos de Usuario:", JSON.stringify(usuarioData, null, 2));
    // console.log("Datos de persona:", JSON.stringify(usuarioRol, null, 2));

    const connection = await getConnection(); // Suponiendo que tienes una función para obtener la conexión a la base de datos

    // Inserción en la tabla FRW_SEGURIDAD_PERSONA
    await connection
      .promise()
      .query("INSERT INTO FRW_SEGURIDAD_PERSONA SET ?", persona);

    // Inserción en la tabla PMO_ADMINISTRACION_ACADEMICO
    await connection
      .promise()
      .query("INSERT INTO PMO_ADMINISTRACION_ACADEMICO SET ?", academico);

    // Obtener el ID de la persona recién insertada
    const [personaIdRows] = await connection
      .promise()
      .query("SELECT LAST_INSERT_ID() AS PER_ID");

    const personaId = personaIdRows[0].PER_ID;

    // Obtener el ID de la persona recién insertada
    const [academicoIdRows] = await connection
      .promise()
      .query("SELECT LAST_INSERT_ID() AS ACA_ID");

    const academicoId = academicoIdRows[0].ACA_ID;

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO
    await connection
      .promise()
      .query(
        "INSERT INTO FRW_SEGURIDAD_USUARIO (ACA_ID, PER_ID, USU_USUARIO, USU_CONTRASENA, USU_ESTADO) VALUES (?, ?, ?, ?, ?)",
        [
          academicoId,
          personaId,
          usuarioData.USU_USUARIO,
          usuarioData.USU_CONTRASENA,
          usuarioData.USU_ESTADO,
        ]
      );

    // Obtener el ID de la persona recién insertada
    const [usuarioIdRows] = await connection
      .promise()
      .query("SELECT LAST_INSERT_ID() AS USU_ID");

    const usuarioId = usuarioIdRows[0].USU_ID;

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO_ROL
    await connection
      .promise()
      .query(
        "INSERT INTO FRW_SEGURIDAD_USUARIO_ROL (USU_ID, ROL_ID) VALUES (?, ?)",
        [usuarioId, usuarioRol.ROL_ID]
      );

    return res.json({ message: "Usuario añadido" });
  } catch (error) {
    console.error("Error en el método 'registrarse':", error);
    return res.status(500).json({
      message: "El usuario no se ha añadido, hubo un error.",
    });
  }
};

const registrarEvaluadorExterno = async (req, res) => {
  try {
    const {
      cedula,
      nombre,
      apellido,
      correoInstitucional,
      correoPersonal,
      telefonoConvencional,
      nickUsuario,
      telefonoCelular,
      contrasena,
      institutoLabor,
      departamentoUnidad,
      areaConocimiento,
      especialidad,
      titulo,
      gradoAcademico,
      lineaInvestigacion,
      cargo,
      idEspe,
    } = req.body;

    // Elimina la validación === undefined

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Agrega más console.log para depurar
    // console.log("Datos recibidos:", req.body);

    // Inserción en la tabla FRW_SEGURIDAD_PERSONA
    const persona = {
      PER_CEDULA: cedula,
      PER_NOMBRE: nombre,
      PER_APELLIDO: apellido,
      PER_CORREO_INSTITUCIONAL: correoInstitucional,
      PER_CORREO_PERSONAL: correoPersonal,
      PER_TELEFONO_CONVENCIONAL: telefonoConvencional,
      PER_TELEFONO_CELULAR: telefonoCelular,
      PER_ESTADO: 1,
    };

    // Inserción en la tabla PMO_ADMINISTRACION_ACADEMICO
    const academico = {
      ACA_INSTITUCION_LABOR: institutoLabor,
      ACA_DEPARTAMENTO_UNIDAD: departamentoUnidad,
      ACA_AREA_CONOCIMIENTO: areaConocimiento,
      ACA_ESPECIALIDAD: especialidad,
      ACA_TITULO: titulo,
      ACA_GRADO_ACADEMICO: gradoAcademico,
      ACA_LINEA_INVESTIGACION: lineaInvestigacion,
      ACA_CARGO: cargo,
      ACA_ESTADO: 1,
      ACA_ID_ESPE: " ",
    };

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO
    const usuarioData = {
      USU_USUARIO: nickUsuario,
      USU_CONTRASENA: hashedPassword,
      USU_ESTADO: 1,
    };

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO_ROL
    const usuarioRol = {
      ROL_ID: 5,
    };

    // console.log("Datos de persona:", JSON.stringify(persona, null, 2));
    // console.log("Datos de Academico:", JSON.stringify(academico, null, 2));
    // console.log("Datos de Usuario:", JSON.stringify(usuarioData, null, 2));
    // console.log("Datos de persona:", JSON.stringify(usuarioRol, null, 2));

    const connection = await getConnection(); // Suponiendo que tienes una función para obtener la conexión a la base de datos

    // Inserción en la tabla FRW_SEGURIDAD_PERSONA
    await connection
      .promise()
      .query("INSERT INTO FRW_SEGURIDAD_PERSONA SET ?", persona);

    // Inserción en la tabla PMO_ADMINISTRACION_ACADEMICO
    await connection
      .promise()
      .query("INSERT INTO PMO_ADMINISTRACION_ACADEMICO SET ?", academico);

    // Obtener el ID de la persona recién insertada
    const [personaIdRows] = await connection
      .promise()
      .query("SELECT LAST_INSERT_ID() AS PER_ID");

    const personaId = personaIdRows[0].PER_ID;

    // Obtener el ID de la persona recién insertada
    const [academicoIdRows] = await connection
      .promise()
      .query("SELECT LAST_INSERT_ID() AS ACA_ID");

    const academicoId = academicoIdRows[0].ACA_ID;

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO
    await connection
      .promise()
      .query(
        "INSERT INTO FRW_SEGURIDAD_USUARIO (ACA_ID, PER_ID, USU_USUARIO, USU_CONTRASENA, USU_ESTADO) VALUES (?, ?, ?, ?, ?)",
        [
          academicoId,
          personaId,
          usuarioData.USU_USUARIO,
          usuarioData.USU_CONTRASENA,
          usuarioData.USU_ESTADO,
        ]
      );

    // Obtener el ID de la persona recién insertada
    const [usuarioIdRows] = await connection
      .promise()
      .query("SELECT LAST_INSERT_ID() AS USU_ID");

    const usuarioId = usuarioIdRows[0].USU_ID;

    // Inserción en la tabla FRW_SEGURIDAD_USUARIO_ROL
    await connection
      .promise()
      .query(
        "INSERT INTO FRW_SEGURIDAD_USUARIO_ROL (USU_ID, ROL_ID) VALUES (?, ?)",
        [usuarioId, usuarioRol.ROL_ID]
      );

    return res.json({ message: "Usuario añadido" });
  } catch (error) {
    console.error("Error en el método 'registrarse':", error);
    return res.status(500).json({
      message: "El usuario no se ha añadido, hubo un error.",
    });
  }
};

const getEvaluadores = async (req, res) => {
  try {
    const connection = await getConnection();
    const query = `
    SELECT DISTINCT USU_ROL.ROL_ID, PER.PER_ID, PER.PER_NOMBRE, PER.PER_APELLIDO, ACA.ACA_ESPECIALIDAD, ACA.ACA_AREA_CONOCIMIENTO FROM FRW_SEGURIDAD_USUARIO USU JOIN FRW_SEGURIDAD_PERSONA PER ON USU.PER_ID = PER.PER_ID JOIN PMO_ADMINISTRACION_ACADEMICO ACA ON USU.ACA_ID = ACA.ACA_ID JOIN FRW_SEGURIDAD_USUARIO_ROL USU_ROL ON USU.USU_ID = USU_ROL.USU_ID JOIN FRW_SEGURIDAD_ROL ROL ON USU_ROL.ROL_ID = ROL.ROL_ID JOIN FRW_SEGURIDAD_ROL_FUNCIONALIDAD ROL_FUN ON ROL.ROL_ID = ROL_FUN.ROL_ID WHERE ROL_FUN.ROL_ID = 4 OR ROL_FUN.ROL_ID = 5; 
    `;
    const [result] = await connection.promise().query(query);
    res.json(result);
  } catch (error) {
    // console.log("Error:", error.message);
    res.status(500).send(error.message);
  }
};

const updateRol = async (req, res) => {
  try {
    const { id, rol } = req.body;
    // console.log(rol);
    // console.log(id);
    if (id == undefined || rol == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }
    // console.log(rol);

    const connection = await getConnection();
    const result = await connection
      .promise()
      .query(
        "UPDATE frw_seguridad_usuario_rol SET ROL_ID = ? WHERE USU_ID = ?",
        [rol, id]
      );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateSolInicial = async (req, res) => {
  try {
    const { id } = req.params;
    const { idEstado, Estado, observacionesModal } = req.body;
    // console.log(rol);
    // console.log(id);
    if (id == undefined) {
      res.status(400).json({
        message: "Mala petición al servidor. Por favor llene todos los campos",
      });
    }
    // console.log(rol);

    const connection = await getConnection();
    const result = await connection
      .promise()
      .query(
        "UPDATE pmo_administracion_solicitud_obra SET SOL_ESTADO = ?, SOL_ESTADO_NOMBRE = ? WHERE SOL_ID = ?",
        [idEstado, Estado, id]
      );

    const observaciones =
      "Estado de la solcitud actualizada a: " + Estado + ". ";
    await connection
      .promise()
      .query(
        "INSERT INTO pmo_administracion_log_solicitud_obra (SOL_ID, LOG_FECHA_ACTUALIZACION, LOG_OBSERVACION) VALUES (?, NOW(), ?)",
        [id, observaciones]
      );

    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.promise().query(
      "DELETE FROM usuarios WHERE id = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const methods = {
  updateSolInicial,
  getUsuariosComiteFiltrado,
  getUsuariosComite,
  borrarEvaluador,
  asignarEvaluadorObra,
  getEvaluadoresComite,
  getEvaluacionesComite,
  getSolicitudesModal,
  getSolicitudesTabla,
  getUsuariosWithRol,
  getEvaluadores,
  getLogSolicitud,
  registrarEvaluadorExterno,
  registrarEvaluadorInterno,
  updateContrasena,
  updateRol,
};
