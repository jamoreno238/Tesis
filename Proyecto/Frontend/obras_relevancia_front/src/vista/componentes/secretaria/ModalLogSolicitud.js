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
} from "@mui/material";
import Plantilla from "../../componentes/menu/PlantillaSecretaria.js";
import "../../../css/asignarPerfiles.css";
import { obtenerLogSolicitudes } from "../../../services/secretariaServicios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { useLocation } from "react-router-dom";

const token = Cookies.get("token");

let nombre = null;
let apellido = null;
if (token) {
  const decodedToken = decodeToken(token);

  nombre = decodedToken && decodedToken.nombre ? decodedToken.nombre : null;
  apellido =
    decodedToken && decodedToken.apellido ? decodedToken.apellido : null;
}
const title = "Log Solicitudes - " + nombre + " " + apellido;

const CrearEvaluador = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codigo = searchParams.get("codigo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await obtenerLogSolicitudes(codigo);
        setTableData(result.data);
        setData(result.data);
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

  return (
    <Plantilla title={title}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Código de Solicitud</TableCell>
              <TableCell>Fecha Actualización</TableCell>
              <TableCell>Log Observación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.PER_ID}>
                  <TableCell>{row.SOL_ID}</TableCell>
                  <TableCell>
                    {(() => {
                      const fechaCreacion = new Date(
                        row.LOG_FECHA_ACTUALIZACION
                      );
                      const fechaFormateada = fechaCreacion
                        .toISOString()
                        .split("T")[0];
                      return fechaFormateada;
                    })()}
                  </TableCell>
                  <TableCell>{row.LOG_OBSERVACION}</TableCell>
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
    </Plantilla>
  );
};

export default CrearEvaluador;
