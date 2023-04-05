import { Close } from '@mui/icons-material';
import { Dialog, DialogActions, Button, DialogContent } from '@mui/material';
import { ReactNode } from 'react';

interface FormDialogProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

function FormDialog({ children, open, onClose }: FormDialogProps) {
  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: 'background.default',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogActions sx={{ padding: 2 }}>
        <Button size='small' sx={{ width: 60, height: 60 }} onClick={onClose}>
          <Close sx={{ width: 30, height: 30 }} />
        </Button>
      </DialogActions>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default FormDialog;
