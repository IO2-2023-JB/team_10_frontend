import { Avatar as MuiAvatar } from '@mui/material';
import { getInitials, GetUserDetailsResponse } from '../data/UserData';

interface AvatarProps {
  userDetails?: GetUserDetailsResponse;
  size: number;
}

function Avatar({ userDetails, size }: AvatarProps) {
  return (
    <MuiAvatar
      src={userDetails?.avatarImage ?? undefined}
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
