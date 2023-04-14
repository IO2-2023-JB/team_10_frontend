import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SubscriptionDto, SubscriptionsListDto } from '../data/Subscription';
import { useRecoilState } from 'recoil';
import { userDetailsState } from '../data/UserData';

const subscriptionsKey = 'subscriptions';

export function isUserSubscribed(
  userId?: string,
  subscriptions?: SubscriptionDto[]
): boolean | undefined {
  return subscriptions?.some((sub) => sub.id === userId);
}

export function useSubscriptions(creatorId?: string) {
  return useQuery<SubscriptionsListDto, AxiosError>({
    queryKey: [subscriptionsKey, creatorId],
    queryFn: async () =>
      (await axios.get(subscriptionsKey, { params: { id: creatorId } })).data,
  });
}

export function useIsSubscribed(
  creatorId?: string,
  loggedInUserId?: string
): boolean | undefined {
  const { data } = useSubscriptions(creatorId);

  if (!loggedInUserId) {
    const [userDetails] = useRecoilState(userDetailsState);
    loggedInUserId = userDetails?.id;
  }

  return isUserSubscribed(loggedInUserId, data?.subscriptions);
}

export function usePostSubscription(creatorId?: string) {
  const queryClient = useQueryClient();
  return useMutation<null, AxiosError>({
    mutationFn: () => axios.post(subscriptionsKey, null, { params: { id: creatorId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [subscriptionsKey, creatorId] });
    },
  });
}

export function useDeleteSubscription(creatorId?: string) {
  const queryClient = useQueryClient();
  return useMutation<null, AxiosError>({
    mutationFn: () => axios.delete(subscriptionsKey, { params: { id: creatorId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [subscriptionsKey, creatorId] });
    },
  });
}
