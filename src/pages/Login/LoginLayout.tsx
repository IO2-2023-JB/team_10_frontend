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
      spacing={3}
      sx={{
        alignItems: 'center',
        paddingBottom: 10,
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
    </Stack>
  );
}

export default LoginLayout;
