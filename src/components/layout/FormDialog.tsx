import { Close } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import { ReactNode } from 'react';

interface FormDialogProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  disablePadding?: boolean;
}

function FormDialog({
  children,
  open,
  onClose,
  disablePadding = false,
}: FormDialogProps) {
  return (
    <Dialog
      scroll='body'
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: 'background.default',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogActions sx={{ padding: 2, paddingBottom: 0 }}>
        <IconButton onClick={onClose}>
          <Close fontSize='large' />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ padding: disablePadding ? 0 : null }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
