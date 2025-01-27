import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const DialogoBorrarEva = ({ isOpen, onAccept, onCancel, evaluador }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        {evaluador && (
          <p>{`¿Seguro desea borrar al Evaluador ${evaluador.PER_NOMBRE} ${evaluador.PER_APELLIDO}?`}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onAccept} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogoBorrarEva;

