import { Card, ListItem, Stack } from '@mui/material';

interface VideoTagsProps {
  tags: string[];
}

function VideoTags({ tags }: VideoTagsProps) {
  return (
    <Stack direction='row' overflow='hidden' flexWrap='wrap'>
      {tags?.map((tag) => (
        <ListItem
          key={tag}
          sx={{
            paddingY: 0.5,
            paddingX: 1,
            width: 'auto',
            paddingLeft: 0,
            color: 'primary.main',
          }}
        >
          <Card
            sx={{
              backgroundColor: 'rgba(80,80,80,0.4)',
              color: 'primary.main',
              paddingX: 1,
              paddingY: 0.2,
              borderRadius: 3,
            }}
          >
            #{tag}
          </Card>
        </ListItem>
      ))}
    </Stack>
  );
}

export default VideoTags;
