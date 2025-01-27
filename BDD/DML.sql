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
-- Volcado de datos para la tabla `frw_seguridad_persona`
--

INSERT INTO `frw_seguridad_persona` (`PER_ID`, `PER_CEDULA`, `PER_NOMBRE`, `PER_APELLIDO`, `PER_CORREO_INSTITUCIONAL`, `PER_CORREO_PERSONAL`, `PER_TELEFONO_CONVENCIONAL`, `PER_TELEFONO_CELULAR`, `PER_ESTADO`) VALUES
(1, '1234567891', 'Sofia', 'Garcia', 'josloko@hotmail.com', 'jamoreno15@espe.edu.ec', '1234567892', '0983582822', 1),
(2, '1748763849', 'Josue', 'Moreno', 'jamoreno15@espe.edu.ec', 'jamoreno15@espe.edu.ec', '2064836', '0998063548', 1),
(3, '1728364836', 'DAVID', 'MORENO', 'davmoreno15@epn.edu.ec', 'davmoreno15@gmail.com', '2036493', '0997856537', 1),
(4, '1728456937', 'FERNANDO', 'NOGUERA', 'lfnoguera@espe.edu.ec', 'lfnoguera@gmail.com', '3046392', '0996757453', 1);

-- --------------------------------------------------------

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

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `pmo_administracion_academico`
--

INSERT INTO `pmo_administracion_academico` (`ACA_ID`, `ACA_INSTITUCION_LABOR`, `ACA_DEPARTAMENTO_UNIDAD`, `ACA_AREA_CONOCIMIENTO`, `ACA_ESPECIALIDAD`, `ACA_TITULO`, `ACA_GRADO_ACADEMICO`, `ACA_LINEA_INVESTIGACION`, `ACA_CARGO`, `ACA_ESTADO`, `ACA_ID_ESPE`) VALUES
(1, 'ESPE', 'RECURSOS HUMANOS', 'ADMINISTRATIVO', 'ADMINISTRATIVOESPE', 'LIC. ADMINISTRACION DE EMPRESAS', 'PHD', 'ADMINISTRACION', 'SECRETARY', 1, 'L00394023'),
(2, 'ESPE', 'DCCO', 'IA', 'IA', 'ING. SOFTWARE', 'PHD', 'IA', 'DOCENTE', 1, 'L00674653'),
(3, 'EPN', 'DCCO', 'IA', 'IA', 'INGENIERIA', 'PHD', 'IA', 'DOCENTE', 1, ' '),
(4, '1', '1', 'IA', 'IA', 'Ingenieria', 'PHD', 'IA', 'INVESTIGADOR', 1, 'L00394311');

-- --------------------------------------------------------


--
-- Volcado de datos para la tabla `frw_seguridad_usuario`
--

INSERT INTO `frw_seguridad_usuario` (`USU_ID`, `ACA_ID`, `PER_ID`, `USU_USUARIO`, `USU_CONTRASENA`, `USU_ESTADO`) VALUES
(1, 1, 1, 'secretaria', '$2b$10$LPYmDcCOHGlI36n9TD8BfedjgNe4fBKtuGzFGagvos.JpUbjO4Gvq', 1),
(2, 2, 2, 'jom47', '$2b$10$vmyN9vtQl8hJ/y1U2hzgsOcFQb/w.nOlAPGSz20pmpL/bwruObR9S', 1),
(3, 3, 3, 'dam74', '$2b$10$Pdad6UPyvjHA5a.c.LciX.YcvamCI2WYfuZh.SVgC6PlUKSn1Js4S', 1),
(4, 4, 4, 'fen63', '$2b$10$L.tkwBsqEVutbxgzPWi31O7UqMzqdE4mCZXpCDoMEgDZYD7.8xuM2', 1);


--
-- Volcado de datos para la tabla `frw_seguridad_usuario_rol`
--

INSERT INTO `frw_seguridad_usuario_rol` (`USU_ID`, `ROL_ID`) VALUES
(1, 1),
(2, 3),
(3, 5),
(4, 4);


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

