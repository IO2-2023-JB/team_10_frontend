import { Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../const';
import { useMobileLayout } from '../../theme';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { useMaxLines } from '../../utils/hooks';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import OneLineTypography from '../OneLineTypography';
import TypographyLink from '../TypographyLink';

interface VideoListItemDetailsProps {
  videoUrl: string;
  videoMetadata: GetVideoMetadataResponse;
  disableAuthorLink: boolean;
}

function VideoListItemDetails({
  videoUrl,
  videoMetadata,
  disableAuthorLink,
}: VideoListItemDetailsProps) {
  const { isMobile, mobileQuery } = useMobileLayout();

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { style: descriptionMaxLinesStyle } = useMaxLines(2, descriptionRef);

  return (
    <Stack spacing={1} padding={1} flex={1}>
      <OneLineTypography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{
          fontWeight: 600,
          color: 'inherit',
          textDecoration: 'none',
        }}
        component={Link}
        to={videoUrl}
      >
        {videoMetadata.title}
      </OneLineTypography>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 0.5,

          [mobileQuery]: {
            flexDirection: 'column',
            '& > .hide-on-mobile': { display: 'none' },
            gap: 0,
          },
        }}
      >
        <TypographyLink
          to={disableAuthorLink ? undefined : `${ROUTES.USER}/${videoMetadata.authorId}`}
        >
          {videoMetadata.authorNickname}
        </TypographyLink>
        <Typography className='hide-on-mobile'>·</Typography>
        <Typography>
          {getNumberWithLabel(videoMetadata.viewCount, NumberDeclinedNoun.View)}
        </Typography>
      </Stack>
      <Typography
        ref={descriptionRef}
        sx={{
          [mobileQuery]: {
            display: 'none',
          },
          ...descriptionMaxLinesStyle,
        }}
      >
        {videoMetadata.description}
      </Typography>
    </Stack>
  );
}

export default VideoListItemDetails;
