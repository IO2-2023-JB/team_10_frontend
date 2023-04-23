import { useRecoilValue } from 'recoil';
import TabRouter from '../../components/TabRouter';
import PageLayout from '../../components/layout/PageLayout';
import { ROUTES } from '../../const';
import { userDetailsState } from '../../data/UserData';
import HomepageVideos from './HomepageVideos';
import SubscribedVideos from './SubscribedVideos';

enum HomepageTabs {
  AllVideos = '',
  Subscriptions = 'subscriptions',
}

function Homepage() {
  const { id: userId } = useRecoilValue(userDetailsState)!;

  return (
    <>
      <PageLayout>
        <TabRouter
          rootPath={ROUTES.HOMEPAGE}
          defaultTab={HomepageTabs.AllVideos}
          tabs={[
            {
              index: true,
              label: 'Wszystkie wideło',
              element: <HomepageVideos userId={userId} />,
            },
            {
              path: HomepageTabs.Subscriptions,
              label: 'Subskrypcje',
              element: <SubscribedVideos />,
            },
          ]}
        />
      </PageLayout>
    </>
  );
}

export default Homepage;
