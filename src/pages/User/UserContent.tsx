import TabRouter from '../../components/TabRouter';
import { AccountType, GetUserDetailsResponse } from '../../types/UserTypes';
import UserSubscriptions from './Subscriptions/UserSubscriptions';
import UserPlaylists from './Playlists/UserPlaylists';
import UserVideos from './UserVideos';

enum UserProfileTabs {
  Videos = 'videos',
  Subscriptions = 'subscriptions',
  Playlists = 'playlists',
}

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserContent({ userDetails }: UserDetailsProps) {
  const defaultTab =
    userDetails.userType === AccountType.Creator
      ? UserProfileTabs.Videos
      : UserProfileTabs.Subscriptions;

  return (
    <TabRouter
      rootPath={userDetails.id}
      defaultTab={defaultTab}
      tabs={[
        {
          path: UserProfileTabs.Videos,
          label: 'Filmy',
          element: <UserVideos userId={userDetails.id} />,
          show: userDetails.userType === AccountType.Creator,
        },
        {
          path: UserProfileTabs.Subscriptions,
          label: 'Subskrypcje',
          element: <UserSubscriptions userId={userDetails.id} />,
        },
        {
          path: UserProfileTabs.Playlists,
          label: 'Playlisty',
          element: <UserPlaylists userId={userDetails.id} />,
        },
      ]}
    />
  );
}

export default UserContent;
