import { Card, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { transitionLong } from '../../theme';
import { useMaxLines } from '../../utils/hooks';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';

interface VideoDescriptionProps {
  viewCount: number;
  uploadDate: string;
  videoDescription: string;
}

function VideoDescription({
  viewCount,
  uploadDate,
  videoDescription,
}: VideoDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const viewCountText = getNumberWithLabel(viewCount, NumberDeclinedNoun.View);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { isEllipsisActive, style: descriptionMaxLinesStyle } = useMaxLines(
    3,
    descriptionRef
  );

  useEffect(() => {
    setExpanded(false);
  }, [videoDescription]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: 'rgba(80,80,80,0.3)',
        borderRadius: 3,
        '&:hover': {
          transition: transitionLong('background-color'),
          backgroundColor: 'rgba(80,80,80,0.5)',
        },
      }}
    >
      <Stack direction='row' spacing={2}>
        <Typography>{viewCountText}</Typography>
        <Typography>
          {new Date(uploadDate).toLocaleDateString('pl', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
      </Stack>
      <Stack marginTop={1} spacing={1}>
        <Typography ref={descriptionRef} sx={!expanded ? descriptionMaxLinesStyle : null}>
          {videoDescription === '' ? 'Brak opisu' : videoDescription}
        </Typography>
        {(isEllipsisActive || expanded) && (
          <Typography
            onClick={handleExpandClick}
            sx={{
              opacity: '60%',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            {expanded ? 'Pokaż mniej' : 'Pokaż więcej'}
          </Typography>
        )}
      </Stack>
    </Card>
  );
}

export default VideoDescription;
