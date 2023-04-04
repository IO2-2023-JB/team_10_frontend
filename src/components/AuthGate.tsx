import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PATHS_ALLOWED_FOR_UNAUTHORIZED, PATHS_ONLY_FOR_UNAUTHORIZED } from '../const';
import { userDetailsState } from '../data/UserData';

interface AuthGateProps {
  children: ReactNode;
}

function AuthGate({ children }: AuthGateProps) {
  const userDetails = useRecoilValue(userDetailsState);
  const { pathname } = useLocation();

  const isAuthorized = userDetails !== null;

  if (!isAuthorized && !PATHS_ALLOWED_FOR_UNAUTHORIZED.includes(pathname))
    return <Navigate to='/login' />;

  if (isAuthorized && PATHS_ONLY_FOR_UNAUTHORIZED.includes(pathname))
    return <Navigate to='/' />;

  return <>{children}</>;
}

export default AuthGate;
