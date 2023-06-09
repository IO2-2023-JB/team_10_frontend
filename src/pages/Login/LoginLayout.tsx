import { Box, Button, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

interface LoginLayoutProps {
  form: ReactNode;
  buttonText: string;
  buttonHref: string;
  hintText: string;
}

function LoginLayout({ form, buttonText, buttonHref, hintText }: LoginLayoutProps) {
  return (
    <PageLayout>
      <Stack
        spacing={3}
        sx={{
          alignItems: 'center',
          paddingY: 10,
        }}
      >
        <Box width='100%'>{form}</Box>
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
    </PageLayout>
  );
}

export default LoginLayout;
