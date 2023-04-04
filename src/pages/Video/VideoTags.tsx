import { Card, ListItem, Stack } from '@mui/material';

interface VideoTagsProps {
  tags: string[] | null;
}

function VideoTags({ tags }: VideoTagsProps) {
  return (
    <Stack marginTop={0} direction='row' overflow='hidden' flexWrap='wrap'>
      {tags?.map((tag) => (
        <ListItem
          sx={{
            paddingY: 0.5,
            paddingX: 1,
            width: 'fit-content',
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
