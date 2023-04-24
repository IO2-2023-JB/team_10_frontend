import { Stack, Tooltip, Typography } from '@mui/material';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { useMaxLines } from '../../utils/hooks';
import { Word, getNumberWithLabel } from '../../utils/words';
import VideoThumbnail from './VideoThumbnail';

interface VideoListItemProps {
  videoMetadata: GetVideoMetadataResponse;
}

function VideoListItem({ videoMetadata }: VideoListItemProps) {
  const titleRef = useRef<HTMLAnchorElement>(null);
  const { isEllipsisActive, style: titleMaxLinesStyle } = useMaxLines(1, titleRef);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { style: descriptionMaxLinesStyle } = useMaxLines(2, descriptionRef);

  const navigate = useNavigate();

  const videoUrl = `/video/${videoMetadata.id}`;

  return (
    <Stack
      direction='row'
      spacing={1}
      onClick={() => navigate(videoUrl)}
      sx={{
        cursor: 'pointer',
        color: 'inherit',
        textDecoration: 'none',
        borderRadius: 2,
        transition: 'background-color ease-in-out 100ms',
        '&:hover': {
          backgroundColor: 'background.light',
        },
      }}
    >
      <VideoThumbnail videoMetadata={videoMetadata} />
      <Stack spacing={1} padding={1}>
        <Tooltip title={isEllipsisActive ? videoMetadata.title : null}>
          <Typography
            ref={titleRef}
            variant='h5'
            sx={{
              fontWeight: 600,
              color: 'inherit',
              textDecoration: 'none',
              ...titleMaxLinesStyle,
            }}
            component={Link}
            to={videoUrl}
          >
            {videoMetadata.title}
          </Typography>
        </Tooltip>
        <Stack direction='row' spacing={0.5}>
          <Typography
            onClick={(event) => event.stopPropagation()}
            component={Link}
            to={`/user/${videoMetadata.authorId}`}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {videoMetadata.authorNickname}
          </Typography>
          <Typography>·</Typography>
          <Typography>
            {getNumberWithLabel(videoMetadata.viewCount, Word.View)}
          </Typography>
        </Stack>
        <Typography ref={descriptionRef} sx={descriptionMaxLinesStyle}>
          {videoMetadata.description}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default VideoListItem;
