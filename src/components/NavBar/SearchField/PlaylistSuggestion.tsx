import { Stack, Typography } from '@mui/material';
import { HTMLAttributes } from 'react';
import { ROUTES } from '../../../const';
import { PlaylistBase } from '../../../types/PlaylistTypes';
import SearchSuggestionWrapper from './SearchSuggestionWrapper';

interface PlaylistSuggestionProps {
  componentProps: HTMLAttributes<HTMLLIElement>;
  playlist: PlaylistBase;
}

function PlaylistSuggestion({ componentProps, playlist }: PlaylistSuggestionProps) {
  const url = `${ROUTES.PLAYLIST}/${playlist.id}`;

  return (
    <SearchSuggestionWrapper componentProps={componentProps} url={url}>
      <Stack justifyContent='center'>
        <Typography fontWeight={600}>{playlist.name}</Typography>
        <Typography variant='body2'>Playlista</Typography>
      </Stack>
    </SearchSuggestionWrapper>
  );
}

export default PlaylistSuggestion;
