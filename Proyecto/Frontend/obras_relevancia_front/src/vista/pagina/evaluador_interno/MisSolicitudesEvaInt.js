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
import DescriptionIcon from "@mui/icons-material/Description";
import Plantilla from "../../componentes/menu/PlantillaEvaInt.js";
import ModalEvaluacionesInt from "../../componentes/evaluadorInterno/ModalEvaluacionesInt.js";
import { Link, useNavigate } from "react-router-dom";
import { getEvaluacionesEvaluadorInterno } from "../../../services/evaluadorInternoServicios";
import "../../../css/asignarPerfiles.css";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const MisSolicitudesEvaInt = () => {
  const title = "MIS EVALUACIONES";
  const [data, setData] = useState([]);
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
      
        const token = Cookies.get("token");
  let userType = null;
  if (token) {
    const decodedToken = decodeToken(token);
        userType = decodedToken && decodedToken.userType ? decodedToken.userType : null;
    console.log(decodedToken.idUsuario);
    const result = await getEvaluacionesEvaluadorInterno(decodedToken.idUsuario);
    setTableData(result.data);
  }
       // console.log("Data from API:", JSON.stringify(result.data, null, 2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [/*codigo*/]);

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

  const handleDocumentoClick = (row) => {
    if (row.EVA_ESTADO_NOMBRE !== "Asignado") {
      alert("Evaluación Realizada");
    } else {
      const codigo = row.DOC_ID;
      const tipo_req = row.TIP_REQUISITOS;
      navigate(`/evaluarSolicutd?codigo=${codigo}&tipo_req=${tipo_req}`);
    }
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
          <MenuItem value="Asignado">Asignado</MenuItem>
          <MenuItem value="Aceptado">Aceptado</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
          <MenuItem value="Eliminado">Eliminado</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Titulo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Evaluación</TableCell>
              <TableCell>Visualizar</TableCell>
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
                <TableRow key={row.DOC_ID}>
                  <TableCell>{row.DOC_ID}</TableCell>
                  <TableCell>{row.DOC_TITULO}</TableCell>
                  <TableCell>{row.EVA_ESTADO_NOMBRE}</TableCell>
                  <TableCell>{row.EVA_TIPO}</TableCell>
                  
                  <TableCell>
                    <IconButton
                      style={{ color: "blue" }}
                      onClick={() => handleDocumentoClick(row)}
                    >
                      <DescriptionIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      style={{ color: "green" }}
                      onClick={() => handleOpenModal(row)}
                    >
                      <VisibilityIcon />
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
      <ModalEvaluacionesInt
        open={openModal}
        handleClose={handleCloseModal}
        selectedRow={selectedRow}
      />
    </Plantilla>
  );
};

export default MisSolicitudesEvaInt;
