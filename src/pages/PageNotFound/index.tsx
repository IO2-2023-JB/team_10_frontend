import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import PageLayout from '../../components/layout/PageLayout';

const notFoundEmojis = ['🥴', '😬', '😓', '😥', '😰', '🤕', '🤯', '☹️', '🥶', '🫠'];
const getRandomEmoji = () =>
  notFoundEmojis[Math.floor(Math.random() * notFoundEmojis.length)];

function PageNotFound() {
  const randomEmoji = useMemo(getRandomEmoji, []);

  return (
    <PageLayout>
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant='h1'>404 {randomEmoji}</Typography>
        <Typography variant='h5'>Strona o tym adresie nie istnieje!</Typography>
      </Stack>
    </PageLayout>
  );
}

export default PageNotFound;
