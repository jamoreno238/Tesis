import React, { useState } from "react";
import { Box, TextField, Grid, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { recuperarContrasena } from "../../services/Usuarios";

const ModalRecuperarContrasena = ({ isOpen, onClose }) => {
  const [correoElectronico, setCorreoElectronico] = useState("");

  const handleCorreoChange = (event) => {
    setCorreoElectronico(event.target.value);
  };

  const handleCancelarClick = () => {
    onClose();
  };

  const handleEnviarClick = () => {
    const datos = { correoElectronico: correoElectronico }; // Crear un objeto con la clave "correoElectronico"
    recuperarContrasena(datos)
      .then((response) => {
        alert("Nueva Contraseña enviada al correo: " + correoElectronico);
        console.log("Nueva Contraseña enviada al correo: " + correoElectronico);
        onClose();
      })
      .catch((error) => {
        alert("Error al enviar la Nueva Contraseña: " + error.message);
        console.error("Error al enviar la Nueva Contraseña: ", error);
      });
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
          maxHeight: "90vh",
        },
      }}
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle textAlign={"center"}>Recuperar Contraseña</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>
            Ingrese el Correo Electrónico asociado a su cuenta para poder
            recuperar su contraseña. Correo Institucional / Personal son
            válidos.
          </Typography>
          <Grid>
            <br />
            <TextField
              label="Correo Electrónico"
              value={correoElectronico}
              onChange={handleCorreoChange}
              fullWidth
            />
          </Grid>
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

export default ModalRecuperarContrasena;
