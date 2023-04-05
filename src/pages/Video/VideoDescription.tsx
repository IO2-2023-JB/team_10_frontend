import { Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';

interface VideoDescriptionProps {
  viewCount: number;
  uploadDate: string;
  videoDescription: string;
}

const collapsedDescriptionWordCount = 50;

function prepareDescription(description: string, splice: boolean = true): string {
  if (!splice) return description;
  return description.split(' ').splice(0, collapsedDescriptionWordCount).join(' ') + '…';
}

function VideoDescription({
  viewCount,
  uploadDate,
  videoDescription,
}: VideoDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const viewCountText = `${viewCount} wyświetleń`;
  const isDescriptionExpandable: boolean =
    videoDescription !== null &&
    videoDescription.split(' ').length > collapsedDescriptionWordCount;

  const description = prepareDescription(
    videoDescription,
    isDescriptionExpandable && !expanded
  );

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
