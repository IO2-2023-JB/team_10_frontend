import { atom } from "recoil";

export const UserData = atom({
    key: "UserData",
    default: {} as UserDetails,
  });

  export const LoggedFlag = atom({
    key: "LoggedFlag",
    default: false,
  });
  
  export interface UserDetails {
    username: string;
    accountType: string;
    token: string;
    email: string;
  }
  