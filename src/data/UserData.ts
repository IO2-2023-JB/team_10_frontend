import { atom } from 'recoil';
import axios from 'axios';

export const userDetailsState = atom<UserDetails | null>({
  key: 'UserDetails',
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((updatedState) => {
        if (updatedState !== null) {
          localStorage.setItem('bearerToken', updatedState.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${updatedState.token}`;
        } else {
          localStorage.removeItem('bearerToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      });
    },
  ],
});

export type UserDetails = Pick<GetUserDetailsResponse, 'id'> & { token: string };

export interface GetUserDetailsResponse {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  avatarImage: string | null;
  userType: AccountType;
  accountBalance: number | null;
  subscriptionsCount: number | null;
}

export enum AccountType {
  Simple = 'Simple',
  Creator = 'Creator',
  Administrator = 'Administrator',
}

export function getInitials(userDetails: GetUserDetailsResponse): string {
  return ((userDetails.name[0] ?? '') + (userDetails.surname[0] ?? '')).toUpperCase();
}

export function getUserTypeString(userDetails: GetUserDetailsResponse): string {
  switch (userDetails.userType) {
    case AccountType.Simple:
      return 'Widz';
    case AccountType.Creator:
      return 'Twórca';
    case AccountType.Administrator:
      return 'Administrator';
  }
}
