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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Plantilla from "../../componentes/menu/PlantillaSecretaria.js";
import "../../../css/asignarPerfiles.css";
import ModalAsignarPerfil from "../../componentes/secretaria/ModalAsignarPerfil.js";
import { getUsuarioWithRol } from "../../../services/secretariaServicios";
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
const title =  nombre + " " + apellido + " - Asignar Perfil";


const AsignarPerfil = () => {


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedRolID, setSelectedRolID] = useState(null);
  const [selectedRoleID, setSelectedRoleID] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUsuarioWithRol();
        setTableData(result.data);
        console.log("objeto:" + result.data);
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
    setSelectedRole(row.ROL_NOMBRE); 
    setSelectedID(row.USU_ID);
    setSelectedRolID(row.ROL_ID);
    setSelectedRoleID(row.ROL_ID);
    setOpenModal(true);
  };

  const handleUpdateTable = async () => {
    try {
      const result = await getUsuarioWithRol();
      setTableData(result.data);
    } catch (error) {
      console.error("Error al cargar datos en la tabla:", error);
    }
  };

  return (
    <Plantilla title={title}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell>Código de Rol</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.USU_ID}>
                  <TableCell>{`${row.PER_NOMBRE} ${row.PER_APELLIDO}`}</TableCell>
                  <TableCell>{row.ROL_CODIGO}</TableCell>
                  <TableCell>{row.ROL_NOMBRE}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenModal(row)}
                      style={{ color: "green" }}
                    >
                      <EditIcon />
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
      <ModalAsignarPerfil
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          handleUpdateTable();
        }}
        selectedRow={selectedRow}
        selectedRole={selectedRole}
        selectedID={selectedID}
        selectedRolID={selectedRolID}
      />
    </Plantilla>
  );
};

export default AsignarPerfil;
