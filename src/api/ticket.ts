import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';
import { GetTicket, PostTicket, PutTicket } from '../types/TicketTypes';

const ticketKey = 'ticket';

export function useSendOrResolveTicket(targetId: string, isResponse: boolean) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: (message: string) => {
      let body;
      isResponse
        ? (body = { response: message } as PutTicket)
        : (body = { targetId: targetId, reason: message } as PostTicket);

      return isResponse
        ? axios.put('ticket', body, {
            params: { id: targetId },
          })
        : axios.post('ticket', body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ticketKey] });
    },
  });
}

export function useTicketList() {
  const loggedInUser = useRecoilValue(userDetailsState);
  return useQuery<GetTicket[], AxiosError>({
    queryKey: [ticketKey, loggedInUser?.id],
    queryFn: async () =>
      (
        await axios.get('ticket/list', {
          params: { id: loggedInUser?.id },
        })
      ).data,
  });
}
