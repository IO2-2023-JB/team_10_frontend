import { atom } from 'recoil';
import axios from 'axios';

export enum AccountType {
  Simple,
  Creator,
  Administrator,
}

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

export type UserDetails = GetUserDetailsResponse & { token: string };

export interface GetUserDetailsResponse {
  id: string;
  accountBalance: number;
  subscriptionCount: number;
  email: string;
  nickname: string;
  name: string;
  surname: string;
  userType: AccountType;
}
