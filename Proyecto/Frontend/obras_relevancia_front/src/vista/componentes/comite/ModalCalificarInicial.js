// DetalleModal.js
import React, { useState } from "react";
import { calificarInicial } from "../../../services/comiteServicios.js";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
const ModalCalificarInicial = ({ open, handleClose, selectedRow }) => {
  const [selectedState, setSelectedState] = useState(
    selectedRow && selectedRow.SOL_ESTADO_NOMBRE == "Evaluando"
      ? "Aceptar"
      : "Tramite"
  );

  const [observaciones, setObservaciones] = useState("");
  const handleEnviarClick = () => {
    if (selectedState === "Tramite") {
      const datosEnviarTramite = { idEstado: 1, Estado: "Tramite", observacionesModal: observaciones  };

      calificarInicial(selectedRow.SOL_ID, datosEnviarTramite);
      handleClose();
    } else if (selectedState === "Devuelto") {
      const datosEnviarDvuelto = { idEstado: 2, Estado: "Devuelto", observacionesModal: observaciones };
      calificarInicial(selectedRow.SOL_ID, datosEnviarDvuelto);
      handleClose();
    } else if (selectedState === "Aceptar") {
      const datosEnviarAceptado = { idEstado: 4, Estado: "Aceptado", observacionesModal: observaciones };
      calificarInicial(selectedRow.SOL_ID, datosEnviarAceptado);
      handleClose();
    } else if (selectedState === "Rechazar") {
      const datosEnviarRechazado = { idEstado: 5, Estado: "Rechazado", observacionesModal: observaciones };
      calificarInicial(selectedRow.SOL_ID, datosEnviarRechazado);
      handleClose();
    }
    handleClose(); // Cerrar el modal después de ejecutar la función
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="modal-title" gutterBottom marginBottom={2}>
          Detalles
        </Typography>
        <Grid container spacing={2} >
          {/* ... Otros campos TextField existentes ... */}
          <Grid item xs={8}>
            <FormControl>
              {selectedRow && selectedRow.SOL_ESTADO_NOMBRE === "Creado" ? (
                <div>
                  <InputLabel id="estado-filter-label">Calificar</InputLabel>
                  <Select
                    labelId="estado-filter-label"
                    id="estado-filter"
                    value={selectedState}
                    label="Filtrar por Estado"
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <MenuItem value="Tramite">Tramite</MenuItem>
                    <MenuItem value="Devuelto">Devuelto</MenuItem>
                  </Select>
                </div>
              ) : selectedRow &&
                selectedRow.SOL_ESTADO_NOMBRE === "Evaluando" ? (
                <div>
                  <InputLabel id="estado-filter-label">Calificar</InputLabel>
                  <Select
                    labelId="estado-filter-label"
                    id="estado-filter"
                    value={selectedState}
                    label="Filtrar por Estado"
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <MenuItem value="Aceptar">Aceptar</MenuItem>
                    <MenuItem value="Rechazar">Rechazar</MenuItem>
                  </Select>
                  
                </div>
                
              ) : (
                <div>La solicitud no está en proceso de calificación </div>
              )}
            </FormControl>
          </Grid>
      
         
          {/* ... Otros campos TextField existentes ... */}
          <Grid container spacing={2} justifyContent="flex-end" marginTop={2}>
    
            <Grid item xs={12}>
            {selectedRow &&
                (selectedRow.SOL_ESTADO_NOMBRE === "Creado" ||
                  selectedRow.SOL_ESTADO_NOMBRE === "Evaluando") && (
              
              
              <TextField
                id="observaciones"
                label="Observaciones"
                multiline
                rows={4}
                fullWidth
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cerrar
              </Button>
            </Grid>
            <Grid item>
              {selectedRow &&
                (selectedRow.SOL_ESTADO_NOMBRE === "Creado" ||
                  selectedRow.SOL_ESTADO_NOMBRE === "Evaluando") && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEnviarClick}
                  >
                    Enviar
                  </Button>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalCalificarInicial;
