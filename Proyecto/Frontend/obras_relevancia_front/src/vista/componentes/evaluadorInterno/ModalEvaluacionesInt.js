// DetalleModal.js
import React, { useState, useEffect } from "react";
import { getEvaluacionesEvaluadorInternoModal } from "../../../services/evaluadorInternoServicios";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const apiUrl = process.env.REACT_APP_API_URL;
const token = Cookies.get("token");

let nombre = null;
let apellido = null;
if (token) {
  const decodedToken = decodeToken(token);
  nombre = decodedToken && decodedToken.nombre ? decodedToken.nombre : null;
  apellido =
    decodedToken && decodedToken.apellido ? decodedToken.apellido : null;
}

const ModalEvaluacionesInt = ({ open, handleClose, selectedRow }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (selectedRow && selectedRow.DOC_ID) {
        // console.log("*****id:" + selectedRow.DOC_ID);
        try {
          const result = await getEvaluacionesEvaluadorInternoModal(
            selectedRow.DOC_ID
          );
          setTableData(result.data[0]);
          // console.log("objeto:", JSON.stringify(result.data, null, 2));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedRow]);

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
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="modal-title" gutterBottom>
          Detalles
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Autor"
              value={`${nombre} ${apellido}`}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Coautores"
              value={
                tableData && tableData.DOC_AUTOR ? tableData.DOC_AUTOR : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Formato"
              value={
                tableData &&
                (tableData.DOC_FORMATO === 0 ? "Fisico" : "Digital")
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="ISBN"
              value={tableData && tableData.DOC_ISBN ? tableData.DOC_ISBN : ""}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="N de hojas"
              value={
                tableData && tableData.DOC_NUMERO_HOJAS
                  ? tableData.DOC_NUMERO_HOJAS
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Código"
              value={
                selectedRow && selectedRow.DOC_ID ? selectedRow.DOC_ID : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Título"
              value={
                tableData && tableData.DOC_TITULO ? tableData.DOC_TITULO : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Categoría(1)"
              value={
                tableData && tableData.TIP_NOMBRE_2
                  ? tableData.TIP_NOMBRE_2
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tipo de obra(0)"
              value={
                tableData && tableData.TIP_NOMBRE_1
                  ? tableData.TIP_NOMBRE_1
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
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
            {/* Aquí puedes agregar el componente de carga de archivos */}
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Número de registro"
              value={
                tableData && tableData.DOC_NUMERO_REGISTRO
                  ? tableData.DOC_NUMERO_REGISTRO
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Lugar de registro"
              value={
                tableData && tableData.DOC_LUGAR_REGISTRO
                  ? tableData.DOC_LUGAR_REGISTRO
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button variant="contained" className="cancelButton" onClick={handleClose}>
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalEvaluacionesInt;
