import { atom } from 'recoil';

export enum AccountType {
  Simple,
  Creator,
  Administrator,
}

export const userDetailsState = atom<UserDetails | null>({
  key: 'UserData',
  default: null,
});

export interface UserDetails {
  username: string;
  accountType: AccountType;
  token: string;
  email: string;
}

export interface PostLoginResponse {
  token: string;
}
