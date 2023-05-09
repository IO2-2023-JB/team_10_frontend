import { useUserPlaylists } from '../../../api/playlist';
import ContentSection from '../../../components/layout/ContentSection';
import PlaylistList from './PlaylistList';

interface UserPlaylistsProps {
  userId: string;
}

function UserPlaylists({ userId }: UserPlaylistsProps) {
  const { data: playlists, error, isLoading } = useUserPlaylists(userId);

  return (
    <ContentSection isLoading={isLoading} error={error}>
      {playlists && <PlaylistList playlists={playlists} />}
    </ContentSection>
  );
}

export default UserPlaylists;
