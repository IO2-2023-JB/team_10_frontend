import { Stack, Typography } from '@mui/material';
import { HTMLAttributes } from 'react';
import { ROUTES } from '../../../const';
import { AccountType, GetUserDetailsResponse } from '../../../types/UserTypes';
import {
  NumberDeclinedNoun,
  getNumberWithLabel,
} from '../../../utils/numberDeclinedNouns';
import Avatar from '../../Avatar';
import SearchSuggestionWrapper from './SearchSuggestionWrapper';

interface UserSuggestionProps {
  componentProps: HTMLAttributes<HTMLLIElement>;
  user: GetUserDetailsResponse;
}

function UserSuggestion({ componentProps, user }: UserSuggestionProps) {
  const label =
    user.userType === AccountType.Creator
      ? getNumberWithLabel(user.subscriptionsCount ?? 0, NumberDeclinedNoun.Subscription)
      : 'Widz';

  const url = `${ROUTES.USER}/${user.id}`;

  return (
    <SearchSuggestionWrapper componentProps={componentProps} url={url}>
      <Stack direction='row' spacing={2}>
        <Avatar userDetails={user} size={50} />
        <Stack justifyContent='center'>
          <Typography fontWeight={600}>{user.nickname}</Typography>
          <Typography variant='body2'>{label}</Typography>
        </Stack>
      </Stack>
    </SearchSuggestionWrapper>
  );
}

export default UserSuggestion;
