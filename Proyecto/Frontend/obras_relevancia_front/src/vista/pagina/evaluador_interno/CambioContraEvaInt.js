import React, { useState } from "react";
import Plantilla from "../../componentes/menu/PlantillaEvaInt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { actualizarContrasena } from "../../../services/evaluadorInternoServicios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

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
const title = "Cambio de Contraseña de " + nombre + " " + apellido;

const CambioContraDocente = () => {
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState("");

  const handleGuardar = async () => {
    // Verificar que todos los campos estén llenos
    if (!contrasenaActual || !contrasenaNueva || !confirmarNuevaContrasena) {
      alert("Por favor complete todos los campos");
      return;
    }

    // Verificar que la contraseña nueva coincida con la confirmación
    if (contrasenaNueva !== confirmarNuevaContrasena) {
      alert("La contraseña nueva y la confirmación no coinciden");
      return;
    }

    try {
      // Realizar la solicitud de actualización de contraseña
      // console.log("ID:" + idUsuario);
      // console.log("contrasenaActual:" + contrasenaActual);
      // console.log("contrasenaNueva:" + contrasenaNueva);
      const response = await actualizarContrasena({
        id: idUsuario,
        contrasenaActual: contrasenaActual,
        nuevaContrasena: contrasenaNueva,
      });
      console.log(JSON.stringify(response, null, 2));
      if (response && response.data && response.data.success) {
        // La contraseña se ha actualizado correctamente
        alert("La contraseña se ha actualizado correctamente");
      } else {
        // La contraseña no se ha actualizado correctamente (por ejemplo, contraseña actual incorrecta)
        alert(
          "No se pudo actualizar la contraseña. Por favor verifique su contraseña actual."
        );
      }
    } catch (error) {
      alert("Error al actualizar la contraseña:", error);
      console.error("Error al actualizar la contraseña:", error);
    }
  };

  return (
    <Plantilla title={title}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {/* Campos de contraseña */}
        <Grid item xs={12}>
          <TextField
            label="Contraseña actual"
            type="password"
            fullWidth
            margin="normal"
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Contraseña nueva"
            type="password"
            fullWidth
            margin="normal"
            value={contrasenaNueva}
            onChange={(e) => setContrasenaNueva(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={confirmarNuevaContrasena}
            onChange={(e) => setConfirmarNuevaContrasena(e.target.value)}
          />
        </Grid>

        {/* Botón de guardar */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleGuardar}>
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Plantilla>
  );
};

export default CambioContraDocente;
