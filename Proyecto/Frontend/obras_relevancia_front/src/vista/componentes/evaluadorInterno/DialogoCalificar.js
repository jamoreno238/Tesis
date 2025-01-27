import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const DialogoCalificar = ({ isOpen, onAccept, onCancel}) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Enviar Evaluación</DialogTitle>
      <DialogContent>
      Estas seguro que deseas enviar la evaluación
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

export default DialogoCalificar;

