import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { updateRol } from "../../../services/comiteServicios.js";
import "../../../css/botones.css";

const roles = [
  { id: 1, name: "Secretaria" },
  { id: 2, name: "Miembro de comité" },
  { id: 3, name: "Docente" },
  { id: 4, name: "Evaluador interno" },
  { id: 5, name: "Evaluador externo" },
  { id: 6, name: "Administrador" },
];

const ModalAsignarPerfil = ({
  open,
  handleClose,
  selectedRow,
  selectedRole,
  selectedID,
}) => {
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    if (open && selectedRole) {
      const selectedRoleId = roles.find(
        (role) => role.name === selectedRole
      )?.id;
      setNewRole(selectedRoleId || "");
    }
  }, [open, selectedRole]);

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleGuardar = async () => {
    try {
      await updateRol({ id: selectedID, rol: newRole });
      alert("El rol se ha asignado correctamente");
      handleClose();
    } catch (error) {
      alert("Error al actualizar el rol:", error);
      console.error("Error al actualizar el rol:", error);
    }
  };

  const handleCancelarClick = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 8,
        }}
      >
        <Typography
          variant="h6"
          id="modal-title"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Editar Rol
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2, marginBottom: 1 }}>
          Usuario:{" "}
          {selectedRow &&
            `${selectedRow.PER_NOMBRE} ${selectedRow.PER_APELLIDO}`}
        </Typography>
        <FormControl fullWidth sx={{ mt: 2, marginBottom: 2 }}>
          <InputLabel id="rol-select-label">Rol</InputLabel>
          <Select
            labelId="rol-select-label"
            id="rol-select"
            value={newRole}
            onChange={handleRoleChange}
            label="Rol"
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button onClick={handleCancelarClick} className="cancelButton">
            Cancelar
          </Button>
          <Button
            onClick={handleGuardar}
            className="enviarButton"
            variant="contained"
            sx={{ ml: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAsignarPerfil;
