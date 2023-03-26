import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
          width: '60%',
        }}
      >
        <Typography>{hintText}</Typography>
        <Button variant='outlined' component={Link} to={buttonHref}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginLayout;
