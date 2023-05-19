import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';
import { userKey } from './user';

const donateKey = 'donate';
const donateSendKey = `${donateKey}/send`;
const donateWithdrawKey = `${donateKey}/withdraw`;

export function useDonate(creatorId: string) {
  return useMutation<void, AxiosError, number>({
    mutationFn: (amount) =>
      axios.post(donateSendKey, undefined, { params: { id: creatorId, amount } }),
  });
}

export function useWithdraw() {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, number>({
    mutationFn: (amount) =>
      axios.post(donateWithdrawKey, undefined, { params: { amount } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userKey, loggedUserDetails?.id] });
    },
  });
}
