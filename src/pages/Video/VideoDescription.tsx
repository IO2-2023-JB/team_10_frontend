import { Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';

interface VideoDescriptionProps {
  viewCount: number;
  uploadDate: Date;
  videoDescription: string | null;
}

const collapsedDescriptionSize = 50;

function prepareDescription(
  description: string | null,
  splice: boolean = true
): string | null {
  if (!splice) return description;
  return description?.split(' ').splice(0, collapsedDescriptionSize).join(' ') + '...';
}

function VideoDescription({
  viewCount,
  uploadDate,
  videoDescription,
}: VideoDescriptionProps) {
  const viewCountText = `${viewCount} wyświetleń`;
  if (videoDescription === null)
    videoDescription = 'Twórca nie dodał opisu do tego filmu.';
  const isDescriptionExpandable: boolean =
    videoDescription !== null &&
    videoDescription.split(' ').length > collapsedDescriptionSize;

  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState<string | null>(
    prepareDescription(videoDescription, isDescriptionExpandable)
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setDescription(prepareDescription(videoDescription, expanded));
  };

  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: 'rgba(80,80,80,0.3)',
        borderRadius: 3,
        '&:hover': {
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
