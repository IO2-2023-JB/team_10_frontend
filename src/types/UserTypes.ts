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

export type UserDetails = Pick<GetUserDetailsResponse, 'id'> & { token: string };

export enum AccountType {
  Simple = 'Simple',
  Creator = 'Creator',
  Administrator = 'Administrator',
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

export type PostUserDetails = Pick<
  GetUserDetailsResponse,
  'email' | 'nickname' | 'name' | 'surname' | 'userType' | 'avatarImage'
> & { password: string };

export type PutUserDetails = Omit<PostUserDetails, 'email' | 'password'>;
