// AsignarEvaluador.js

import { getEvaluadoresComite } from "../../../services/comiteServicios.js";
import { asignarEvaluadorSolicitud } from "../../../services/comiteServicios.js";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const AsignarEvaluador = ({ isOpen, onClose, tableDataEva  }) => {
  const [tipoFilter, setTipoFilter] = useState("Todos");
  const [tableData, setTableData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codigo = searchParams.get("codigo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result = await getEvaluadoresComite();
        setTableData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  //console.log("tableData:", tableDataEva);

  const handleTipoFilterChange = (event) => {
    setTipoFilter(event.target.value);
  };

  const handleAsignarClick = (codigo, eva_tipo, eva_evaluador) => {
    const doc_id = parseInt(codigo, 10);
    console.log("Códigoo:", doc_id);
    console.log("Tipo:", eva_tipo);
    console.log("ID Evaluador:", eva_evaluador);
   
    const calificacionEvaluadores = tableDataEva.filter((row) => row.EVA_ESTADO_NOMBRE === 'Aceptado' || row.EVA_ESTADO_NOMBRE === 'Rechazado');

    if (calificacionEvaluadores.length === 2) {
        // Verificar si los dos estados son diferentes
        if ((calificacionEvaluadores[0].EVA_ESTADO_NOMBRE !== calificacionEvaluadores[1].EVA_ESTADO_NOMBRE)&& tableDataEva.length < 3) { 
         
   // const datosTabla = { doc_id, evaTipoCalificadorTercero, eva_evaluador };
    const datosTabla = { doc_id: doc_id, eva_tipo: "Evaluación Tercera",eva_evaluador: eva_evaluador  };
    asignarEvaluadorSolicitud(datosTabla)
      .then((response) => {
        alert("Registro realizado con éxito", response);
      })
      .catch((error) => {
        alert("Error al asignar evaluador", error);
      });
    onClose();
    return

        } 
    } 




    // Validación: No más de dos filas en la tabla
    if (tableDataEva.length >= 2) {
      alert("No se pueden agregar más de dos evaluadores");
      return;
    }
  
    // Validación: No puede haber 2 evaluadores del mismo tipo
    const evaluadorExistente = tableDataEva.find((row) => row.EVA_TIPO === 'Evaluación Interna' || row.EVA_TIPO === 'Evaluación Externa');
  

    if (evaluadorExistente && evaluadorExistente.EVA_TIPO) {
      const valorEvaTipo = evaluadorExistente.EVA_TIPO;
  
      if (valorEvaTipo === eva_tipo) {
        alert("No puedes agregar dos evaluadores del mismo tipo");
        return;
      }
    }

    
  
    const datosTabla = { doc_id, eva_tipo, eva_evaluador };
    asignarEvaluadorSolicitud(datosTabla)
      .then((response) => {
        alert("Registro realizado con éxito", response);
      })
      .catch((error) => {
        alert("Error al asignar evaluador", error);
      });
    onClose();
  };
  

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Evaluador</TableCell>
                <TableCell>Evaluador</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Area de conocimiento</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Asignar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData
                .filter((row) => tipoFilter === "Todos" || (row.ROL_ID === 4 && tipoFilter === "Interno") || (row.ROL_ID === 5 && tipoFilter === "Externo"))
                .map((row) => (
                  <TableRow key={row.ROL_ID}>
                    <TableCell>{row.PER_ID}</TableCell>
                    <TableCell>{row.PER_NOMBRE} {row.PER_APELLIDO}</TableCell>
                    <TableCell>{row.ACA_ESPECIALIDAD}</TableCell>
                    <TableCell>{row.ACA_AREA_CONOCIMIENTO}</TableCell>
                    <TableCell>{row.ROL_ID === 4 ? 'Evaluación Interna' : 'Evaluación Externa'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAsignarClick(codigo, row.ROL_ID === 4 ? 'Evaluación Interna' : 'Evaluación Externa', row.PER_ID)}
                      >
                        Asignar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: "10px" }}>
          <label>Filtrar por Tipo: </label>
          <Select value={tipoFilter} onChange={handleTipoFilterChange}>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Externo">Externo</MenuItem>
            <MenuItem value="Interno">Interno</MenuItem>
          </Select>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AsignarEvaluador;
