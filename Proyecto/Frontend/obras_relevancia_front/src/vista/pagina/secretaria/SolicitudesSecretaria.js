import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Chip } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import StarIcon from "@mui/icons-material/Star";
import Plantilla from "../../componentes/menu/PlantillaSecretaria.js";
import DetalleModal from "../../componentes/secretaria/ModalSolicitudes";
import CalificacionInicialModal from "../../componentes/secretaria/ModalCalificarInicial";
import { useNavigate } from "react-router-dom";
import { getSolicitudesTabla } from "../../../services/secretariaServicios";
import "../../../css/asignarPerfiles.css";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import jsPDF from "jspdf";
import "jspdf-autotable";

const token = Cookies.get("token");

let nombre = null;
let apellido = null;
if (token) {
  const decodedToken = decodeToken(token);

  nombre = decodedToken && decodedToken.nombre ? decodedToken.nombre : null;
  apellido =
    decodedToken && decodedToken.apellido ? decodedToken.apellido : null;
}
const title = "Solicitudes - " + nombre + " " + apellido;

const SolicitudesSecretaria = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openevalInicial, setOpenevalInicial] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const [filteredData, setFilteredData] = useState([]); // Modificación: Nuevo estado para los datos filtrados
  const navigate = useNavigate(); // Instancia history para redireccionar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSolicitudesTabla();
        setTableData(result.data);
        setFilteredData(result.data); // Modificación: Establecer los datos filtrados inicialmente
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateTable = async () => {
    try {
      const result = await getSolicitudesTabla();
      setTableData(result.data);
      setFilteredData(result.data); // Modificación: Actualizar también los datos filtrados
    } catch (error) {
      console.error("Error updating table data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const startIdx = newPage * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    setFilteredData(tableData.slice(startIdx, endIdx)); // Modificación: Actualizar datos filtrados al cambiar de página
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    const startIdx = 0;
    const endIdx = rowsPerPage;
    setFilteredData(tableData.slice(startIdx, endIdx)); // Modificación: Actualizar datos filtrados al cambiar de filas por página
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenevalInicial = (row) => {
    setSelectedRow(row);
    setOpenevalInicial(true);
  };

  const handleOpenLogSolicitud = (row) => {
    const codigo = row.DOC_ID;
    navigate(`/logSolicitudSecretaria?codigo=${codigo}`);
  };

  const handleDocumentoClick = (row) => {
    if (row.SOL_ESTADO_NOMBRE === "Creado") {
      window.alert(
        "Antes de asignar un evaluador debes verificar su información y cambiar de estado a Tramite"
      );
      return;
    }
    const codigo = row.DOC_ID;
    navigate(`/evaluacionSecretaria?codigo=${codigo}`);
  };

  const handleEstadoFilterChange = (event) => {
    setEstadoFilter(event.target.value);
    setPage(0);
    const filteredTableData = tableData.filter(
      (row) =>
        event.target.value === "Todos" ||
        row.SOL_ESTADO_NOMBRE === event.target.value
    );
    setFilteredData(filteredTableData); // Modificación: Filtrar y actualizar los datos filtrados
  };

  let nombreArchivo = "";

  const generarPDF = async () => {
    const doc = new jsPDF();

    // Establecer el tamaño de la página y los márgenes
    const margin = 10;
    const width = doc.internal.pageSize.getWidth() - 2 * margin;
    const height = doc.internal.pageSize.getHeight() - 2 * margin;

    let currentY = margin;
    let currentPage = 1; // Página actual

    // Función para agregar texto dentro del borde
    const addText = (text, x, y, options = {}) => {
      const defaultOptions = { align: "left" };
      const { align } = { ...defaultOptions, ...options };
      const textWidth =
        (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      if (align === "center") {
        doc.text(text, x + (width - textWidth) / 2, y);
      } else {
        doc.text(text, x, y);
      }
    };

    // Función para agregar el pie de página con la fecha de evaluación
    const addFooter = () => {
      const currentDate = new Date().toLocaleDateString();
      const footerText = `Fecha de Evaluación: ${currentDate}`;

      doc.setLineWidth(1);
      doc.setDrawColor(0); // Color negro
      doc.line(
        margin + 10,
        height - margin - 5,
        width - 10,
        height - margin - 5
      ); // Línea horizontal
      addText(footerText, margin + 10, height - 10);
    };
    currentY += 15;

    // Función para verificar si es necesario agregar una nueva página y dibujar el encabezado
    const didDrawPage = () => {
      currentPage++; // Aumentar el número de página
      addFooter(); // Agregar el pie de página
      currentY = margin; // Reiniciar la posición Y para dibujar en la nueva página
      addText("LISTADO DE SOLICITUDES", margin, currentY + 10, {
        align: "center",
      }); // Agregar el título centrado en la nueva página
      currentY += 15; // Incrementar la posición Y para la siguiente línea de contenido
    };

    // Convertir la tabla a un arreglo de datos
    const tableDataArray = filteredData.map((row) => {
      const fechaCreacion = new Date(row.SOL_FECHA_CREACION);
      const fechaFormateada = fechaCreacion.toISOString().split("T")[0];

      return [
        // Modificación: Usar datos filtrados
        row.SOL_ID,
        row.DOC_AUTOR,
        row.SOL_ESTADO_NOMBRE,
        fechaFormateada, // Usar la fecha formateada
        row.EVA_ESTADO_NOMBRE_INTERNA !== null
          ? row.EVA_ESTADO_NOMBRE_INTERNA
          : "No asignado",
        row.EVA_ESTADO_NOMBRE_EXTERNA !== null
          ? row.EVA_ESTADO_NOMBRE_EXTERNA
          : "No asignado",
        row.EVA_ESTADO_NOMBRE_TERCERO !== null
          ? row.EVA_ESTADO_NOMBRE_TERCERO
          : "No asignado",
      ];
    });

    // Definir las opciones de la tabla
    const options = {
      startY: currentY + 10,
      margin: { left: margin, top: margin },
      headStyles: { fillColor: "#457666", textColor: "#fff" }, // Cambiado a texto blanco
      bodyStyles: { textColor: "#000" },
      theme: "grid",
      styles: { overflow: "linebreak" },
      columnStyles: {
        0: { cellWidth: 25 }, // Aumenta el ancho de la primera columna
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 },
        7: { cellWidth: 10 },
        8: { cellWidth: 10 },
        9: { cellWidth: 25 },
      },
      didDrawPage: didDrawPage, // Agregar la función didDrawPage
    };

    // Agregar la tabla al documento
    doc.autoTable({
      head: [
        [
          "Codigo",
          "Coautores",
          "Estado",
          "Fecha de Creación",
          "Evaluador Interno",
          "Evaluador Externo",
          "Tercer Evaluador",
        ],
      ],
      body: tableDataArray,
      ...options,
    });

    const currentDate = new Date().toISOString().slice(0, 10);
    nombreArchivo = `${currentDate}-Solicitudes.pdf`;
    // Guardar el documento
    doc.save(nombreArchivo);
  };

  const handleClosevalInicial = async () => {
    setOpenevalInicial(false);
    await handleUpdateTable();
  };

  return (
    <Plantilla title={title}>
      <FormControl>
        <InputLabel id="estado-filter-label">Filtrar por Estado</InputLabel>
        <Select
          labelId="estado-filter-label"
          id="estado-filter"
          value={estadoFilter}
          label="Filtrar por Estado"
          onChange={handleEstadoFilterChange}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Creado">Creado</MenuItem>
          <MenuItem value="Tramite">Tramite</MenuItem>
          <MenuItem value="Devuelto">Devuelto</MenuItem>
          <MenuItem value="Evaluando">Evaluando</MenuItem>
          <MenuItem value="Aceptado">Aceptado</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Coautores</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Evaluador Interno</TableCell>
              <TableCell>Evaluador Externo</TableCell>
              <TableCell>Tercer Evaluador</TableCell>
              <TableCell>Evaluación</TableCell>
              <TableCell>Visualizar</TableCell>
              <TableCell>Evaluar</TableCell>
              <TableCell>Log Solicitudes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(
              (
                row // Modificación: Usar datos filtrados
              ) => (
                <TableRow key={row.SOL_ID}>
                  <TableCell>{row.SOL_ID}</TableCell>
                  <TableCell>{row.DOC_AUTOR}</TableCell>
                  <TableCell>{row.SOL_ESTADO_NOMBRE}</TableCell>
                  <TableCell>
                    {(() => {
                      const fechaCreacion = new Date(row.SOL_FECHA_CREACION);
                      const fechaFormateada = fechaCreacion
                        .toISOString()
                        .split("T")[0];
                      return fechaFormateada;
                    })()}
                  </TableCell>
                  <TableCell>
                    {row.EVA_ESTADO_NOMBRE_INTERNA !== null
                      ? row.EVA_ESTADO_NOMBRE_INTERNA
                      : "No asignado"}
                  </TableCell>
                  <TableCell>
                    {row.EVA_ESTADO_NOMBRE_EXTERNA !== null
                      ? row.EVA_ESTADO_NOMBRE_EXTERNA
                      : "No asignado"}
                  </TableCell>
                  <TableCell>
                    {row.EVA_ESTADO_NOMBRE_TERCERO !== null
                      ? row.EVA_ESTADO_NOMBRE_TERCERO
                      : "No asignado"}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      style={{ color: "blue" }}
                      onClick={() => handleDocumentoClick(row)}
                    >
                      <DescriptionIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      style={{ color: "green" }}
                      onClick={() => handleOpenModal(row)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      style={{ color: "green" }}
                      onClick={() => handleOpenevalInicial(row)}
                    >
                      <StarIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      style={{ color: "black" }}
                      onClick={() => handleOpenLogSolicitud(row)}
                    >
                      <ManageSearchIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Chip
        sx={{ marginTop: 1, marginLeft: 2, padding: 2 }}
        icon={<PictureAsPdfIcon />}
        label="Descargar"
        color="error"
        onClick={generarPDF}
      />
      {/* Modal para detalles */}
      <DetalleModal
        open={openModal}
        handleClose={handleCloseModal}
        selectedRow={selectedRow}
      />

      <CalificacionInicialModal
        open={openevalInicial}
        handleClose={handleClosevalInicial}
        selectedRow={selectedRow}
      />
    </Plantilla>
  );
};

export default SolicitudesSecretaria;
