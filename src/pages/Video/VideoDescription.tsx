import { Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { getNumberWithLabel } from '../../utils/words';
import { getTextSummary } from '../../utils/utils';

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
  const viewCountText = getNumberWithLabel(viewCount, 'wyświetlenie');
  const descriptionSummary = getTextSummary(videoDescription, 50, 350);

  const isDescriptionExpandable: boolean =
    videoDescription.length > descriptionSummary.length;
  const description = expanded ? videoDescription : descriptionSummary;

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
          transition: 'background-color ease-in-out 200ms',
          backgroundColor: 'rgba(80,80,80,0.5)',
        },
      }}
    >
      <Stack direction='row' spacing={2}>
        <Typography>{viewCountText}</Typography>
        <Typography>{new Date(uploadDate).toLocaleDateString()}</Typography>
      </Stack>
      <Stack marginTop={1} spacing={1}>
        <Typography>{description}</Typography>
        {isDescriptionExpandable && (
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
