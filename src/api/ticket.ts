import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { PostTicket } from '../types/TicketTypes';

export function useSendTicket(targetId: string) {
  const body: PostTicket = { targetId: targetId, reason: '' };
  return useMutation<void, AxiosError, string>({
    mutationFn: (reason: string) => {
      body.reason = reason;
      return axios.post('ticket', body);
    },
  });
}
