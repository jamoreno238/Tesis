import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Grid, TextField } from "@mui/material";
import "../../../css/usuarios.css";
import { getUsuariosFiltrado } from "../../../services/comiteServicios.js";
const ModalUsuario = ({ isOpen, onClose, selectedRow }) => {
  const [tabValue, setTabValue] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [datosPersonales, setDatosPersonales] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    correoInstitucional: "",
    correoPersonal: "",
    telefonoConvencional: "",
    telefonoCelular: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [datosAcademicos, setDatosAcademicos] = useState({
    institutoLabor: "",
    departamentoUnidad: "",
    areaConocimiento: "",
    especialidad: "",
    gradoAcademico: "",
    lineaInvestigacion: "",
    cargo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedRow) {
        console.log("*****id:" + selectedRow);
        try {
          const result = await getUsuariosFiltrado(selectedRow);
          setTableData(result.data[0]);
          console.log("objeto:", JSON.stringify(result.data, null, 2));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedRow]);

  const handleDatosPersonalesChange = (e) => {
    setDatosPersonales({
      ...datosPersonales,
      [e.target.name]: e.target.value,
    });
  };

  const handleDatosAcademicosChange = (e) => {
    setDatosAcademicos({
      ...datosAcademicos,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnviarClick = () => {
    // Aquí puedes manejar la lógica para enviar los datos al servidor
    console.log("Datos Personales:", datosPersonales);
    console.log("Datos Académicos:", datosAcademicos);

    // Cerrar el modal después de enviar los datos
    onClose();
  };

  const handleCancelarClick = () => {
    onClose(); // Usar onClose en lugar de handleCloseModal
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle textAlign={"center"}>
        Detalles Personales del Usuario
      </DialogTitle>
      <DialogContent>
        <Box>
          {/* Pestañas con posición pegajosa */}
          <Tabs
            className="tabsContainer"
            value={tabValue}
            onChange={handleTabChange}
            centered
          >
            <Tab label="Datos Personales" />
            <Tab label="Datos Académicos" />
          </Tabs>
          {tabValue === 0 && (
            <Box mt={2}>
              <Grid container spacing={2}>
                {/* Columna 1 - Datos Personales */}
                <Grid item xs={6}>
                  <TextField
                    label="Nombres"
                    name="nombre"
                    value={tableData.PER_NOMBRE ? tableData.PER_NOMBRE : ""}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Cédula de Identidad"
                    name="cedula"
                    value={tableData.PER_CEDULA ? tableData.PER_CEDULA : ""}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Correo Institucional"
                    name="correoI"
                    value={
                      tableData.PER_CORREO_INSTITUCIONAL
                        ? tableData.PER_CORREO_INSTITUCIONAL
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Télefono Celular"
                    name="telefonoCelu"
                    value={
                      tableData.PER_TELEFONO_CELULAR
                        ? tableData.PER_TELEFONO_CONVENCIONAL
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                </Grid>

                {/* Columna 2 - Datos Personales */}
                <Grid item xs={6}>
                  <TextField
                    label="Apellidos"
                    name="apellido"
                    value={tableData.PER_APELLIDO ? tableData.PER_APELLIDO : ""}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Correo Personal"
                    name="correoP"
                    value={
                      tableData.PER_CORREO_PERSONAL
                        ? tableData.PER_CORREO_PERSONAL
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Télefono Convencional"
                    name="telefonoConv"
                    value={
                      tableData.PER_TELEFONO_CONVENCIONAL
                        ? tableData.PER_TELEFONO_CONVENCIONAL
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          {tabValue === 1 && (
            <Box mt={2}>
              <Grid container spacing={2}>
                {/* Columna 1 - Datos Académicos */}
                <Grid item xs={6}>
                  <TextField
                    label="Instituto de Labor"
                    name="institutoLabor"
                    value={
                      tableData.ACA_INSTITUCION_LABOR
                        ? tableData.ACA_INSTITUCION_LABOR
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Área de Conocimiento"
                    name="areaConocimiento"
                    value={
                      tableData.ACA_AREA_CONOCIMIENTO
                        ? tableData.ACA_AREA_CONOCIMIENTO
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Título"
                    name="titulo"
                    value={tableData.ACA_TITULO ? tableData.ACA_TITULO : ""}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Linea de Investigacíon"
                    name="lineaInvestigacion"
                    value={
                      tableData.ACA_LINEA_INVESTIGACION
                        ? tableData.ACA_LINEA_INVESTIGACION
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Id ESPE"
                    name="idEspe"
                    value={tableData.ACA_ID_ESPE ? tableData.ACA_ID_ESPE : ""}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                </Grid>

                {/* Columna 2 - Datos Académicos */}
                <Grid item xs={6}>
                  <TextField
                    label="Departamento / Unidad"
                    name="departamentoUnidad"
                    value={
                      tableData.ACA_DEPARTAMENTO_UNIDAD
                        ? tableData.ACA_DEPARTAMENTO_UNIDAD
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Especialidad"
                    name="especialidad"
                    value={
                      tableData.ACA_ESPECIALIDAD
                        ? tableData.ACA_ESPECIALIDAD
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Último Grado Académico "
                    name="gradoAcademico"
                    value={
                      tableData.ACA_GRADO_ACADEMICO
                        ? tableData.ACA_GRADO_ACADEMICO
                        : ""
                    }
                    disabled
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    label="Cargo"
                    name="cargo"
                    value={tableData.ACA_CARGO ? tableData.ACA_CARGO : ""}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUsuario;
