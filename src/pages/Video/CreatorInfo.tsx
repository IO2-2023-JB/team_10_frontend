import { Avatar, Stack, Typography } from '@mui/material';

const avatarSize = 60;

interface CreatorInfoProps {
  authorAvatar: string | null;
  authorNickname: string;
  subscriptionsCount: number;
}

function CreatorInfo({
  authorAvatar,
  authorNickname,
  subscriptionsCount,
}: CreatorInfoProps) {
  const subscriptionsText = `${subscriptionsCount} subskrypcji`;

  return (
    <Stack direction='row' alignItems='center'>
      <Avatar
        src={authorAvatar!}
        sx={{
          width: avatarSize,
          height: avatarSize,
        }}
      ></Avatar>
      <Stack
        sx={{
          marginX: 2,
        }}
      >
        <Typography variant='h6'>{authorNickname}</Typography>
        <Typography variant='subtitle2'>{subscriptionsText}</Typography>
      </Stack>
    </Stack>
  );
}

export default CreatorInfo;
