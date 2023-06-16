import { Close } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import { ReactNode } from 'react';
import { useMobileLayout } from '../../theme';

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
  const { isMobile, desktopQuery } = useMobileLayout();

  return (
    <Dialog
      fullScreen={isMobile}
      scroll='body'
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',

          [desktopQuery]: {
            borderRadius: 3,
          },
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
      <DialogContent
        sx={{
          padding: disablePadding ? 0 : null,
          width: 400,
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
