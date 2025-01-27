-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-02-2024 a las 02:59:02
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


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frw_seguridad_rol_funcionalidad`
--

CREATE TABLE `frw_seguridad_rol_funcionalidad` (
  `ROL_ID` int(11) NOT NULL,
  `FUN_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


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
-- Estructura de tabla para la tabla `frw_seguridad_usuario_rol`
--

CREATE TABLE `frw_seguridad_usuario_rol` (
  `USU_ID` int(11) NOT NULL,
  `ROL_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


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
  MODIFY `PER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `frw_seguridad_usuario`
--
ALTER TABLE `frw_seguridad_usuario`
  MODIFY `USU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_academico`
--
ALTER TABLE `pmo_administracion_academico`
  MODIFY `ACA_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_documento`
--
ALTER TABLE `pmo_administracion_documento`
  MODIFY `DOC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_evaluacion_obra`
--
ALTER TABLE `pmo_administracion_evaluacion_obra`
  MODIFY `EVA_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_informe`
--
ALTER TABLE `pmo_administracion_informe`
  MODIFY `INF_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_log_solicitud_obra`
--
ALTER TABLE `pmo_administracion_log_solicitud_obra`
  MODIFY `LOG_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pmo_administracion_solicitud_obra`
--
ALTER TABLE `pmo_administracion_solicitud_obra`
  MODIFY `SOL_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

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
