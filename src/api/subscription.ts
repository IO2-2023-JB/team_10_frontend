import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Subscription, GetSubscriptionsList } from '../data/Subscription';
import { userKey } from './user';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';
import { GetSubscribedVideosResponse } from '../types/VideoTypes';

const subscriptionsKey = 'subscriptions';
const subscribedVideosKey = 'user/videos/subscribed';

export function isUserSubscribed(
  creatorId: string,
  subscriptions: Subscription[]
): boolean {
  return subscriptions.some((sub) => sub.id === creatorId);
}

export function useSubscriptions(userId?: string) {
  return useQuery<GetSubscriptionsList, AxiosError>({
    queryKey: [subscriptionsKey, userId],
    queryFn: async () =>
      (await axios.get(subscriptionsKey, { params: { id: userId } })).data,
    enabled: userId !== undefined,
  });
}

function useIsSubscribed(
  creatorId: string,
  loggedInUserId?: string
): boolean | undefined {
  const { data } = useSubscriptions(loggedInUserId);

  if (data === undefined) return false;
  return isUserSubscribed(creatorId, data.subscriptions);
}

function usePostSubscription(creatorId?: string, loggedInUserId?: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: () =>
      axios.post(subscriptionsKey, undefined, { params: { id: creatorId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [subscriptionsKey, loggedInUserId] });
      queryClient.invalidateQueries({ queryKey: [userKey, creatorId] });
    },
  });
}

function useDeleteSubscription(creatorId?: string, loggedInUserId?: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: () => axios.delete(subscriptionsKey, { params: { id: creatorId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [subscriptionsKey, loggedInUserId] });
      queryClient.invalidateQueries({ queryKey: [userKey, creatorId] });
    },
  });
}

export function useSubscribe(creatorId: string) {
  const userDetails = useRecoilValue(userDetailsState);
  const { mutate: mutateSubscribe } = usePostSubscription(creatorId, userDetails?.id);
  const { mutate: mutateUnsubscribe } = useDeleteSubscription(creatorId, userDetails?.id);
  const isSubscribed = useIsSubscribed(creatorId, userDetails?.id);

  const handleSubscribe = () => {
    isSubscribed ? mutateUnsubscribe() : mutateSubscribe();
  };

  return { isSubscribed, handleSubscribe };
}

export function useSubscribedVideos() {
  const userDetails = useRecoilValue(userDetailsState);

  return useQuery<GetSubscribedVideosResponse, AxiosError>({
    queryKey: [subscribedVideosKey, userDetails?.id],
    queryFn: async () => (await axios.get(subscribedVideosKey)).data,
    enabled: userDetails !== undefined,
  });
}
