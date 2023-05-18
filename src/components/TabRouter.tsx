import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ROUTES } from '../const';
import { getCurrentSubroute } from '../utils/utils';

interface SubrouteData {
  path?: string;
  label: string;
  element: ReactNode;
  show?: boolean;
  index?: boolean;
}

interface SubrouteHandlerProps {
  rootPath: string;
  defaultTab: string;
  tabs: SubrouteData[];
}

function TabRouter({ rootPath, defaultTab, tabs }: SubrouteHandlerProps) {
  const location = useLocation();

  let hasIndex = false;
  for (const tab of tabs) {
    if (!tab.index && tab.path === undefined) {
      console.error(`Tab ${tab.label} is not index and does not have a path`);
    }

    if (tab.index) {
      if (!hasIndex) {
        hasIndex = true;
      } else {
        console.error('More than one tab is marked as index!');
      }
    }
  }

  tabs = tabs.map((tab) => ({ ...tab, path: tab.index ? '' : tab.path }));

  const currentTab = getCurrentSubroute(location.pathname, rootPath);
  if (!hasIndex && currentTab === '') {
    return <Navigate to={defaultTab} replace />;
  }

  const pathExists = tabs.find((tab) => tab.path === currentTab) !== undefined;
  if (!pathExists) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return (
    <Box>
      <Tabs value={currentTab} centered={true} sx={{ marginBottom: 4 }}>
        {tabs
          .filter((tab) => tab.show !== false)
          .map((tab) => (
            <Tab
              key={tab.path}
              value={tab.path}
              label={tab.label}
              component={Link}
              to={tab.path ?? rootPath}
            />
          ))}
      </Tabs>
      <Routes>
        {tabs.map((tab) => (
          <Route key={tab.path} index={tab.index} path={tab.path} element={tab.element} />
        ))}
      </Routes>
    </Box>
  );
}

export default TabRouter;
