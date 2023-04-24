import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, Stack, Tooltip, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../data/UserData';
import MetadataForm from '../../pages/Video/MetadataForm';
import VideoDelete from '../../pages/Video/VideoDelete';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { useMaxLines } from '../../utils/hooks';
import { Word, getNumberWithLabel } from '../../utils/words';
import VideoThumbnail from './VideoThumbnail';

interface VideoListItemProps {
  videoMetadata: GetVideoMetadataResponse;
  disableAuthorLink: boolean;
}

function VideoListItem({ videoMetadata, disableAuthorLink }: VideoListItemProps) {
  const titleRef = useRef<HTMLAnchorElement>(null);
  const { isEllipsisActive, style: titleMaxLinesStyle } = useMaxLines(1, titleRef);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { style: descriptionMaxLinesStyle } = useMaxLines(2, descriptionRef);

  const navigate = useNavigate();

  const loggedInUser = useRecoilValue(userDetailsState);
  const isAuthor = videoMetadata.authorId === loggedInUser?.id;

  const videoUrl = `/video/${videoMetadata.id}`;

  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
  const isMenuOpen = menuAnchorElement !== null;

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
          {disableAuthorLink ? (
            <Typography>{videoMetadata.authorNickname}</Typography>
          ) : (
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
          )}
          <Typography>·</Typography>
          <Typography>
            {getNumberWithLabel(videoMetadata.viewCount, Word.View)}
          </Typography>
        </Stack>
        <Typography ref={descriptionRef} sx={descriptionMaxLinesStyle}>
          {videoMetadata.description}
        </Typography>
      </Stack>
      {isAuthor && (
        <>
          <Box
            sx={{
              paddingInlineEnd: 1,
              marginInlineStart: 'auto !important',
              alignSelf: 'center',
            }}
          >
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setMenuAnchorElement(event.currentTarget);
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>
          <Menu
            open={isMenuOpen}
            anchorEl={menuAnchorElement}
            onClick={(event) => event.stopPropagation()}
            onClose={() => setMenuAnchorElement(null)}
          >
            <MetadataForm videoMetadata={videoMetadata} asMenuItem />
            <VideoDelete videoId={videoMetadata.id} asMenuItem />
          </Menu>
        </>
      )}
    </Stack>
  );
}

export default VideoListItem;
