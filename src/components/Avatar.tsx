import { Avatar as MuiAvatar } from '@mui/material';
import { getInitials } from '../utils/utils';
import { GetUserDetailsResponse } from './../types/UserTypes';
import { useRecoilValue } from 'recoil';
import { AppMode, appModeState } from '../data/AppStateData';

interface AvatarProps {
  userDetails?: GetUserDetailsResponse;
  size: number;
}

function Avatar({ userDetails, size }: AvatarProps) {
  const appMode = useRecoilValue(appModeState);

  return (
    <MuiAvatar
      src={
        appMode.appMode === AppMode.Papiesz
          ? '/papaj-jp2gmd.gif'
          : userDetails?.avatarImage ?? undefined
      }
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        fontWeight: 700,
        backgroundColor: 'primary.main',
      }}
    >
      {userDetails && getInitials(userDetails)}
    </MuiAvatar>
  );
}

export default Avatar;
