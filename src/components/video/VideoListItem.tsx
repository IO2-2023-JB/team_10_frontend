import { Stack, Tooltip, Typography } from '@mui/material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { useMaxLines } from '../../utils/hooks';
import { Word, getNumberWithLabel } from '../../utils/words';
import VideoThumbnail from './VideoThumbnail';

interface VideoListItemProps {
  videoMetadata: GetVideoMetadataResponse;
}

function VideoListItem({ videoMetadata }: VideoListItemProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { isEllipsisActive, style: titleMaxLinesStyle } = useMaxLines(1, titleRef);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { style: descriptionMaxLinesStyle } = useMaxLines(2, descriptionRef);

  return (
    <Stack
      direction='row'
      spacing={1}
      component={Link}
      to={`/video/${videoMetadata.id}`}
      sx={{
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
            fontWeight={600}
            sx={titleMaxLinesStyle}
          >
            {videoMetadata.title}
          </Typography>
        </Tooltip>
        <Typography>{`${videoMetadata.authorNickname} · ${getNumberWithLabel(
          videoMetadata.viewCount,
          Word.View
        )}`}</Typography>
        <Typography ref={descriptionRef} sx={descriptionMaxLinesStyle}>
          {videoMetadata.description}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default VideoListItem;
