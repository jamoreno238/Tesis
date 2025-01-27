import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "../../../css/registrarse.css";
import "../../../css/botones.css";
import { obtenerSolicitudesDocID } from "../../../services/docenteServicios";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const apiUrl = process.env.REACT_APP_API_URL;
const ModalVerSolicitud = ({ isOpen, onClose, selectedDocID }) => {
  const [tableData, setTableData] = useState({});

  // console.log("*****doc_id:" + selectedDocID.DOC_ID);
  useEffect(() => {
    const fetchData = async () => {
      console.log("*****doc_id:" + selectedDocID);
      if (selectedDocID) {
        try {
          const result = await obtenerSolicitudesDocID(selectedDocID);

          setTableData(result.data[0]);
          console.log("objeto:", JSON.stringify(result.data, null, 2));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedDocID]);

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

  const handleCancelarClick = () => {
    // Cerrar el modal sin enviar los datos
    onClose();
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
                value={
                  tableData && tableData.DOC_TITULO ? tableData.DOC_TITULO : ""
                }
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Coautores"
                name="coautores"
                value={
                  tableData && tableData.DOC_AUTOR ? tableData.DOC_AUTOR : ""
                }
                fullWidth
                disabled
                margin="normal"
              />
              <Grid item xs={12} md={6}>
                <TextField
                  label="Autor"
                  name="autor"
                  value={`${nombre} ${apellido}`}
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Detalle de la Obra"
                  name="detalleObra"
                  value={
                    tableData && tableData.DOC_DETALLE
                      ? tableData.DOC_DETALLE
                      : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Categoria"
                  name="categoria"
                  value={
                    tableData && tableData.TIP_NOMBRE_2
                      ? tableData.TIP_NOMBRE_2
                      : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="ISBN"
                  name="isbn"
                  value={
                    tableData && tableData.DOC_ISBN ? tableData.DOC_ISBN : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Lugar de Registro"
                  name="lugarRegistro"
                  value={
                    tableData && tableData.DOC_LUGAR_REGISTRO
                      ? tableData.DOC_LUGAR_REGISTRO
                      : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Fecha de emisión del documento"
                  name="fechaEmision"
                  value={
                    tableData && tableData.DOC_FECHA_EMISION
                      ? new Date(
                          tableData.DOC_FECHA_EMISION
                        ).toLocaleDateString()
                      : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
              </Grid>
              {/* Segunda columna */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Formato"
                  name="formato"
                  value={
                    tableData &&
                    (tableData.DOC_FORMATO === 0 ? "Fisico" : "Digital")
                  } // Muestra "Fisico" si el valor es 0, "Digital" si es 1
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Tipo de Obra"
                  name="tipoObra"
                  value={
                    tableData && tableData.TIP_NOMBRE_1
                      ? tableData.TIP_NOMBRE_1
                      : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Numero de Hojas"
                  name="numeroHojas"
                  value={
                    tableData && tableData.DOC_NUMERO_HOJAS
                      ? tableData.DOC_NUMERO_HOJAS
                      : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Numero de Registro"
                  name="numeroRegistro"
                  value={
                    tableData && tableData.DOC_NUMERO_REGISTRO
                      ? tableData.DOC_NUMERO_REGISTRO
                      : ""
                  }
                  fullWidth
                  disabled
                  margin="normal"
                />
                <br></br>
                <br></br>
                <label>Archivo: </label>
                <Button
                  variant="contained"
                  color="primary"
                  className="visualizar"
                  onClick={() =>
                    window.open(
                      `${apiUrl}/api/pdfs/${tableData.DOC_LINK}`,
                      "_blank"
                    )
                  }
                >
                  Vizualizar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelarClick} className="cancelButton">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalVerSolicitud;
