import { Stack, Typography } from '@mui/material';
import { HTMLAttributes } from 'react';
import { ROUTES } from '../../../const';
import { GetVideoMetadataResponse } from '../../../types/VideoTypes';
import {
  NumberDeclinedNoun,
  getNumberWithLabel,
} from '../../../utils/numberDeclinedNouns';
import OneLineTypography from '../../OneLineTypography';
import VideoThumbnail from '../../video/VideoThumbnail';
import SearchSuggestionWrapper from './SearchSuggestionWrapper';

interface VideoSuggestionProps {
  componentProps: HTMLAttributes<HTMLLIElement>;
  video: GetVideoMetadataResponse;
}

function VideoSuggestion({ componentProps, video }: VideoSuggestionProps) {
  const url = `${ROUTES.VIDEO}/${video.id}`;

  return (
    <SearchSuggestionWrapper componentProps={componentProps} url={url}>
      <Stack direction='row' spacing={2}>
        <VideoThumbnail videoMetadata={video} height={50} hideDuration />
        <Stack justifyContent='center'>
          <OneLineTypography fontWeight={600}>{video.title}</OneLineTypography>
          <Typography variant='body2'>
            {video.authorNickname} ·{' '}
            {getNumberWithLabel(video.viewCount, NumberDeclinedNoun.View)}
          </Typography>
        </Stack>
      </Stack>
    </SearchSuggestionWrapper>
  );
}

export default VideoSuggestion;
