import { getConnection } from "./../database/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateRandomPassword } from "../utils/passwordUtils"; // Necesitarás una función para generar contraseñas aleatorias
import { sendPasswordEmail } from "../utils/emailUtils";

const secretKey = process.env.SECRET_KEY;

const loginUsuario = async (req, res) => {
  try {
    const { usu_usuario, usu_contrasena } = req.body;

    if (!usu_usuario || !usu_contrasena) {
      return res.status(400).json({ message: "Credenciales incompletas" });
    }

    const connection = await getConnection();
    const [result] = await connection
      .promise()
      .query(
        "SELECT u.USU_ID, u.USU_USUARIO, u.USU_CONTRASENA, ur.ROL_ID, r.ROL_NOMBRE, p.PER_NOMBRE, p.PER_APELLIDO " +
          "FROM FRW_SEGURIDAD_USUARIO u " +
          "JOIN FRW_SEGURIDAD_USUARIO_ROL ur ON u.USU_ID = ur.USU_ID " +
          "JOIN FRW_SEGURIDAD_ROL r ON ur.ROL_ID = r.ROL_ID " +
          "JOIN FRW_SEGURIDAD_PERSONA p ON u.PER_ID = p.PER_ID " +
          "WHERE u.USU_USUARIO = ?",
        usu_usuario
      );

    if (result.length === 0) {
      return res.status(401).json({ message: "Error de tamaño" });
    }

    const usuario = result[0];

    const passwordMatch = await bcrypt.compare(
      usu_contrasena,
      usuario.USU_CONTRASENA
    );
    // console.log("usuario:", JSON.stringify(usuario.ROL_NOMBRE));
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciales inválidas" });
    } else {
      const token = jwt.sign(
        { userType: usuario.ROL_NOMBRE, idUsuario: usuario.USU_ID, nombre: usuario.PER_NOMBRE, apellido: usuario.PER_APELLIDO },
        secretKey,
        { expiresIn: "1h" }
      );
      // console.log("TOKEN DEL BACK USUARIOS:", JSON.stringify(token));
      return res.status(200).json({ success: true, token: token });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const registrarse = async (req, res) => {
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

    const hashedPassword = await bcrypt.hash(contrasena, 10);

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
      ROL_ID: 3,
    };

    const connection = await getConnection();

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

const recuperarContrasena = async (req, res) => {
  try {
    const { correoElectronico } = req.body;

    // Verifica si el correo electrónico existe en la tabla FRW_SEGURIDAD_PERSONA
    const connection = await getConnection();

    const [result] = await connection
      .promise()
      .query(
        "SELECT * FROM FRW_SEGURIDAD_PERSONA WHERE PER_CORREO_INSTITUCIONAL = ? OR PER_CORREO_PERSONAL = ?",
        [correoElectronico, correoElectronico]
      );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Correo electrónico no encontrado" });
    }

    // Obtener el PER_ID del usuario encontrado
    const perId = result[0].PER_ID;

    // Genera una nueva contraseña aleatoria
    const nuevaContrasena = generateRandomPassword(); // Necesitas implementar esta función

    // Hashea la nueva contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

    // Actualiza la contraseña en la tabla FRW_SEGURIDAD_USUARIO
    await connection
      .promise()
      .query(
        "UPDATE FRW_SEGURIDAD_USUARIO SET USU_CONTRASENA = ? WHERE PER_ID = ?",
        [hashedPassword, perId]
      );

    // Envía la nueva contraseña al correo electrónico del usuario
    await sendPasswordEmail(correoElectronico, nuevaContrasena); // Necesitas implementar esta función

    return res.status(200).json({
      message:
        "Se ha enviado una nueva contraseña al correo electrónico proporcionado" +
        correoElectronico,
    });
  } catch (error) {
    console.error("Error en el método 'recuperarContrasena':", error);
    return res
      .status(500)
      .json({ message: "Hubo un error al procesar la solicitud" });
  }
};

export const methods = {
  loginUsuario,
  registrarse,
  recuperarContrasena,
};
