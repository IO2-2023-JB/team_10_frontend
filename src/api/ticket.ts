import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { GetTicket, PostTicket } from '../types/TicketTypes';
import { userDetailsState } from '../data/UserData';
import { useRecoilValue } from 'recoil';

const ticketKey = 'ticket';

export function useSendTicket(targetId: string) {
  const body: PostTicket = { targetId: targetId, reason: '' };
  return useMutation<void, AxiosError, string>({
    mutationFn: (reason: string) => {
      body.reason = reason;
      return axios.post('ticket', body);
    },
  });
}

export function useTicketList() {
  const loggedInUser = useRecoilValue(userDetailsState);
  return useQuery<GetTicket[], AxiosError>({
    queryKey: [ticketKey, loggedInUser?.id],
    queryFn: async () =>
      (await axios.get('ticket/list', { params: { id: loggedInUser?.id } })).data,
  });
}
