import { useRecoilValue } from 'recoil';
import PageLayout from '../../components/layout/PageLayout';
import { userDetailsState } from '../../data/UserData';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomepageVideos from './HomepageVideos';
import { Tab, Tabs } from '@mui/material';
import SubscribedVideos from './SubscribedVideos';

enum HomepageTabs {
  AllVideos = '',
  Subscriptions = 'subscriptions',
}

function Homepage() {
  const location = useLocation();
  const { id: userId } = useRecoilValue(userDetailsState)!;

  const defaultTab = HomepageTabs.AllVideos;

  const currentTab = location.pathname.split('/').at(-1) ?? '';
  const subRoutes = Object.values(HomepageTabs) as string[];
  const isIndexRoute = !subRoutes.includes(currentTab);

  if (isIndexRoute) {
    return <Navigate to={defaultTab} replace />;
  }

  return (
    <>
      <PageLayout>
        <Tabs value={currentTab} centered={true} sx={{ marginBottom: 4 }}>
          <Tab
            value={HomepageTabs.AllVideos}
            label='Wszystkie Wideło'
            component={Link}
            to={HomepageTabs.AllVideos}
          />
          <Tab
            value={HomepageTabs.Subscriptions}
            label='Subskrypcje'
            component={Link}
            to={`${HomepageTabs.Subscriptions}`}
          />
        </Tabs>

        <Routes>
          <Route
            path={HomepageTabs.AllVideos}
            element={<HomepageVideos userId={userId} />}
          />
          <Route path={HomepageTabs.Subscriptions} element={<SubscribedVideos />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default Homepage;
