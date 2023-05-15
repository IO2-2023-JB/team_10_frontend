export interface Subscription {
  id: string;
  nickname: string;
  avatarImage: string | null;
}

export interface SubscriptionsList {
  subscriptions: Subscription[];
}
