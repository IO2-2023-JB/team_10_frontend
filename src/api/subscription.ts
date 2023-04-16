import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Subscription, SubscriptionsList } from '../data/Subscription';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';

const subscriptionsKey = 'subscriptions';

export function isUserSubscribed(userId: string, subscriptions: Subscription[]): boolean {
  return subscriptions.some((sub) => sub.id === userId);
}

export function useSubscriptions(creatorId?: string) {
  return useQuery<SubscriptionsList, AxiosError>({
    queryKey: [subscriptionsKey, creatorId],
    queryFn: async () =>
      (await axios.get(subscriptionsKey, { params: { id: creatorId } })).data,
    enabled: creatorId !== undefined,
  });
}

function useIsSubscribed(creatorId?: string): boolean | undefined {
  const userDetails = useRecoilValue(userDetailsState);
  const { data } = useSubscriptions(creatorId);

  const loggedInUserId = userDetails?.id;

  if (loggedInUserId === undefined || data === undefined) return false;
  return isUserSubscribed(loggedInUserId, data.subscriptions);
}

function usePostSubscription(creatorId?: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: () =>
      axios.post(subscriptionsKey, undefined, { params: { id: creatorId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [subscriptionsKey, creatorId] });
    },
  });
}

function useDeleteSubscription(creatorId?: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: () => axios.delete(subscriptionsKey, { params: { id: creatorId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [subscriptionsKey, creatorId] });
    },
  });
}

export function useSubscribe(creatorId: string) {
  const { mutate: mutateSubscribe } = usePostSubscription(creatorId);
  const { mutate: mutateUnsubscribe } = useDeleteSubscription(creatorId);
  const isSubscribed = useIsSubscribed(creatorId);

  const handleSubscribe = () => {
    isSubscribed ? mutateUnsubscribe() : mutateSubscribe();
  };

  return { isSubscribed, handleSubscribe };
}
