import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "../../../css/registrarse.css";
import "../../../css/botones.css";
import { crearSolicitudes } from "../../../services/docenteServicios";
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tooltip,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const tipoObra = [
  { idTipoObra: 1, name: "Libro monográfico" },
  { idTipoObra: 2, name: "Libros de texto de una asignatura" },
  { idTipoObra: 3, name: "Artículo arbitrado" },
  { idTipoObra: 4, name: "Artículo arbitrado indidTipoObraual" },
  { idTipoObra: 5, name: "Artículo arbitrado colectivo" },
  { idTipoObra: 6, name: "Capitulos en libros coordinados" },
  { idTipoObra: 7, name: "Propiedad industrial" },
  { idTipoObra: 8, name: "Propiedad artística" },
  { idTipoObra: 9, name: "Diseños" },
  { idTipoObra: 10, name: "Diseños de software" },
  { idTipoObra: 11, name: "Prototipos" },
  { idTipoObra: 12, name: "Creaciones u obtenciones vegetales o animales" },
  { idTipoObra: 13, name: "Produccion artistica" },
  { idTipoObra: 14, name: "Libro individTipoObraual" },
  { idTipoObra: 15, name: "Libro colectivo" },
  { idTipoObra: 16, name: "Libro físico" },
  { idTipoObra: 17, name: "Libro digital" },
  { idTipoObra: 18, name: "Capitulo de libro individTipoObraual" },
  { idTipoObra: 19, name: "Capitulo de libro colectivo" },
  { idTipoObra: 20, name: "Parte de un libro coordinado" },
  { idTipoObra: 21, name: "Contribución presentada en congreso" },
  { idTipoObra: 22, name: "Contribución presentada en conferencia" },
  { idTipoObra: 23, name: "Contribución presentada en seminario" },
  {
    idTipoObra: 24,
    name: "Contribución presentada en reunión de relevancia científica",
  },
  { idTipoObra: 25, name: "Otras Obras" },
];

const categoria = [
  { idCategoria: 26, name: "Producción académica científica" },
  { idCategoria: 27, name: "Producción académica tecnológica" },
  { idCategoria: 28, name: "Producción académica de literatura" },
  { idCategoria: 29, name: "Producción académica de artes" },
  { idCategoria: 30, name: "Campo de conocimiento interdisciplinario" },
  { idCategoria: 31, name: "Campo de conocimiento multidisciplinario" },
  { idCategoria: 32, name: "Campo de conocimiento transdisciplinario" },
  { idCategoria: 33, name: "Saberes" },
  { idCategoria: 34, name: "Saberes ancestrales" },
  { idCategoria: 35, name: "Conocimientos tradicionales" },
  { idCategoria: 36, name: "Procesos tecnológicos" },
  { idCategoria: 37, name: "Productos tecnológicos" },
  { idCategoria: 38, name: "Cultura" },
  { idCategoria: 39, name: "Arte" },
  { idCategoria: 40, name: "Obra Artística" },
  { idCategoria: 41, name: "Otro" },
];

const formato = [
  { idformato: 0, name: "Fisico" },
  { idformato: 1, name: "Digital" },
];

const ModalCrearSolicitud = ({ isOpen, onClose }) => {
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [datosSolicitud, setDatosSolicitud] = useState({
    tipoObra: "",
    tituloObra: "",
    coautores: "",
    isbn: "",
    formato: "",
    autor: idUsuario,
    numeroRegistro: "",
    lugarRegistro: "",
    categoria: "",
    detalleObra: "",
    pdf: "",
    numeroHojas: "",
    fechaEmision: "",
  });

  const handleSolicitudesChange = (e) => {
    const { name, value } = e.target;
    setDatosSolicitud({
      ...datosSolicitud,
      [name]: value,
    });
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue); // Actualizar el estado de la fecha seleccionada
    setDatosSolicitud({
      ...datosSolicitud,
      fechaEmision: newValue ? newValue.toISOString().slice(0, 10) : "", // Actualizar la fecha en datosSolicitud
    });
  };

  const handleEnviarClick = () => {
    if (!datosSolicitud.pdf) {
      alert("No has seleccionado ningún archivo");
      return; // Detener la ejecución si no hay archivo seleccionado
    }

    // Crear FormData y adjuntar el archivo
    const formData = new FormData();
    formData.append("pdf", datosSolicitud.pdf);
    // Adjuntar otros datos
    Object.entries(datosSolicitud).forEach(([key, value]) => {
      if (key !== "pdf") {
        formData.append(key, value);
      }
    });

    // Enviar datos al servidor
    crearSolicitudes(formData)
      .then((response) => {
        alert("Registro de solicitud realizado con éxito", response);
        window.location.reload();
      })
      .catch((error) => {
        alert("Error al Registrar la Solicitud", error);
      });

    // Cerrar el modal después de enviar los datos
    onClose();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Archivo seleccionado:", selectedFile);
      setDatosSolicitud({
        ...datosSolicitud,
        pdf: selectedFile,
      });
    } else {
      console.log("Ningún archivo seleccionado");
    }
  };

  const handleCancelarClick = () => {
    // Cerrar el modal sin enviar los datos
    onClose();
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipClick = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle textAlign={"center"}>Nueva Solicitud</DialogTitle>
      <DialogContent>
        <Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              {/* Primera columna */}
              <TextField
                label="Título de la Obra"
                name="tituloObra"
                value={datosSolicitud.tituloObra}
                onChange={handleSolicitudesChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Coautores"
                name="coautores"
                value={datosSolicitud.coautores}
                onChange={handleSolicitudesChange}
                fullWidth
                margin="normal"
              />
              <Grid item xs={12} md={6}>
                <TextField
                  label="Autor"
                  name="autor"
                  value={`${nombre} ${apellido}`}
                  onChange={handleSolicitudesChange}
                  fullWidth
                  disabled
                  margin="normal"
                />

                <TextField
                  label="Detalle de la Obra"
                  name="detalleObra"
                  value={datosSolicitud.detalleObra}
                  multiline
                  rows={8}
                  onChange={handleSolicitudesChange}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth sx={{ mt: 2, marginBottom: 1 }}>
                  <InputLabel id="categoria-select-label">Categoria</InputLabel>
                  <Select
                    label="Categoria"
                    name="categoria"
                    value={datosSolicitud.categoria}
                    onChange={handleSolicitudesChange}
                    fullWidth
                    margin="normal"
                  >
                    {categoria.map((categorias) => (
                      <MenuItem
                        key={categorias.idCategoria}
                        value={categorias.idCategoria}
                      >
                        {categorias.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="ISBN / ISSN"
                  name="isbn"
                  value={datosSolicitud.isbn}
                  onChange={handleSolicitudesChange}
                  fullWidth
                  margin="normal"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha de emisión del documento"
                    value={selectedDate}
                    onChange={handleDateChange} // Utilizar el nuevo handler para el cambio de fecha
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    margin="normal"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
              {/* Segunda columna */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mt: 2, marginBottom: 1 }}>
                  <InputLabel id="formato-select-label">Formato</InputLabel>
                  <Select
                    label="Formato"
                    name="formato"
                    value={datosSolicitud.formato}
                    onChange={handleSolicitudesChange}
                    fullWidth
                    margin="normal"
                  >
                    {formato.map((formatos) => (
                      <MenuItem
                        key={formatos.idformato}
                        value={formatos.idformato}
                      >
                        {formatos.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2, marginBottom: 1 }}>
                  <InputLabel id="tipoObra-select-label">
                    Tipo de Obra
                  </InputLabel>
                  <Select
                    label="Tipo de Obra"
                    name="tipoObra"
                    value={datosSolicitud.tipoObra}
                    onChange={handleSolicitudesChange}
                    fullWidth
                    margin="normal"
                  >
                    {tipoObra.map((tipoObras) => (
                      <MenuItem
                        key={tipoObras.idTipoObra}
                        value={tipoObras.idTipoObra}
                      >
                        {tipoObras.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Numero de Hojas"
                  name="numeroHojas"
                  value={datosSolicitud.numeroHojas}
                  onChange={handleSolicitudesChange}
                  fullWidth
                  margin="normal"
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    label="Numero de Registro"
                    name="numeroRegistro"
                    value={datosSolicitud.numeroRegistro}
                    onChange={handleSolicitudesChange}
                    fullWidth
                    margin="normal"
                  />
                  <Tooltip
                    title="El número de registro tiene el siguiente formato: 23423-23-4234-234"
                    onClose={handleTooltipClose}
                    open={tooltipOpen}
                    arrow
                  >
                    <IconButton aria-label="Ayuda" onClick={handleTooltipClick}>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <TextField
                  label="Lugar de Registro"
                  name="lugarRegistro"
                  value={datosSolicitud.lugarRegistro}
                  onChange={handleSolicitudesChange}
                  fullWidth
                  margin="normal"
                />
                <Box mt={2}>
                  <InputLabel id="pdf-select-label">Adjuntar PDF</InputLabel>
                  <input
                    accept="application/pdf"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
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

export default ModalCrearSolicitud;
