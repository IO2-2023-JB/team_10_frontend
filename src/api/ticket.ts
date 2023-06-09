import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { GetTicket, PostTicket, PutTicket } from '../types/TicketTypes';
import { userDetailsState } from '../data/UserData';
import { useRecoilValue } from 'recoil';

const ticketKey = 'ticket';
// todo: insert 'ticket' and 'ticket/list' paths in axios methods
export function useSendOrResolveTicket(targetId: string, isResponse: boolean) {
  return useMutation<void, AxiosError, string>({
    mutationFn: (message: string) => {
      let body;
      isResponse
        ? (body = { response: message } as PutTicket)
        : (body = { targetId: targetId, reason: message } as PostTicket);

      return isResponse
        ? axios.put('http://localhost:3000/ticket', body, {
            params: { id: targetId },
          })
        : axios.post('http://localhost:3000/ticket', body);
    },
  });
}

export function useTicketList() {
  const loggedInUser = useRecoilValue(userDetailsState);
  return useQuery<GetTicket[], AxiosError>({
    queryKey: [ticketKey, loggedInUser?.id],
    queryFn: async () =>
      (
        await axios.get('http://localhost:3000/ticket/', {
          params: { id: loggedInUser?.id },
        })
      ).data,
  });
}
