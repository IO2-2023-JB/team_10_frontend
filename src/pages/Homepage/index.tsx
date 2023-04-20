import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import { userDetailsState } from '../../data/UserData';
import { ProcessingProgress } from '../../types/VideoTypes';
import { useAllVideos } from './../../api/video';

function Homepage() {
  const { id: userId } = useRecoilValue(userDetailsState)!;
  const { data: userDetails, error, isLoading } = useUserDetails(userId);
  const { data: allVideos } = useAllVideos();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {userDetails && (
          <>
            <Typography sx={{ marginBottom: 1 }} fontSize={30}>
              Dostępne filmy:
            </Typography>
            <Stack direction='column' spacing={3}>
              {allVideos?.map((x) =>
                x.processingProgress === ProcessingProgress.Ready ? (
                  <Stack
                    key={x.id}
                    spacing={1}
                    onClick={() => {
                      navigate(`/video/${x.id}`);
                    }}
                  >
                    <img
                      height={200}
                      width={300}
                      style={{
                        borderRadius: 10,
                        borderColor: 'black',
                        objectFit: 'cover',
                      }}
                      src={x.thumbnail ?? './public/placeholder_image.webp'}
                    />
                    <Typography fontSize={20}>{x.title}</Typography>
                  </Stack>
                ) : (
                  <></>
                )
              )}
            </Stack>
          </>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default Homepage;
