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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Plantilla from "../../componentes/menu/PlantillaComite.js";
import "../../../css/asignarPerfiles.css";
import { obtenerEvaluadores } from "../../../services/comiteServicios.js";
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
const title = "Crear Evaluador - " + nombre + " " + apellido;

const CrearEvaluador = () => {
  const evaluadores = ["Externo", "Interno", "Todos"];
  const [selectedevaluador, setSelectedevaluador] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await obtenerEvaluadores();
        setTableData(result.data);
        setData(result.data);
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
        (row) =>
          (selectedType === "Externo" && row.ROL_ID === 5) ||
          (selectedType === "Interno" && row.ROL_ID === 4)
      );
      setData(filteredData);
    }
  };

  const handleEvaluadorChange = (event) => {
    setSelectedevaluador(event.target.value);
    filterDataByType(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Plantilla title={title}>
      <FormControl
        fullWidth
        sx={{ mt: 2, marginBottom: 2, marginRight: "80%" }}
      >
        <InputLabel id="evaluador-select-label">Tipo de Evaluador</InputLabel>
        <Select
          labelId="evaluador-select-label"
          id="evaluador-select"
          value={selectedevaluador}
          onChange={handleEvaluadorChange}
          label="Tipo de Evaluador"
        >
          {evaluadores.map((evaluador) => (
            <MenuItem key={evaluador} value={evaluador}>
              {evaluador}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Código de Evaluador</TableCell>
              <TableCell>Evaluador</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Área de Conocimiento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.PER_ID}>
                  <TableCell>{row.PER_ID}</TableCell>
                  <TableCell>
                    {row.PER_NOMBRE} {row.PER_APELLIDO}
                  </TableCell>
                  <TableCell>{row.ACA_ESPECIALIDAD}</TableCell>
                  <TableCell>{row.ACA_AREA_CONOCIMIENTO}</TableCell>
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
