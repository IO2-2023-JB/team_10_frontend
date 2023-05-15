import { useUserVideos } from '../../api/video';
import ContentSection from '../../components/layout/ContentSection';
import VideoList from '../../components/video/VideoList';

interface UserVideosProps {
  userId: string;
}

function UserVideos({ userId }: UserVideosProps) {
  const { data: userVideos, error, isLoading } = useUserVideos(userId);

  return (
    <ContentSection error={error} isLoading={isLoading}>
      {userVideos && <VideoList videos={userVideos.videos} disableAuthorLink />}
    </ContentSection>
  );
}

export default UserVideos;
