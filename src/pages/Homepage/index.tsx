import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import { userDetailsState } from '../../data/UserData';
import { useAllVideos } from './../../api/video';
import VideoList from '../../components/video/VideoList';

function Homepage() {
  const { id: userId } = useRecoilValue(userDetailsState)!;
  const { data: userDetails, error, isLoading } = useUserDetails(userId);
  const { data: allVideos } = useAllVideos();

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {userDetails && (
          <>
            <Typography sx={{ marginBottom: 1 }} fontSize={30}>
              Dostępne filmy:
            </Typography>
            <Stack direction='column' spacing={3}>
              {allVideos !== undefined && <VideoList videos={allVideos} />}
            </Stack>
          </>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default Homepage;
