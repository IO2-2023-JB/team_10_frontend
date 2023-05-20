import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ROUTES } from '../../const';
import { userDetailsState } from '../../data/UserData';
import MetadataForm from '../../pages/Video/MetadataForm';
import VideoDelete from '../../pages/Video/VideoDelete';
import { transitionShort } from '../../theme';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { useMaxLines } from '../../utils/hooks';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import OneLineTypography from '../OneLineTypography';
import RemoveVideoFromPlaylist from './RemoveVideoFromPlaylist';
import TypographyLink from '../TypographyLink';
import VideoThumbnail from './VideoThumbnail';

interface VideoListItemProps {
  videoMetadata: GetVideoMetadataResponse;
  disableAuthorLink: boolean;
  playlistId?: string;
}

function VideoListItem({
  videoMetadata,
  disableAuthorLink,
  playlistId,
}: VideoListItemProps) {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { style: descriptionMaxLinesStyle } = useMaxLines(2, descriptionRef);

  const navigate = useNavigate();

  const loggedInUser = useRecoilValue(userDetailsState);
  const isAuthor = videoMetadata.authorId === loggedInUser?.id;

  const videoUrl = `${ROUTES.VIDEO}/${videoMetadata.id}`;

  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
  const isMenuOpen = menuAnchorElement !== null;

  const showMenu = Boolean(isAuthor || playlistId);

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
        transition: transitionShort('background-color'),
        '&:hover': {
          backgroundColor: 'background.light',
        },
      }}
    >
      <VideoThumbnail videoMetadata={videoMetadata} />
      <Stack spacing={1} padding={1}>
        <OneLineTypography
          variant='h5'
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
        <Stack direction='row' spacing={0.5}>
          <TypographyLink
            to={
              disableAuthorLink ? undefined : `${ROUTES.USER}/${videoMetadata.authorId}`
            }
          >
            {videoMetadata.authorNickname}
          </TypographyLink>
          <Typography>·</Typography>
          <Typography>
            {getNumberWithLabel(videoMetadata.viewCount, NumberDeclinedNoun.View)}
          </Typography>
        </Stack>
        <Typography ref={descriptionRef} sx={descriptionMaxLinesStyle}>
          {videoMetadata.description}
        </Typography>
      </Stack>
      {showMenu && (
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
            {playlistId && (
              <RemoveVideoFromPlaylist
                videoId={videoMetadata.id}
                playlistId={playlistId}
              />
            )}
            {isAuthor && [
              <MetadataForm
                key='MetadataForm'
                videoMetadata={videoMetadata}
                asMenuItem
              />,
              <VideoDelete key='VideoDelete' videoId={videoMetadata.id} asMenuItem />,
            ]}
          </Menu>
        </>
      )}
    </Stack>
  );
}

export default VideoListItem;
