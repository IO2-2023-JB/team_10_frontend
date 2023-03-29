import { Box, Button, Typography, Stack } from '@mui/material';
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
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        height: '100%',
      }}
    >
      <Box>{form}</Box>
      <Stack
        sx={{
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography>{hintText}</Typography>
        <Button variant='outlined' component={Link} to={buttonHref}>
          {buttonText}
        </Button>
      </Stack>
      <Box height={40} />
    </Stack>
  );
}

export default LoginLayout;
