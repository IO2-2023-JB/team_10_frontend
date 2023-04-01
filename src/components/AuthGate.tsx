import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';

interface AuthGateProps {
  children: ReactNode;
}

const ALLOWED_PATHS = ['/login', '/register'];
const ONLY_UNAUTHORIZED_PATHS = ['/login', '/register'];

function AuthGate({ children }: AuthGateProps) {
  const userDetails = useRecoilValue(userDetailsState);
  const { pathname } = useLocation();

  const isAuthorized = userDetails !== null;

  if (!isAuthorized && !ALLOWED_PATHS.includes(pathname)) return <Navigate to='/login' />;

  if (isAuthorized && ONLY_UNAUTHORIZED_PATHS.includes(pathname))
    return <Navigate to='/' />;

  return <>{children}</>;
}

export default AuthGate;
