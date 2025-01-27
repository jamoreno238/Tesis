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
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Plantilla from "../../componentes/menu/PlantillaComite.js";
import ModalUsuario from "../../componentes/comite/ModalUsuario.js";
import { obtenerUsuarios } from "../../../services/comiteServicios.js";
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
const title = nombre + " " + apellido + " Estado de Solicitudes de Usuarios";
const Usuario = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await obtenerUsuarios();
        setTableData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row.USU_ID); // Pasar el valor de USU_ID al modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filteredData = tableData.filter((row) =>
    row.PER_NOMBRE.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Plantilla title={title}>
      <FormControl fullWidth sx={{ mt: 2, marginBottom: 1 }}>
        <InputLabel htmlFor="search-field">Buscar por nombre</InputLabel>
        <Input
          id="search-field"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </FormControl>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Titulo</TableCell>
              <TableCell>Visualizar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.USU_ID}>
                  <TableCell>{row.USU_ID}</TableCell>
                  <TableCell>{row.USU_USUARIO}</TableCell>
                  <TableCell>{row.PER_NOMBRE}</TableCell>
                  <TableCell>{row.PER_APELLIDO}</TableCell>
                  <TableCell>{row.ACA_TITULO}</TableCell>
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal para detalles */}
      <ModalUsuario
        isOpen={openModal}
        onClose={handleCloseModal}
        selectedRow={selectedRow}
      />
    </Plantilla>
  );
};

export default Usuario;
