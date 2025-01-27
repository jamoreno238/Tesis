import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import Plantilla from "../../componentes/menu/PlantillaDocente.js";
import "../../../css/asignarPerfiles.css";
import DescriptionIcon from "@mui/icons-material/Description";
import ModalCrearSolicitud from "../../componentes/docente/ModalCrearSolicitud.js";
import ModalVerSolicitud from "../../componentes/docente/ModalVerSolicitud.js";
import { obtenerSolicitudesUsuID } from "../../../services/docenteServicios.js";
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const token = Cookies.get("token");
let idUsuario = null;
let nombre = null;
let apellido = null;
if (token) {
  const decodedToken = decodeToken(token);
  idUsuario =
    decodedToken && decodedToken.idUsuario ? decodedToken.idUsuario : null;
  nombre = decodedToken && decodedToken.nombre ? decodedToken.nombre : null;
  apellido =
    decodedToken && decodedToken.apellido ? decodedToken.apellido : null;
}
const title = "Solicitudes de " + nombre + " " + apellido;

const Solicitudes = () => {
  const estadoSolicitud = [
    "Todos",
    "Creado",
    "Evaluando",
    "Aceptado",
    "Rechazado",
  ];
  const [selectedEstadoSolicitud, setSelectedEstadoSolicitud] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCrearSolicitud, setOpenCrearSolicitud] = useState(false);
  const [openVerSolicitud, setOpenVerSolicitud] = useState(false);
  const [selectedDocID, setSelectedDocID] = useState(null);
  const navigate = useNavigate(); 

  const handleDocumentoClick = (row) => {

    const codigo = row.DOC_ID;
    navigate(`/reporteDocente?codigo=${codigo}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Id usuario: ", idUsuario);
        const result = await obtenerSolicitudesUsuID(idUsuario);
        if (result) {
          setTableData(result.data);
          setData(result.data);
        } else {
          console.error("Error: Result is undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterDataByType = (selectedType) => {
    if (selectedType === "Todos") {
      setData(tableData);
    } else {
      const filteredData = tableData.filter(
        (row) => row.SOL_ESTADO_NOMBRE === selectedType
      );
      setData(filteredData);
    }
  };

  const handleSolicitudChange = (event) => {
    setSelectedEstadoSolicitud(event.target.value);
    filterDataByType(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenCrearSolicitud = () => {
    setOpenCrearSolicitud(true);
  };

  const handleCloseCrearSolicitud = () => {
    setOpenCrearSolicitud(false);
  };

  const handleOpenVerSolicitud = (row) => {
    setSelectedDocID(row.DOC_ID);
    // console.log("Datos de servicio: " + JSON.stringify(row));
    // console.log("DOC_ID " + JSON.stringify(row.DOC_ID));
    setOpenVerSolicitud(true);
  };

  const handleCloseVerSolicitud = () => {
    setOpenVerSolicitud(false);
  };

  return (
    <Plantilla title={title}>
      <Button
        variant="contained"
        onClick={handleOpenCrearSolicitud}
        sx={{
          width: "20%",
          marginTop: "1%",
          bgcolor: "#457666",
          color: "white",
          marginBottom: "1%",
          "&:hover": {
            bgcolor: "white",
            color: "#457666",
          },
        }}
      >
        Nueva Solicitud
      </Button>

      <FormControl
        fullWidth
        sx={{ mt: 2, marginBottom: 2, marginRight: "80%" }}
      >
        <InputLabel id="solicitud-select-label">Estado Solicitud</InputLabel>
        <Select
          labelId="solicitud-select-label"
          id="solicitud-select"
          value={selectedEstadoSolicitud}
          onChange={handleSolicitudChange}
          label="Estado Solicitud"
        >
          {estadoSolicitud.map((solicitud) => (
            <MenuItem key={solicitud} value={solicitud}>
              {solicitud}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Código de Solicitud</TableCell>
              <TableCell>Autor Solicitante</TableCell>
              <TableCell>Título de la Obra</TableCell>
              <TableCell>Fecha de actualización</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Reporte</TableCell>
              <TableCell>Visualizar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.SOL_ID}>
                  <TableCell>{row.SOL_ID}</TableCell>
                  <TableCell>
                    {row.PER_NOMBRE} {row.PER_APELLIDO}
                  </TableCell>
                  <TableCell>{row.DOC_TITULO}</TableCell>
                  <TableCell>{new Date(row.SOL_FECHA_ACTUALIZACION).toLocaleDateString()}</TableCell>
                  <TableCell>{row.SOL_ESTADO_NOMBRE}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      style={{ color: "blue" }}
                      onClick={() => handleDocumentoClick(row)}
                    >
                      <DescriptionIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenVerSolicitud(row)}
                      style={{ color: "green" }}
                    >
                      <PreviewIcon />
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
      <ModalCrearSolicitud
        isOpen={openCrearSolicitud}
        onClose={handleCloseCrearSolicitud}
      />
      <ModalVerSolicitud
        isOpen={openVerSolicitud}
        onClose={handleCloseVerSolicitud}
        selectedDocID={selectedDocID}
      />
    </Plantilla>
  );
};

export default Solicitudes;
