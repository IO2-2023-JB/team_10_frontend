import TabRouter from '../../components/TabRouter';
import TabTitle from '../../components/TabTitle';
import PageLayout from '../../components/layout/PageLayout';
import { ROUTES } from '../../const';
import { TabTitles } from '../../const/tab_titles';
import HomepageVideos from './HomepageVideos';
import SubscribedVideos from './SubscribedVideos';

enum HomepageTabs {
  AllVideos = '',
  Subscriptions = 'subscriptions',
}

function Homepage() {
  return (
    <PageLayout>
      <TabTitle title={TabTitles.Homepage} skipBaseTitle />
      <TabRouter
        rootPath={ROUTES.HOMEPAGE}
        defaultTab={HomepageTabs.AllVideos}
        tabs={[
          {
            index: true,
            label: 'Rekomendacje',
            element: <HomepageVideos />,
          },
          {
            path: HomepageTabs.Subscriptions,
            label: 'Subskrypcje',
            element: <SubscribedVideos />,
          },
        ]}
      />
    </PageLayout>
  );
}

export default Homepage;
