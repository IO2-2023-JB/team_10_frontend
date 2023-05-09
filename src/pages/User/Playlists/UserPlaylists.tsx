import { useRecoilValue } from 'recoil';
import { useUserPlaylists } from '../../../api/playlist';
import ContentSection from '../../../components/layout/ContentSection';
import PlaylistList from './PlaylistList';
import { userDetailsState } from '../../../data/UserData';

interface UserPlaylistsProps {
  userId: string;
}

function UserPlaylists({ userId }: UserPlaylistsProps) {
  const { data: playlists, error, isLoading } = useUserPlaylists(userId);

  const loggedInUser = useRecoilValue(userDetailsState);
  const showVisibility = userId === loggedInUser?.id;

  return (
    <ContentSection isLoading={isLoading} error={error}>
      {playlists && (
        <PlaylistList playlists={playlists} showVisibility={showVisibility} />
      )}
    </ContentSection>
  );
}

export default UserPlaylists;
