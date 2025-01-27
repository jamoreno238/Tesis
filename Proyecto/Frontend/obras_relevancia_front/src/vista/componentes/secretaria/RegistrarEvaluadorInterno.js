import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import "../../../css/registrarse.css";
import "../../../css/botones.css";
import { registrarEvaluadorInterno } from "../../../services/secretariaServicios";
import { Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const departamentoUnidad = [
  { idDepartamento: 1, name: "Ciencias Exactas" },
  { idDepartamento: 2, name: "Ciencias de la Computación" },
  { idDepartamento: 3, name: "Ciencias de Energía y Mecánica" },
  { idDepartamento: 4, name: "Ciencias de la Tierra y la Construcción" },
  { idDepartamento: 5, name: "Ciencias de la Vida y la Agricultura" },
  {
    idDepartamento: 6,
    name: "Ciencias Económicas, Administrativas y del Comercio",
  },
  { idDepartamento: 7, name: "Ciencias Humanas y Sociales" },
  { idDepartamento: 8, name: "Seguridad y Defensa" },
  { idDepartamento: 9, name: "Eléctrica, Electrónica y Telecomunicaciones" },
  { idDepartamento: 10, name: "Ciencias Médicas" },
];

const institutoLabor = [
  { idInstitucion: 1, name: "Campus Sangolquí" },
  { idInstitucion: 2, name: "Campus Latacunga" },
  { idInstitucion: 3, name: "Campus Santo Domingo" },
];

const RegistrarEvaluadorInterno = ({ isOpen, onClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [generatedUsername, setGeneratedUsername] = useState(""); // Estado para almacenar el nombre de usuario generado

  const [datosPersonales, setDatosPersonales] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    correoInstitucional: "",
    correoPersonal: "",
    telefonoConvencional: "",
    nickUsuario: "",
    telefonoCelular: "",
    contrasena: "",
    institutoLabor: "",
    departamentoUnidad: "",
    areaConocimiento: "",
    especialidad: "",
    titulo: "",
    gradoAcademico: "",
    lineaInvestigacion: "",
    cargo: "",
    idEspe: "",
  });

  const generarNickUsuario = () => {
    const { nombre, apellido } = datosPersonales;
    if (
      nombre.trim() !== "" &&
      apellido.trim() !== "" &&
      datosPersonales.nickUsuario === ""
    ) {
      const usernamePrefix = (
        nombre.slice(0, 2) + apellido.slice(0, 2)
      ).toLowerCase();
      const randomNumber = Math.floor(Math.random() * 100);
      const generatedUsername = `${usernamePrefix}${randomNumber}`;
      setGeneratedUsername(generatedUsername);
      setDatosPersonales({
        ...datosPersonales,
        nickUsuario: generatedUsername,
      });
    }
  };

  const handleDatosPersonalesChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales({
      ...datosPersonales,
      [name]: value,
    });
    if (name === "nombre" || name === "apellido") {
      generarNickUsuario();
    }
  };

  const handleCambiarUsuarioClick = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const newUsername = `${generatedUsername.slice(0, -2)}${randomNumber}`;
    setGeneratedUsername(newUsername);
    setDatosPersonales({
      ...datosPersonales,
      nickUsuario: newUsername,
    });
  };

  const handleEnviarClick = () => {
    if (datosPersonales.contrasena !== datosPersonales.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Verificar si el nickUsuario está vacío antes de enviar al servidor
    if (!datosPersonales.nickUsuario) {
      alert("El nombre de usuario es obligatorio");
      return;
    }

    // Enviar datos al servidor
    registrarEvaluadorInterno(datosPersonales)
      .then((response) => {
        alert("Registro realizado con éxito", response);
        window.location.reload();
      })
      .catch((error) => {
        alert("Error al Registrar Evaluador Interno", error);
        console.error("Error al Registrar Evaluador Interno:", error);
      });

    // Cerrar el modal después de enviar los datos
    onClose();
  };

  const handleCancelarClick = () => {
    // Cerrar el modal sin enviar los datos
    onClose();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle textAlign={"center"}>
        Ingrese los Datos del Evaludaor Interno
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
            <Tab label="Datos Personales del Evaluador" />
            <Tab label="Datos Académicos del Evaluador" />
          </Tabs>
          {tabValue === 0 && (
            <Box mt={2}>
              <Grid container spacing={2}>
                {/* Primera columna */}
                <Grid item xs={12} md={6}>
                  {/* Datos Personales */}
                  <TextField
                    label="Cédula de Identidad"
                    name="cedula"
                    value={datosPersonales.cedula}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Nombre"
                    name="nombre"
                    value={datosPersonales.nombre}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Apellido"
                    name="apellido"
                    value={datosPersonales.apellido}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Correo Institucional"
                    name="correoInstitucional"
                    value={datosPersonales.correoInstitucional}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Correo Personal"
                    name="correoPersonal"
                    value={datosPersonales.correoPersonal}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                {/* Segunda columna */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Télefono Convencional"
                    name="telefonoConvencional"
                    value={datosPersonales.telefonoConvencional}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Télefono Celular"
                    name="telefonoCelular"
                    value={datosPersonales.telefonoCelular}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <Box display="flex" alignItems="center">
                    <TextField
                      label="Usuario"
                      name="nickUsuario"
                      value={datosPersonales.nickUsuario || generatedUsername}
                      onChange={handleDatosPersonalesChange}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                    <IconButton
                      className="cambiarUsuarioButton"
                      onClick={handleCambiarUsuarioClick}
                    >
                      <ChangeCircleIcon style={{ fontSize: 50 }} />
                    </IconButton>
                  </Box>
                  <TextField
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    value={datosPersonales.contrasena}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Confirmar Contraseña"
                    name="confirmarContrasena"
                    type="password"
                    value={datosPersonales.confirmarContrasena}
                    onChange={handleDatosPersonalesChange}
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
                {/* Primera columna */}
                <Grid item xs={12} md={6}>
                  {/* Datos Académicos */}
                  <FormControl fullWidth sx={{ mt: 2, marginBottom: 1 }}>
                    <InputLabel id="institutoLabor-select-label">
                      Instituto de Labor
                    </InputLabel>
                    <Select
                      label="Instituto de Labor"
                      name="institutoLabor"
                      value={setDatosPersonales.institutoLabor}
                      onChange={handleDatosPersonalesChange}
                      fullWidth
                      margin="normal"
                    >
                      {institutoLabor.map((institutoLabor) => (
                        <MenuItem
                          key={institutoLabor.name}
                          value={institutoLabor.name}
                        >
                          {institutoLabor.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2, marginBottom: 1 }}>
                    <InputLabel id="departamentoUnidad-select-label">
                      Departamento
                    </InputLabel>
                    <Select
                      label="Departamento"
                      name="departamentoUnidad"
                      value={setDatosPersonales.departamentoUnidad}
                      onChange={handleDatosPersonalesChange}
                      fullWidth
                      margin="normal"
                    >
                      {departamentoUnidad.map((departamentoUnidad) => (
                        <MenuItem
                          key={departamentoUnidad.name}
                          value={departamentoUnidad.name}
                        >
                          {departamentoUnidad.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Área de Conocimiento"
                    name="areaConocimiento"
                    value={datosPersonales.areaConocimiento}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    label="Especialidad"
                    name="especialidad"
                    value={datosPersonales.especialidad}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                {/* Segunda columna */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Título de Tercer Nivel"
                    name="titulo"
                    value={datosPersonales.titulo}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    label="Grado académico obtenido"
                    name="gradoAcademico"
                    value={datosPersonales.gradoAcademico}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Linea de Investigacíon"
                    name="lineaInvestigacion"
                    value={datosPersonales.lineaInvestigacion}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Cargo"
                    name="cargo"
                    value={datosPersonales.cargo}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="ID-ESPE"
                    name="idEspe"
                    value={datosPersonales.idEspe}
                    onChange={handleDatosPersonalesChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelarClick} className="cancelButton">
          Cancelar
        </Button>
        <Button onClick={handleEnviarClick} className="enviarButton">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrarEvaluadorInterno;
