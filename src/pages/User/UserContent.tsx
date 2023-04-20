import { Box, Tab, Tabs } from '@mui/material';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AccountType, GetUserDetailsResponse } from '../../types/UserTypes';
import UserSubscriptions from './UserSubscriptions';
import UserVideos from './UserVideos';

enum UserProfileTabs {
  Videos = 'videos',
  Subscriptions = 'subscriptions',
}

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserContent({ userDetails }: UserDetailsProps) {
  const location = useLocation();

  const defaultTab =
    userDetails.userType === AccountType.Creator
      ? UserProfileTabs.Videos
      : UserProfileTabs.Subscriptions;

  const currentTab = location.pathname.split('/').at(-1) ?? '';
  const subRoutes = Object.values(UserProfileTabs) as string[];
  const isIndexRoute = !subRoutes.includes(currentTab);

  if (isIndexRoute) {
    return <Navigate to={defaultTab} />;
  }

  return (
    <>
      <Tabs value={currentTab}>
        {userDetails.userType === AccountType.Creator && (
          <Tab
            value={UserProfileTabs.Videos}
            label='Filmy'
            component={Link}
            to={UserProfileTabs.Videos}
          />
        )}
        <Tab
          value={UserProfileTabs.Subscriptions}
          label='Subskrypcje'
          component={Link}
          to={UserProfileTabs.Subscriptions}
        />
      </Tabs>

      <Box paddingY={2}>
        <Routes>
          <Route
            path={UserProfileTabs.Videos}
            element={<UserVideos userId={userDetails.id} />}
          />
          <Route path={UserProfileTabs.Subscriptions} element={<UserSubscriptions />} />
        </Routes>
      </Box>
    </>
  );
}

export default UserContent;
