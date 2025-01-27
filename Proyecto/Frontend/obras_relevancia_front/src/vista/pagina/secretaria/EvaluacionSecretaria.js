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
  Button,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import Plantilla from "../../componentes/menu/PlantillaSecretaria.js";
import { useNavigate } from "react-router-dom";
import { getEvaluacionesSecretaria } from "../../../services/secretariaServicios";
import { getLinkEvaluaciones } from "../../../services/secretariaServicios";
import { deleteEvaluadorEvaluaciones } from "../../../services/secretariaServicios";
import "../../../css/asignarPerfiles.css";
import { useLocation } from "react-router-dom";
import AsignarEvaluador from "../../componentes/secretaria/AsignarEvaluador";
import DialogoBorrarEva from "../../componentes/secretaria/DialogoBorrarEva";
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
const title = "Solicitudes -  " + nombre + " " + apellido;

const EvaluacionSecretaria = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenDelete, setModalOpenDelete] = useState(false);
  const [evaluadorToDelete, setEvaluadorToDelete] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codigo = searchParams.get("codigo");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("codigo: ", codigo);
        const result = await getEvaluacionesSecretaria(codigo);
        setTableData(result.data);
        // console.log("Data from API:", JSON.stringify(result.data, null, 2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [codigo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = async () => {
    await setModalOpen(false);
    await handleUpdateTable();
  };

  const handleEliminar = (row) => {
    if (row.EVA_ESTADO_NOMBRE !== "Asignado") {
      alert("No se puede eliminar un Evaluador que ya ha calificado");
      return;
    }

    setEvaluadorToDelete(row);
    setModalOpenDelete(true); // Abre el modal de confirmación
  };

  const handleVerReporte = async (row) => {
    if(row.EVA_ESTADO_NOMBRE === "Asignado"){
      window.alert("El evaluador aun no ah calificado.");
      return;
    }
    const resultadoLink = await getLinkEvaluaciones(row.EVA_ID);
    const infLink = resultadoLink.data[0].INF_LINK;
    window.open(`${apiUrl}/api/pdfEvaluaciones/${infLink}`, "_blank");
  };

  const handleAcceptDelete = async () => {
    try {
      if (evaluadorToDelete) {
        await deleteEvaluadorEvaluaciones(evaluadorToDelete.EVA_ID);
        await handleUpdateTable(); // Espera a que se complete la actualización
      }
      setEvaluadorToDelete(null);
      setModalOpenDelete(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const handleCancelDelete = () => {
    setEvaluadorToDelete(null);
    setModalOpenDelete(false);
  };

  const handleDocumentoClick = (row) => {
    const codigo = row.DOC_ID;
    navigate(`/evaluacionSecretaria?codigo=${codigo}`);
  };

  const handleEstadoFilterChange = (event) => {
    setEstadoFilter(event.target.value);
    setPage(0);
  };
  const handleUpdateTable = async () => {
    try {
      const result = await getEvaluacionesSecretaria(codigo);
      setTableData(result.data);
    } catch (error) {
      console.error("Error updating table data:", error);
    }
  };

  return (
    <Plantilla title={title}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          + Nueva
        </Button>
        <div style={{ marginLeft: "10px" }}></div>
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
            <MenuItem value="Aceptado">Aceptado</MenuItem>
            <MenuItem value="Evaluando">Evaluando</MenuItem>
            <MenuItem value="Rechazado">Rechazado</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Código Documento</TableCell>
              <TableCell>Evaluador</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Reporte</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .filter(
                (row) =>
                  estadoFilter === "Todos" ||
                  row.EVA_ESTADO_NOMBRE === estadoFilter
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.EVA_ID}>
                  <TableCell>{row.DOC_ID}</TableCell>
                  <TableCell>
                    {row.PER_NOMBRE + " " + row.PER_APELLIDO}
                  </TableCell>
                  <TableCell>{row.ACA_ESPECIALIDAD}</TableCell>
                  <TableCell>{row.ACA_AREA_CONOCIMIENTO}</TableCell>
                  <TableCell>{row.EVA_ESTADO_NOMBRE}</TableCell>
                  <TableCell>{row.EVA_TIPO}</TableCell>
                  <TableCell>
                    <IconButton
                      style={{ color: "blue" }}
                      onClick={() => handleVerReporte(row)}
                    >
                      <ReportIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => handleEliminar(row)}
                    >
                      <DeleteIcon />
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
      <AsignarEvaluador
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tableDataEva={tableData}
      />
      <DialogoBorrarEva
        isOpen={isModalOpenDelete}
        onAccept={handleAcceptDelete}
        onCancel={handleCancelDelete}
        evaluador={evaluadorToDelete}
      />
    </Plantilla>
  );
};

export default EvaluacionSecretaria;
