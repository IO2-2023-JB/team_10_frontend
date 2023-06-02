import { ReactNode, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../const';

const SwitchBackend = lazy(() => import('../../pages/SwitchBackend'));

interface BackendSwitcherProps {
  children: ReactNode;
}

function BackendSwitcher({ children }: BackendSwitcherProps) {
  const location = useLocation();

  if (location.pathname === ROUTES.SWITCH_BACKEND)
    return (
      <Suspense fallback={null}>
        <SwitchBackend />
      </Suspense>
    );

  return <>{children}</>;
}

export default BackendSwitcher;
