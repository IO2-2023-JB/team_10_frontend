import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface LoginLayoutProps {
  form: ReactNode;
  buttonText: string;
  buttonHref: string;
  hintText: string;
}

function LoginLayout({ form, buttonText, buttonHref, hintText }: LoginLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        height: '100%',
      }}
    >
      <Box>{form}</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography>{hintText}</Typography>
        <Button variant='contained' href={buttonHref}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginLayout;
