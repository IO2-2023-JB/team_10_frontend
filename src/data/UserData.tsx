import { atom } from 'recoil';

export const UserData = atom({
  key: 'UserData',
  default: {} as UserDetails,
});

export interface UserDetails {
  username: string;
  accountType: AccountType;
  token: string;
  email: string;
}

export enum AccountType {
  Simple,
  Creator,
  Administrator,
}
