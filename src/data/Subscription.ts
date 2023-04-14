export interface SubscriptionDto {
  id: string;
  nickname: string;
  avatarImage: string | null;
}

export interface SubscriptionsListDto {
  subscriptions: SubscriptionDto[];
}
