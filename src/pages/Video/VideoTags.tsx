import { Chip, ListItem, Stack } from '@mui/material';

interface VideoTagsProps {
  tags: string[];
}

function VideoTags({ tags }: VideoTagsProps) {
  if (tags.length === 0) return null;

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
          <Chip
            label={`#${tag}`}
            sx={{
              color: 'primary.main',
            }}
          />
        </ListItem>
      ))}
    </Stack>
  );
}

export default VideoTags;
