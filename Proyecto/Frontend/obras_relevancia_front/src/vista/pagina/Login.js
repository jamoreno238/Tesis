import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Registrarse from "../componentes/Registrarse.js";
import RecordarContrasena from "../componentes/ModalRecuperarContrasena.js";
import "../../css/login.css";
import { login } from "../../services/authApi.js";
import { Link, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignInSide() {
  const [registrarseOpen, setRegistrarseOpen] = useState(false);
  const [recordarContrasenaOpen, setRecordarContrasenaOpen] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate(); 

  const handleRegistrarseClick = () => {
    setRegistrarseOpen(true);
  };

  const handleRegistrarseClose = () => {
    setRegistrarseOpen(false);
  };

  const handleRecordarContrasenaClick = () => {
    setRecordarContrasenaOpen(true);
  };

  const handleRecordarContrasenaClose = () => {
    setRecordarContrasenaOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const exitoInicioSesion = await login(usuario, contrasena);
         
    //  console.log("Usuario:" + usuario);
      if (exitoInicioSesion.userType === 'Secretaria') {
        alert(`Bienvenida Secretaria: ${usuario} ` );
        window.location.href = "/inicioSecretaria";
      } else if (exitoInicioSesion.userType === 'Comité') {
        alert(`Bienvenida Miembro de Comite: ${usuario}`);
        window.location.href = "/inicioComite";
      } else if (exitoInicioSesion.userType === 'Docente') {
        alert(`Bienvenida Docente: ${usuario}`);
        window.location.href = "/inicioDocente";
      } else if (exitoInicioSesion.userType === 'Evaluador interno') {
        alert(`Bienvenida Evaluador Interno: ${usuario}`);
        window.location.href = "/inicioEvaInt";
      } else if (exitoInicioSesion.userType === 'Evaluador externo') {
        alert(`Bienvenida Evaluador Externo: ${usuario}`);
        window.location.href = "/inicioEvaExt";
      } else if (exitoInicioSesion.userType === 'Administrador') {
        alert(`Bienvenida Administrador: ${usuario}`);
        window.location.href = "/inicioAdministrador";
      } else {
        alert(`Error al ingresar, Intentelo de nuevo`);
      }
    } catch (error) {
      console.error("Error al procesar la petición de inicio de sesión", error);
      setLoginError(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" className="signInContainer">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="containerLeft" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", width: 100, height: 100 }}
            >
              <img
                src="https://pbs.twimg.com/profile_images/1550954392/ESPE__1__400x400.jpg"
                alt="Descripción de la imagen"
                name="imagenLogin"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contrasena"
                label="Contraseña"
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
          
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="btnEntrar"
              >
                Entrar
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={handleRecordarContrasenaClick}
                >
                  {"¿Olvidaste la contraseña?"}
                </Link>
                <RecordarContrasena
                  isOpen={recordarContrasenaOpen}
                  onClose={handleRecordarContrasenaClose}
                />
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleRegistrarseClick}>
                  {"No tienes una cuenta? Regístrate."}
                </Link>

                <Registrarse
                  isOpen={registrarseOpen}
                  onClose={handleRegistrarseClose}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Registrarse isOpen={registrarseOpen} onClose={handleRegistrarseClose} />
      <RecordarContrasena
        isOpen={recordarContrasenaOpen}
        onClose={handleRecordarContrasenaClose}
      />
    </ThemeProvider>
  );
}
