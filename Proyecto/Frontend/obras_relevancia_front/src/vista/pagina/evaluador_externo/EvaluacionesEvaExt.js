import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import Plantilla from "../../componentes/menu/PlantillaEvaExt.js";
import "../../../css/asignarPerfiles.css";
import { useLocation } from "react-router-dom";
import {
  getEvaluacionesEvaluadorExternoModal,
  obtenerRequisitosExt,
  crearInformeExt,
} from "../../../services/evaluadorExternoServicios";
import { calificacionEvaExt } from "../../../services/evaluadorExternoServicios";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import DialogoCalificar from "../../componentes/evaluadorInterno/DialogoCalificar";
import { useNavigate } from "react-router-dom";
import { getUsuariosFiltrado } from "../../../services/evaluadorExternoServicios.js";
import { guardarReporteExterno } from "../../../services/evaluadorExternoServicios.js";
import { cambiarEstadoSolEvaExt } from "../../../services/evaluadorExternoServicios.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const token = Cookies.get("token");
let idEva = null;
let idUsuario = null;
let nombres = null;
let apellidos = null;
let nombreArchivo = "";
if (token) {
  const decodedToken = decodeToken(token);
  idUsuario =
    decodedToken && decodedToken.idUsuario ? decodedToken.idUsuario : null;
  idEva =
    decodedToken && decodedToken.idUsuario ? decodedToken.idUsuario : null;
  nombres = decodedToken && decodedToken.nombre ? decodedToken.nombre : null;
  apellidos =
    decodedToken && decodedToken.apellido ? decodedToken.apellido : null;
}

const EvaluacionesEvaExt = () => {
  const title = "Mis Evaluaciones";

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [tableDataRequisitos, setTableDataRequisitos] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codigo = searchParams.get("codigo");
  const tipo_req = searchParams.get("tipo_req");
  const [isModalOpenCal, setModalOpenCal] = useState(false);
  const [evaluadorData, setEvaluadorData] = useState([]);
  const [tituloObra, setTituloObra] = useState("");
  const [coautores, setCoautores] = useState("");
  const [recomenLogDif, setRecomenLogDif] = useState("");
  const [autorNombre, setAutorNombre] = useState("");
  const [autorApellido, setAutorApellido] = useState("");
  const [idSolicitud, setIdSolicitud] = useState("");
  const [
    allCheckboxesSelectedSecondTable,
    setAllCheckboxesSelectedSecondTable,
  ] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!idUsuario) {
          console.error("idUsuario no está definido");
          return;
        }

        const result = await getEvaluacionesEvaluadorExternoModal(codigo);
        setTableData(result.data);
        setTituloObra(result.data[0].DOC_TITULO);
        setCoautores(result.data[0].DOC_AUTOR);
        setAutorNombre(result.data[0].PER_NOMBRE);
        setAutorApellido(result.data[0].PER_APELLIDO);
        setIdSolicitud(result.data[0].SOL_ID);
        //console.log("dato de result:", JSON.stringify(result.data, null, 2));

        const requisitos = await obtenerRequisitosExt(tipo_req);
        setTableDataRequisitos(requisitos.data);
        //console.log("dato de requisitos", JSON.stringify(result.data, null, 2));

        const evaluadorResponse = await getUsuariosFiltrado(idUsuario);
        const evaluador = evaluadorResponse.data[0];
        setEvaluadorData(evaluador);
        //console.log("dato de evaluador:", JSON.stringify(result.data, null, 2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [codigo, tipo_req]);

  useEffect(() => {
    // Verifica si todos los checkboxes de la segunda tabla están seleccionados
    const areAllCheckboxesSelected = tableDataRequisitos.every(
      (_, index) => checkboxStates[index]
    );
    setAllCheckboxesSelectedSecondTable(areAllCheckboxesSelected);
  }, [checkboxStates, tableDataRequisitos]);

  const handleCheckboxChange = (index) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [observaciones, setObservaciones] = useState("");

  const handleGuardar = async () => {
    setModalOpenCal(true);
  };

  const handleAcceptDelete = async () => {
    // console.log("Entre al principio");
    const allCheckboxesSelected =
      tableData.every((row, index) => checkboxStates[index]) &&
      tableDataRequisitos.length > 0 &&
      tableDataRequisitos.every(
        (row, index) => checkboxStates[tableData.length + index]
      );
    const cedulaAguardar = evaluadorData ? evaluadorData.PER_CEDULA : "";
    const nombreArchivoGuardar = `${cedulaAguardar}-${codigo}-Evaluacion.pdf`;
    let valorRecomendador = null;

    const selectedCheckboxCount = Object.values(checkboxStates).filter(
      (isChecked) => isChecked
    ).length;

    // Imprimir el resultado en la consola

    if (tipo_req == "A") {
      if (selectedCheckboxCount === 3 || selectedCheckboxCount === 4) {
        valorRecomendador = "Relevante";
      } else if (selectedCheckboxCount === 2) {
        valorRecomendador = "Casi Relevante";
      } else if (selectedCheckboxCount === 1) {
        valorRecomendador = "Poco Relevante";
      } else if (selectedCheckboxCount === 0) {
        valorRecomendador = "No Relevante";
      }
    }

    if (tipo_req == "B") {
      if (selectedCheckboxCount === 4 || selectedCheckboxCount === 5) {
        valorRecomendador = "Relevante";
      } else if (selectedCheckboxCount === 3) {
        valorRecomendador = "Casi Relevante";
      } else if (selectedCheckboxCount === 2) {
        valorRecomendador = "Poco Relevante";
      } else if (selectedCheckboxCount === 0 || selectedCheckboxCount === 1) {
        valorRecomendador = "No Relevante";
      }
    }
    if (tipo_req == "C") {
      if (selectedCheckboxCount === 1 || selectedCheckboxCount === 2) {
        valorRecomendador = "Relevante";
      } else if (selectedCheckboxCount === 0) {
        valorRecomendador = "No Relevante";
      }
    }

    if (tipo_req == "D") {
      if (selectedCheckboxCount === 1 || selectedCheckboxCount === 2) {
        valorRecomendador = "Relevante";
      } else if (selectedCheckboxCount === 0) {
        valorRecomendador = "No Relevante";
      }
    }
    if (tipo_req == "E") {
      if (selectedCheckboxCount === 2 || selectedCheckboxCount === 3) {
        valorRecomendador = "Relevante";
      } else if (selectedCheckboxCount === 1) {
        valorRecomendador = "Casi Relevante";
      } else if (selectedCheckboxCount === 0) {
        valorRecomendador = "No Relevante";
      }
    }
    setRecomenLogDif(valorRecomendador);
    //console.log(`Valoracion: ${valorRecomendador}`);
    if (allCheckboxesSelected) {
      const infoInforme = tableDataRequisitos
        .map((_, index) => (checkboxStates[index] ? 1 : 0))
        .join(",");

      // Obtén el valor del campo de observaciones
      const infoRecomendacion = observaciones;

      // Obtén el valor del checkbox de relevancia de la tercera tabla
      const infoEstado = checkboxStates[tableDataRequisitos.length] ? 1 : 0;

      // Llama a crearInformeExt con los datos recopilados
      try {
        await crearInformeExt({
          infoEvaluador: idEva,
          infoTipo: tipo_req,
          infoInforme,
          infoRecomendacion,
          infoEstado,
          docId: codigo,
          evaId: idEva,
          infLink: nombreArchivoGuardar,
          infRecomendador: valorRecomendador,
        });
        await generarPDF(valorRecomendador);
        console.log("Informe creado exitosamente");

        const token = Cookies.get("token");

        if (token) {
          const decodedToken = decodeToken(token);

          const datos = {
            estado_so: 0,
            idEva: decodedToken.idUsuario,
            idSolicitud: idSolicitud,
            // otras claves y valores
          };

          calificacionEvaExt(codigo, datos);

          navigate(`/misEvaluacionesEvaExt`);
        }
      } catch (error) {
        console.error("Error al crear el informe 1 :", error);
      }
    } else {
      const infoInforme = tableDataRequisitos
        .map((_, index) => (checkboxStates[index] ? 1 : 0))
        .join(",");

      // Obtén el valor del campo de observaciones
      const infoRecomendacion = observaciones;

      // Obtén el valor del checkbox de relevancia de la tercera tabla
      const infoEstado = checkboxStates[tableDataRequisitos.length] ? 1 : 0;
      console.log("nombre del informe:" + nombreArchivo);
      // Llama a crearInformeExt con los datos recopilados
      try {
        await crearInformeExt({
          infoEvaluador: idEva,
          infoTipo: tipo_req,
          infoInforme,
          infoRecomendacion,
          infoEstado,
          docId: codigo,
          evaId: idEva,
          infLink: nombreArchivoGuardar,
          infRecomendador: valorRecomendador,
        });
        await generarPDF(valorRecomendador);

        const token = Cookies.get("token");

        if (token) {
          const decodedToken = decodeToken(token);

          const datos = {
            estado_so: 1,
            idEva: decodedToken.idUsuario,
            idSolicitud: idSolicitud,
            // otras claves y valores
          };
          // console.log("Entre al rechazado");
          calificacionEvaExt(codigo, datos);

          navigate(`/misEvaluacionesEvaExt`);
        }
      } catch (error) {
        console.error("Error al crear el informe 2 :", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setModalOpenCal(false);
  };

  const generarPDF = async (valorRecomendador) => {
    const nombre = nombres;
    const apellido = apellidos;
    const cedula = evaluadorData ? evaluadorData.PER_CEDULA : "";
    const titulo = evaluadorData ? evaluadorData.ACA_TITULO : "";
    const areaConocimiento = evaluadorData
      ? evaluadorData.ACA_AREA_CONOCIMIENTO
      : "";
    const correoPersonal = evaluadorData
      ? evaluadorData.PER_CORREO_PERSONAL
      : "";
    const telefonoConvencional = evaluadorData
      ? evaluadorData.PER_TELEFONO_CONVENCIONAL
      : "";
    const telefonoCelular = evaluadorData
      ? evaluadorData.PER_TELEFONO_CELULAR
      : "";
    const lugarTrabajo = evaluadorData
      ? evaluadorData.ACA_INSTITUCION_LABOR
      : "";
    const cargo = evaluadorData ? evaluadorData.ACA_CARGO : "";
    // Crear documento PDF
    const doc = new jsPDF();

    // Establecer el tamaño de la página y los márgenes
    const margin = 10;
    const width = doc.internal.pageSize.getWidth() - 2 * margin;
    const height = doc.internal.pageSize.getHeight() - 2 * margin;

    let currentY = margin;

    // Función para agregar texto dentro del borde
    const addText = (text, x, y, options = {}) => {
      const defaultOptions = { align: "left" };
      const { align } = { ...defaultOptions, ...options };
      const textWidth =
        (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      if (align === "center") {
        doc.text(text, x + (width - textWidth) / 2, y);
      } else {
        doc.text(text, x, y);
      }
    };

    // Función para agregar número de página en el encabezado
    const addHeader = () => {
      const totalPages = doc.internal.getNumberOfPages();
      const pageNumberString = `Página ${
        doc.internal.getCurrentPageInfo().pageNumber
      } de ${totalPages}`;
      const pageNumberWidth =
        (doc.getStringUnitWidth(pageNumberString) *
          doc.internal.getFontSize()) /
        doc.internal.scaleFactor;

      doc.setLineWidth(1);
      doc.setDrawColor(0); // Color negro
      doc.line(margin + 10, margin + 15, width - 10, margin + 15); // Línea horizontal
      addText(pageNumberString, width - pageNumberWidth - 10, margin + 10, {
        align: "right",
      });
    };

    // Función para agregar el pie de página con la fecha de evaluación
    const addFooter = () => {
      const currentDate = new Date().toLocaleDateString();
      const footerText = `Fecha de Evaluación: ${currentDate}`;

      doc.setLineWidth(1);
      doc.setDrawColor(0); // Color negro
      doc.line(
        margin + 10,
        height - margin - 5,
        width - 10,
        height - margin - 5
      ); // Línea horizontal
      addText(footerText, margin + 10, height - 10);
    };

    // Agregar título centrado
    doc.setFont("bold");
    doc.setFontSize(16);
    addText("EVALUACIÓN DE OBRA DE RELEVANCIA", margin, currentY + 30, {
      align: "center",
    });
    currentY += 15;

    // Agregar datos de la obra de relevancia
    doc.setFont("bold");
    doc.setFontSize(12);
    addText("DATOS DE LA OBRA DE RELEVANCIA", margin, currentY + 25, {
      align: "center",
    });
    currentY += 15;

    doc.setFont("bold");
    addText(`Título de la obra: `, margin + 10, currentY + 20);
    doc.setFont("normal");
    currentY += 15;
    doc.setFont("bold");
    addText(`${tituloObra} `, margin + 10, currentY + 12);
    doc.setFont("normal");
    currentY += 7;
    doc.setFont("bold");
    addText(`Autores de la obra:  `, margin + 10, currentY + 13);
    doc.setFont("normal");
    currentY += 7;
    addText(
      `${autorNombre} ${autorApellido}, ${coautores} `,
      margin + 10,
      currentY + 13
    );
    doc.setFont("normal");
    currentY += 10;

    /* Primera Tabla */

    // Agregar tipo de obra
    doc.setFontSize(12);
    doc.text("TIPO DE OBRA", margin + 10, currentY + 10);
    currentY += 15;

    // Convertir los datos de la primera tabla a un array de objetos
    const dataPrimeraTabla = tableData.map((row) => ({
      "Tipo de Obra": row.TIP_NOMBRE_1,
      Código: row.DOC_ID,
      "Tipo de Formato":
        row.DOC_FORMATO === 0
          ? "Fisico"
          : row.DOC_FORMATO === 1
          ? "Digital"
          : "",
    }));

    // Agregar la primera tabla
    doc.autoTable({
      startY: currentY,
      head: [
        {
          "Tipo de Obra": "Tipo de Obra",
          Código: "Código",
          "Tipo de Formato": "Tipo de Formato",
        },
      ],
      body: dataPrimeraTabla,
      theme: "striped",
      styles: { halign: "left", cellPadding: 5, fontSize: 10 },
      headStyles: { fillColor: "#457666" },
    });

    /* Segunda Tabla */

    // Agregar requisitos y calificaciones Tabla
    currentY = doc.autoTable.previous.finalY + 10;
    doc.autoTable({
      startY: currentY,
      head: [["Requisitos", "Cumple"]],
      body: tableDataRequisitos.map((row, index) => [
        row.REQ_VALOR,
        checkboxStates[index] ? "Sí" : "No",
      ]),
      theme: "striped",
      styles: { halign: "left" },
      headStyles: { fillColor: "#457666" },
    });

    currentY = doc.autoTable.previous.finalY + 10;

    // Agregar requisitos y calificaciones Tabla

    /* Tercera Tabla */

    doc.autoTable({
      startY: currentY,
      head: [["Requisitos", "Cumple"]],
      body: [
        [
          "Es una obra de Relevancia?",
          checkboxStates[tableDataRequisitos.length] ? "Sí" : "No",
        ],
      ],
      theme: "striped",
      styles: { halign: "left" },
      headStyles: { fillColor: "#457666" },
    });
    // Agregar una nueva página para los datos del evaluador
    doc.addPage();
    currentY = margin; // Reiniciar la posición Y en la nueva página

    // Agregar resumen del sistema
    // Determinar si la evaluación ha sido aceptada o rechazada
    const evaluacion = checkboxStates[tableDataRequisitos.length]
      ? "Aceptada"
      : "Rechazada";

    // Obtener el número de preguntas de la segunda tabla
    const numeroPreguntas = tableDataRequisitos.length;

    // Agregar resumen del sistema
    doc.setFontSize(12);
    const resumenTexto = `RESUMEN DEL SISTEMA: La evaluación ha sido marcada como: ${evaluacion}, debido a que la obra ${
      evaluacion === "Aceptada" ? "" : "NO "
    }CUMPLE con los Requerimientos: ${numeroPreguntas}`;

    const resumenDividido = doc.splitTextToSize(resumenTexto, width - 20); // Ajusta el texto al ancho del margen
    doc.text(resumenDividido, margin + 10, currentY + 30);
    doc.setFont("bold");

    currentY += 15;
    // Agregar recomendación general
    doc.setFontSize(12);
    doc.text(
      "SISTEMA RECOMENDADOR: " + valorRecomendador,
      margin + 10,
      currentY + 30
    );

    currentY += 20;
    // Agregar recomendación general
    doc.setFontSize(12);
    const resumenTexto2 = `RECOMENDACIÓN GENERAL: ` + observaciones;

    const resumenDividido2 = doc.splitTextToSize(resumenTexto2, width - 20); // Ajusta el texto al ancho del margen
    doc.text(resumenDividido2, margin + 10, currentY + 30);

    doc.setFont("bold");
    currentY += 10;
    // Agregar datos del evaluador
    doc.setFontSize(12);
    doc.text("DATOS DEL EVALUADOR", margin + 10, currentY + 40);
    doc.setFont("normal");
    doc.text(
      `Nombres y Apellidos Completos: ${nombre} ${apellido}`,
      margin + 10,
      currentY + 50
    );
    doc.text(
      `Cedula de Identidad (pasaporte): ${cedula}`,
      margin + 10,
      currentY + 60
    );
    doc.text(`Título y grado académico: ${titulo}`, margin + 10, currentY + 70);
    doc.text(
      `Area de Conocimiento: ${areaConocimiento}`,
      margin + 10,
      currentY + 80
    );
    doc.text(
      `Dirección de correo electrónico: ${correoPersonal}`,
      margin + 10,
      currentY + 90
    );
    doc.text(
      `Teléfono de contacto: ${telefonoConvencional} (convencional) / ${telefonoCelular} (celular)`,
      margin + 10,
      currentY + 100
    );
    doc.text(`Lugar de trabajo: ${lugarTrabajo}`, margin + 10, currentY + 110);
    doc.text(`Función / Cargo: ${cargo}`, margin + 10, currentY + 120);

    // Agregar el encabezado y el pie de página en todas las páginas
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setPage(i);
      addHeader();
      addFooter();
    }

    nombreArchivo = `${cedula}-${codigo}-Evaluacion.pdf`;
    // Guardar el documento

    const formData = new FormData();
    formData.append("pdf", doc.output("blob"), nombreArchivo);

    // Adjuntar otros datos si es necesario

    const datos = {
      formData: formData,
      // otras claves y valores
    };

    guardarReporteExterno(datos);
    cambiarEstadoSolEvaExt(idSolicitud);
    // doc.save(nombreArchivo);
  };
  //  console.log("sol id:" + idSolicitud);
  return (
    <Plantilla title={title}>
      <TableContainer component={Paper}>
        {/* Primera Tabla */}
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell>Tipo de Obra</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Tipo de Formato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={`${row.DOC_ID}-${index}`}>
                  <TableCell>{row.TIP_NOMBRE_1}</TableCell>
                  <TableCell>{row.DOC_ID}</TableCell>
                  <TableCell>
                    {row.DOC_FORMATO === 0
                      ? "Fisico"
                      : row.DOC_FORMATO === 1
                      ? "Digital"
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Espacio entre las dos tablas */}
      <div style={{ padding: "10px" }}></div>

      <TableContainer component={Paper}>
        {/* Segunda Tabla */}
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell style={{ width: "80%" }}>Requisitos</TableCell>
              <TableCell>Cumple </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableDataRequisitos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={`${row.DOC_ID}-${index}`}>
                  <TableCell>{row.REQ_VALOR}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={checkboxStates[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Espacio entre las dos tablas */}
      <div style={{ padding: "10px" }}></div>

      <TableContainer component={Paper}>
        {/* Tercera Tabla */}
        <Table stickyHeader>
          <TableHead style={{ backgroundColor: "#d4edd5" }}>
            <TableRow>
              <TableCell style={{ width: "80%" }}>Requisitos</TableCell>
              <TableCell>Cumple </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={1}>
              <TableCell>Es una obra de Relevancia?</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={
                    allCheckboxesSelectedSecondTable &&
                    checkboxStates[tableDataRequisitos.length]
                  }
                  onChange={() => {
                    // Solo permite cambiar el estado del checkbox si todos los de la segunda tabla están seleccionados
                    if (allCheckboxesSelectedSecondTable) {
                      handleCheckboxChange(tableDataRequisitos.length);
                    }
                  }}
                  disabled={!allCheckboxesSelectedSecondTable} // Deshabilita el checkbox si no están todos los de la segunda tabla seleccionados
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Espacio entre las dos tablas */}
      <div style={{ padding: "10px" }}></div>

      <div style={{ marginTop: "20px", width: "100%" }}>
        <TextField
          id="outlined-multiline-static"
          label="Observaciones"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          style={{ backgroundColor: "white" }}
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleGuardar}>
          Guardar
        </Button>
        <Button variant="contained">Volver</Button>
      </div>
      <DialogoCalificar
        isOpen={isModalOpenCal}
        onAccept={handleAcceptDelete}
        onCancel={handleCancelDelete}
        //evaluador={evaluadorToDelete}
      />
    </Plantilla>
  );
};

export default EvaluacionesEvaExt;
