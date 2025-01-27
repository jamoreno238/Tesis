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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Plantilla from "../../componentes/menu/PlantillaComite.js";
import DetalleModal from "../../componentes/comite/ModalSolicitudes.js";
import { useNavigate } from "react-router-dom";
import { getSolicitudesTabla } from "../../../services/comiteServicios.js";
import "../../../css/asignarPerfiles.css";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

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

const SolicitudesComite = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const navigate = useNavigate(); // Instancia history para redireccionar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSolicitudesTabla();
        setTableData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenLogSolicitud = (row) => {
    const codigo = row.DOC_ID;
    navigate(`/logSolicitudComite?codigo=${codigo}`);
  };

  const handleEstadoFilterChange = (event) => {
    setEstadoFilter(event.target.value);
    setPage(0);
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

              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Evaluador Interno</TableCell>
              <TableCell>Evaluador Externo</TableCell>
              <TableCell>Tercer Evaluador</TableCell>

              <TableCell>Visualizar</TableCell>

              <TableCell>Log Solicitudes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .filter(
                (row) =>
                  estadoFilter === "Todos" ||
                  row.SOL_ESTADO_NOMBRE === estadoFilter
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
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
                      style={{ color: "green" }}
                      onClick={() => handleOpenModal(row)}
                    >
                      <VisibilityIcon />
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
              ))}
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

      {/* Modal para detalles */}
      <DetalleModal
        open={openModal}
        handleClose={handleCloseModal}
        selectedRow={selectedRow}
      />
    </Plantilla>
  );
};

export default SolicitudesComite;
