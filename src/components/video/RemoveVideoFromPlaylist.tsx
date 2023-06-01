import { MenuItem } from '@mui/material';
import { useRemoveVideoFromPlaylist } from '../../api/playlist';

interface RemoveVideoFromPlaylistProps {
  videoId: string;
  playlistId: string;
}

function RemoveVideoFromPlaylist({ videoId, playlistId }: RemoveVideoFromPlaylistProps) {
  const { mutate: removeVideo } = useRemoveVideoFromPlaylist(videoId, playlistId);

  return <MenuItem onClick={() => removeVideo()}>Usuń z grajlisty</MenuItem>;
}

export default RemoveVideoFromPlaylist;
