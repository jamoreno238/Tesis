-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-02-2024 a las 03:46:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `recommendersystem`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frw_seguridad_funcionalidad`
--

CREATE TABLE `frw_seguridad_funcionalidad` (
  `FUN_ID` int(11) NOT NULL,
  `FUN_NOMBRE` varchar(50) NOT NULL,
  `FUN_RUTA` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `frw_seguridad_funcionalidad`
--

INSERT INTO `frw_seguridad_funcionalidad` (`FUN_ID`, `FUN_NOMBRE`, `FUN_RUTA`) VALUES
(1, 'Asignación Perfiles', 'profile'),
(2, 'Crear solicitud de obra', 'request'),
(3, 'Literature Request', 'literatureRequest'),
(4, 'Evaluar', 'evaluator'),
(5, 'Evaluadores', 'evaluators'),
(6, 'Usuario', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frw_seguridad_persona`
--

CREATE TABLE `frw_seguridad_persona` (
  `PER_ID` int(11) NOT NULL,
  `PER_CEDULA` varchar(10) NOT NULL,
  `PER_NOMBRE` varchar(50) NOT NULL,
  `PER_APELLIDO` varchar(50) NOT NULL,
  `PER_CORREO_INSTITUCIONAL` varchar(50) NOT NULL,
  `PER_CORREO_PERSONAL` varchar(50) NOT NULL,
  `PER_TELEFONO_CONVENCIONAL` varchar(50) NOT NULL,
  `PER_TELEFONO_CELULAR` varchar(50) NOT NULL,
  `PER_ESTADO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `frw_seguridad_persona`
--

INSERT INTO `frw_seguridad_persona` (`PER_ID`, `PER_CEDULA`, `PER_NOMBRE`, `PER_APELLIDO`, `PER_CORREO_INSTITUCIONAL`, `PER_CORREO_PERSONAL`, `PER_TELEFONO_CONVENCIONAL`, `PER_TELEFONO_CELULAR`, `PER_ESTADO`) VALUES
(1, '1234567891', 'Sofia', 'Garcia', 'josloko@hotmail.com', 'jamoreno15@espe.edu.ec', '1234567892', '0983582822', 1),
(9, '1748763849', 'Josue', 'Moreno', 'jamoreno15@espe.edu.ec', 'jamoreno15@espe.edu.ec', '2064836', '0998063548', 1),
(10, '1728364836', 'DAVID', 'MORENO', 'davmoreno15@epn.edu.ec', 'davmoreno15@gmail.com', '2036493', '0997856537', 1),
(11, '1728456937', 'FERNANDO', 'NOGUERA', 'lfnoguera@espe.edu.ec', 'lfnoguera@gmail.com', '3046392', '0996757453', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frw_seguridad_rol`
--

CREATE TABLE `frw_seguridad_rol` (
  `ROL_ID` int(11) NOT NULL,
  `ROL_CODIGO` varchar(50) NOT NULL,
  `ROL_NOMBRE` varchar(50) NOT NULL,
  `ROL_DESCRIPCION` varchar(500) NOT NULL,
  `ROL_ESTADO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `frw_seguridad_rol`
--

INSERT INTO `frw_seguridad_rol` (`ROL_ID`, `ROL_CODIGO`, `ROL_NOMBRE`, `ROL_DESCRIPCION`, `ROL_ESTADO`) VALUES
(1, 'SECRETARY', 'Secretaria', 'Rol de secretaria, puede: hacer login, asignar perfil a usuarios y revisar solicitud de obra', 1),
(2, 'COMMITTEE', 'Miembro de comité', 'Rol de miembro de comité, puede: hacer login, ver listado de solicitantes, asignar evaluador interno y externo a solicitud, revisar entrada de datos para el sistema', 1),
(3, 'TEACHER', 'Docente', 'Rol de docente, puede: login en aplicación, realizar solicitud de trámite', 1),
(4, 'INTERNAL_EVALUATOR', 'Evaluador interno', 'Rol de evaluador interno, puede: hacer login, recibir solicitud de obra, descargar información, llenar formulario de informe, enviar informe', 1),
(5, 'EXTERNAL_EVALUATOR', 'Evaluador externo', 'Rol de evaluador externo, puede: hacer login, recibir solicitud de obra, descargar información, llenar formulario de informe, enviar informe', 1),
(6, 'ADMINISTRATOR', 'Administrador', 'Rol de administrador, puede hacer todas las funciones de los otros roles', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frw_seguridad_rol_funcionalidad`
--

CREATE TABLE `frw_seguridad_rol_funcionalidad` (
  `ROL_ID` int(11) NOT NULL,
  `FUN_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `frw_seguridad_rol_funcionalidad`
--

INSERT INTO `frw_seguridad_rol_funcionalidad` (`ROL_ID`, `FUN_ID`) VALUES
(1, 1),
(1, 3),
(1, 6),
(2, 1),
(2, 6),
(3, 2),
(3, 3),
(4, 4),
(4, 5),
(5, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frw_seguridad_usuario`
--

CREATE TABLE `frw_seguridad_usuario` (
  `USU_ID` int(11) NOT NULL,
  `ACA_ID` int(11) NOT NULL,
  `PER_ID` int(11) NOT NULL,
  `USU_USUARIO` varchar(50) NOT NULL,
  `USU_CONTRASENA` varchar(200) NOT NULL,
  `USU_ESTADO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `frw_seguridad_usuario`
--

INSERT INTO `frw_seguridad_usuario` (`USU_ID`, `ACA_ID`, `PER_ID`, `USU_USUARIO`, `USU_CONTRASENA`, `USU_ESTADO`) VALUES
(1, 1, 1, 'secretaria', '$2b$10$LPYmDcCOHGlI36n9TD8BfedjgNe4fBKtuGzFGagvos.JpUbjO4Gvq', 1),
(9, 9, 9, 'jom47', '$2b$10$vmyN9vtQl8hJ/y1U2hzgsOcFQb/w.nOlAPGSz20pmpL/bwruObR9S', 1),
(10, 10, 10, 'dam74', '$2b$10$Pdad6UPyvjHA5a.c.LciX.YcvamCI2WYfuZh.SVgC6PlUKSn1Js4S', 1),
(11, 11, 11, 'fen63', '$2b$10$L.tkwBsqEVutbxgzPWi31O7UqMzqdE4mCZXpCDoMEgDZYD7.8xuM2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frw_seguridad_usuario_rol`
--

CREATE TABLE `frw_seguridad_usuario_rol` (
  `USU_ID` int(11) NOT NULL,
  `ROL_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `frw_seguridad_usuario_rol`
--

INSERT INTO `frw_seguridad_usuario_rol` (`USU_ID`, `ROL_ID`) VALUES
(1, 1),
(9, 3),
(10, 5),
(11, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_academico`
--

CREATE TABLE `pmo_administracion_academico` (
  `ACA_ID` int(11) NOT NULL,
  `ACA_INSTITUCION_LABOR` varchar(50) NOT NULL,
  `ACA_DEPARTAMENTO_UNIDAD` varchar(50) NOT NULL,
  `ACA_AREA_CONOCIMIENTO` varchar(50) NOT NULL,
  `ACA_ESPECIALIDAD` varchar(50) NOT NULL,
  `ACA_TITULO` varchar(50) NOT NULL,
  `ACA_GRADO_ACADEMICO` varchar(50) NOT NULL,
  `ACA_LINEA_INVESTIGACION` varchar(50) DEFAULT NULL,
  `ACA_CARGO` varchar(50) DEFAULT NULL,
  `ACA_ESTADO` int(11) DEFAULT NULL,
  `ACA_ID_ESPE` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `pmo_administracion_academico`
--

INSERT INTO `pmo_administracion_academico` (`ACA_ID`, `ACA_INSTITUCION_LABOR`, `ACA_DEPARTAMENTO_UNIDAD`, `ACA_AREA_CONOCIMIENTO`, `ACA_ESPECIALIDAD`, `ACA_TITULO`, `ACA_GRADO_ACADEMICO`, `ACA_LINEA_INVESTIGACION`, `ACA_CARGO`, `ACA_ESTADO`, `ACA_ID_ESPE`) VALUES
(1, 'ESPE', 'RECURSOS HUMANOS', 'ADMINISTRATIVO', 'ADMINISTRATIVOESPE', 'LIC. ADMINISTRACION DE EMPRESAS', 'PHD', 'ADMINISTRACION', 'SECRETARY', 1, 'L00394023'),
(9, 'ESPE', 'DCCO', 'IA', 'IA', 'ING. SOFTWARE', 'PHD', 'IA', 'DOCENTE', 1, 'L00674653'),
(10, 'EPN', 'DCCO', 'IA', 'IA', 'INGENIERIA', 'PHD', 'IA', 'DOCENTE', 1, ' '),
(11, '1', '1', 'IA', 'IA', 'Ingenieria', 'PHD', 'IA', 'INVESTIGADOR', 1, 'L00394311');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_documento`
--

CREATE TABLE `pmo_administracion_documento` (
  `DOC_ID` int(11) NOT NULL,
  `TIP_ID` int(11) NOT NULL,
  `DOC_TITULO` varchar(100) NOT NULL,
  `DOC_AUTOR` varchar(150) DEFAULT NULL,
  `DOC_ISBN` varchar(50) DEFAULT NULL,
  `DOC_FORMATO` int(11) NOT NULL,
  `DOC_DOCENTE` int(11) NOT NULL,
  `DOC_NUMERO_REGISTRO` varchar(50) DEFAULT NULL,
  `DOC_LUGAR_REGISTRO` varchar(50) DEFAULT NULL,
  `DOC_TIPO_OBRA_SEC` int(11) NOT NULL,
  `DOC_DETALLE` varchar(500) DEFAULT NULL,
  `DOC_LINK` varchar(200) NOT NULL,
  `DOC_NUMERO_HOJAS` int(11) NOT NULL,
  `DOC_FECHA_EMISION` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_evaluacion_obra`
--

CREATE TABLE `pmo_administracion_evaluacion_obra` (
  `EVA_ID` int(11) NOT NULL,
  `DOC_ID` int(11) NOT NULL,
  `EVA_FECHA_ASIGNACION` date NOT NULL,
  `EVA_ESTADO` int(11) NOT NULL,
  `EVA_ESTADO_NOMBRE` varchar(50) NOT NULL,
  `EVA_TIPO` varchar(50) NOT NULL,
  `EVA_EVALUADOR` int(11) NOT NULL,
  `EVA_FECHA_EVALUACION` date DEFAULT NULL,
  `EVA_INFORME` varchar(3000) DEFAULT NULL,
  `EVA_ESTADO_LOGICO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_informe`
--

CREATE TABLE `pmo_administracion_informe` (
  `INF_ID` int(11) NOT NULL,
  `EVA_ID` int(11) NOT NULL,
  `INF_EVALUADOR` int(11) NOT NULL,
  `INF_TIPO` int(11) NOT NULL,
  `INF_INFORME` varchar(3000) DEFAULT NULL,
  `INF_RECOMENDCION` varchar(3000) DEFAULT NULL,
  `INF_ESTADO` int(11) NOT NULL,
  `INF_ESTADO_NOMBRE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_log_solicitud_obra`
--

CREATE TABLE `pmo_administracion_log_solicitud_obra` (
  `LOG_ID` int(11) NOT NULL,
  `SOL_ID` int(11) NOT NULL,
  `LOG_FECHA_ACTUALIZACION` date NOT NULL,
  `LOG_OBSERVACION` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_requisito`
--

CREATE TABLE `pmo_administracion_requisito` (
  `REQ_ID` int(11) NOT NULL,
  `REQ_TIPO` varchar(50) NOT NULL,
  `REQ_VALOR` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `pmo_administracion_requisito`
--

INSERT INTO `pmo_administracion_requisito` (`REQ_ID`, `REQ_TIPO`, `REQ_VALOR`) VALUES
(1, 'A', 'Obra de relevancia de autoría individual o colectiva, revisada por al menos dos pares académicos (recomendable revisión a doble ciego) externos a la institución de educación superior, y que tengan la experticia correspondiente, por un Comité Editorial o experto, o publicada por un Editorial de prestigio'),
(2, 'A', 'En caso de obra colectiva se debe procurar identificar el o los autores o coautor o coautores. Deben estar publicados en editoriales en los que se pueda evidenciar un proceso de calidad en la selección y evaluación de los textos originales (recomendable revisión a doble ciego, por un comité editorial o por un par experto o publicada por una editorial de prestigio)'),
(3, 'A', '¿Posee ISBN o ISSN'),
(4, 'B', '¿Siguió un proceso de revisión por pares?'),
(5, 'B', '¿El congreso, conferencia, seminario dispone de un comité científico u organizador?'),
(6, 'B', 'Posee ISBN'),
(7, 'B', 'Es una publicación completa'),
(8, 'C', '¿Cuenta con un registro de acreditación debidamente legalizado por el servicio nacional de derechos intelectuales SENADI en caso de propiedad industrial nacional o por el organismo competente en caso de propiedad industrial extranjera?'),
(9, 'D', '¿Es una creación o presentación artística en los ámbitos de: artes escénicas, diseño arquitectónico o de objetos, ¿diseños gráficos o conservación y restauración?'),
(10, 'E', '¿Cuenta con la valoración de otra Institución de Educación Superior o dos expertos?');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_solicitud_obra`
--

CREATE TABLE `pmo_administracion_solicitud_obra` (
  `SOL_ID` int(11) NOT NULL,
  `DOC_ID` int(11) NOT NULL,
  `SOL_SECRETARIA` int(11) NOT NULL,
  `SOL_FECHA_CREACION` date NOT NULL,
  `SOL_FECHA_ACTUALIZACION` date DEFAULT NULL,
  `SOL_ESTADO` int(11) NOT NULL,
  `SOL_ESTADO_NOMBRE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pmo_administracion_tipo_obra`
--

CREATE TABLE `pmo_administracion_tipo_obra` (
  `TIP_ID` int(11) NOT NULL,
  `TIP_NOMBRE` varchar(256) NOT NULL,
  `TIP_DESCRIPCION` varchar(2000) DEFAULT NULL,
  `TIP_CATEGORIA` int(11) NOT NULL,
  `TIP_REQUISITOS` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `pmo_administracion_tipo_obra`
--

INSERT INTO `pmo_administracion_tipo_obra` (`TIP_ID`, `TIP_NOMBRE`, `TIP_DESCRIPCION`, `TIP_CATEGORIA`, `TIP_REQUISITOS`) VALUES
(1, 'Libro monográfico', NULL, 0, 'A'),
(2, 'Libros de texto de una asignatura', NULL, 0, 'A'),
(3, 'Artículo arbitrado', NULL, 0, 'A'),
(4, 'Artículo arbitrado indidual', NULL, 0, 'A'),
(5, 'Artículo arbitrado colectivo', NULL, 0, 'A'),
(6, 'Capitulos en libros coordinados', NULL, 0, 'A'),
(7, 'Propiedad industrial', NULL, 0, 'C'),
(8, 'Propiedad artística', NULL, 0, 'D'),
(9, 'Diseños', NULL, 0, 'E'),
(10, 'Diseños de software', NULL, 0, 'E'),
(11, 'prototipos', NULL, 0, 'E'),
(12, 'creaciones u obtenciones vegetales o animales', NULL, 0, 'E'),
(13, 'produccion artistica', NULL, 0, 'D'),
(14, 'Libro individual', NULL, 0, 'A'),
(15, 'Libro colectivo', NULL, 0, 'A'),
(16, 'Libro físico', NULL, 0, 'A'),
(17, 'Libro digital', NULL, 0, 'A'),
(18, 'Capitulo de libro individual', NULL, 0, 'A'),
(19, 'Capitulo de libro colectivo', NULL, 0, 'A'),
(20, 'Parte de un libro coordinado', NULL, 0, 'A'),
(21, 'Contribución presentada en congreso', NULL, 0, 'B'),
(22, 'Contribución presentada en conferencia', NULL, 0, 'B'),
(23, 'Contribución presentada en seminario', NULL, 0, 'B'),
(24, 'Contribución presentada en reunión de relevancia científica', NULL, 0, 'B'),
(25, 'Otras Obras', NULL, 0, 'E'),
(26, 'Producción académica científica', NULL, 1, NULL),
(27, 'Producción académica tecnológica', NULL, 1, NULL),
(28, 'Producción académica de literatura', NULL, 1, NULL),
(29, 'Producción académica de artes', NULL, 1, NULL),
(30, 'Campo de conocimiento interdisciplinario', NULL, 1, NULL),
(31, 'Campo de conocimiento multidisciplinario', NULL, 1, NULL),
(32, 'Campo de conocimiento transdisciplinario', NULL, 1, NULL),
(33, 'Saberes', NULL, 1, NULL),
(34, 'Saberes ancentrales', NULL, 1, NULL),
(35, 'Conocimientos tradicionales', NULL, 1, NULL),
(36, 'Procesos tecnológicos', NULL, 1, NULL),
(37, 'Productos tecnológicos', NULL, 1, NULL),
(38, 'Cultura ', NULL, 1, NULL),
(39, 'Arte', NULL, 1, NULL),
(40, 'Obra Artística', NULL, 1, NULL),
(41, 'Otro', NULL, 1, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `frw_seguridad_funcionalidad`
--
ALTER TABLE `frw_seguridad_funcionalidad`
  ADD PRIMARY KEY (`FUN_ID`);

--
-- Indices de la tabla `frw_seguridad_persona`
--
ALTER TABLE `frw_seguridad_persona`
  ADD PRIMARY KEY (`PER_ID`);

--
-- Indices de la tabla `frw_seguridad_rol`
--
ALTER TABLE `frw_seguridad_rol`
  ADD PRIMARY KEY (`ROL_ID`);

--
-- Indices de la tabla `frw_seguridad_rol_funcionalidad`
--
ALTER TABLE `frw_seguridad_rol_funcionalidad`
  ADD PRIMARY KEY (`ROL_ID`,`FUN_ID`),
  ADD KEY `FK_FRW_SEGURIDAD_ROL_FUNCIONALIDAD2` (`FUN_ID`);

--
-- Indices de la tabla `frw_seguridad_usuario`
--
ALTER TABLE `frw_seguridad_usuario`
  ADD PRIMARY KEY (`USU_ID`),
  ADD KEY `FK_RELATIONSHIP_3` (`ACA_ID`),
  ADD KEY `FK_RELATIONSHIP_4` (`PER_ID`);

--
-- Indices de la tabla `frw_seguridad_usuario_rol`
--
ALTER TABLE `frw_seguridad_usuario_rol`
  ADD PRIMARY KEY (`USU_ID`,`ROL_ID`),
  ADD KEY `FK_FRW_SEGURIDAD_USUARIO_ROL2` (`ROL_ID`);

--
-- Indices de la tabla `pmo_administracion_academico`
--
ALTER TABLE `pmo_administracion_academico`
  ADD PRIMARY KEY (`ACA_ID`);

--
-- Indices de la tabla `pmo_administracion_documento`
--
ALTER TABLE `pmo_administracion_documento`
  ADD PRIMARY KEY (`DOC_ID`),
  ADD KEY `FK_RELATIONSHIP_7` (`TIP_ID`);

--
-- Indices de la tabla `pmo_administracion_evaluacion_obra`
--
ALTER TABLE `pmo_administracion_evaluacion_obra`
  ADD PRIMARY KEY (`EVA_ID`),
  ADD KEY `FK_RELATIONSHIP_6` (`DOC_ID`);

--
-- Indices de la tabla `pmo_administracion_informe`
--
ALTER TABLE `pmo_administracion_informe`
  ADD PRIMARY KEY (`INF_ID`),
  ADD KEY `FK_RELATIONSHIP_5` (`EVA_ID`);

--
-- Indices de la tabla `pmo_administracion_log_solicitud_obra`
--
ALTER TABLE `pmo_administracion_log_solicitud_obra`
  ADD PRIMARY KEY (`LOG_ID`),
  ADD KEY `SOL_ID` (`SOL_ID`);

--
-- Indices de la tabla `pmo_administracion_requisito`
--
ALTER TABLE `pmo_administracion_requisito`
  ADD PRIMARY KEY (`REQ_ID`);

--
-- Indices de la tabla `pmo_administracion_solicitud_obra`
--
ALTER TABLE `pmo_administracion_solicitud_obra`
  ADD PRIMARY KEY (`SOL_ID`),
  ADD KEY `FK_RELATIONSHIP_8` (`DOC_ID`);

--
-- Indices de la tabla `pmo_administracion_tipo_obra`
--
ALTER TABLE `pmo_administracion_tipo_obra`
  ADD PRIMARY KEY (`TIP_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `frw_seguridad_persona`
--
ALTER TABLE `frw_seguridad_persona`
  MODIFY `PER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `frw_seguridad_usuario`
--
ALTER TABLE `frw_seguridad_usuario`
  MODIFY `USU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_academico`
--
ALTER TABLE `pmo_administracion_academico`
  MODIFY `ACA_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_documento`
--
ALTER TABLE `pmo_administracion_documento`
  MODIFY `DOC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_evaluacion_obra`
--
ALTER TABLE `pmo_administracion_evaluacion_obra`
  MODIFY `EVA_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_informe`
--
ALTER TABLE `pmo_administracion_informe`
  MODIFY `INF_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_log_solicitud_obra`
--
ALTER TABLE `pmo_administracion_log_solicitud_obra`
  MODIFY `LOG_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_solicitud_obra`
--
ALTER TABLE `pmo_administracion_solicitud_obra`
  MODIFY `SOL_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `frw_seguridad_rol_funcionalidad`
--
ALTER TABLE `frw_seguridad_rol_funcionalidad`
  ADD CONSTRAINT `FK_FRW_SEGURIDAD_ROL_FUNCIONALIDAD` FOREIGN KEY (`ROL_ID`) REFERENCES `frw_seguridad_rol` (`ROL_ID`),
  ADD CONSTRAINT `FK_FRW_SEGURIDAD_ROL_FUNCIONALIDAD2` FOREIGN KEY (`FUN_ID`) REFERENCES `frw_seguridad_funcionalidad` (`FUN_ID`);

--
-- Filtros para la tabla `frw_seguridad_usuario`
--
ALTER TABLE `frw_seguridad_usuario`
  ADD CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`ACA_ID`) REFERENCES `pmo_administracion_academico` (`ACA_ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_4` FOREIGN KEY (`PER_ID`) REFERENCES `frw_seguridad_persona` (`PER_ID`);

--
-- Filtros para la tabla `frw_seguridad_usuario_rol`
--
ALTER TABLE `frw_seguridad_usuario_rol`
  ADD CONSTRAINT `FK_FRW_SEGURIDAD_USUARIO_ROL` FOREIGN KEY (`USU_ID`) REFERENCES `frw_seguridad_usuario` (`USU_ID`),
  ADD CONSTRAINT `FK_FRW_SEGURIDAD_USUARIO_ROL2` FOREIGN KEY (`ROL_ID`) REFERENCES `frw_seguridad_rol` (`ROL_ID`);

--
-- Filtros para la tabla `pmo_administracion_documento`
--
ALTER TABLE `pmo_administracion_documento`
  ADD CONSTRAINT `FK_RELATIONSHIP_7` FOREIGN KEY (`TIP_ID`) REFERENCES `pmo_administracion_tipo_obra` (`TIP_ID`);

--
-- Filtros para la tabla `pmo_administracion_evaluacion_obra`
--
ALTER TABLE `pmo_administracion_evaluacion_obra`
  ADD CONSTRAINT `FK_RELATIONSHIP_6` FOREIGN KEY (`DOC_ID`) REFERENCES `pmo_administracion_documento` (`DOC_ID`);

--
-- Filtros para la tabla `pmo_administracion_informe`
--
ALTER TABLE `pmo_administracion_informe`
  ADD CONSTRAINT `FK_RELATIONSHIP_5` FOREIGN KEY (`EVA_ID`) REFERENCES `pmo_administracion_evaluacion_obra` (`EVA_ID`);

--
-- Filtros para la tabla `pmo_administracion_log_solicitud_obra`
--
ALTER TABLE `pmo_administracion_log_solicitud_obra`
  ADD CONSTRAINT `pmo_administracion_log_solicitud_obra_ibfk_1` FOREIGN KEY (`SOL_ID`) REFERENCES `pmo_administracion_solicitud_obra` (`SOL_ID`);

--
-- Filtros para la tabla `pmo_administracion_solicitud_obra`
--
ALTER TABLE `pmo_administracion_solicitud_obra`
  ADD CONSTRAINT `FK_RELATIONSHIP_8` FOREIGN KEY (`DOC_ID`) REFERENCES `pmo_administracion_documento` (`DOC_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
