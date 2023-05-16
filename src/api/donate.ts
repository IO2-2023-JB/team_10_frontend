import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const donateKey = 'donate';
const donateSendKey = `${donateKey}/send`;

export function useDonate(creatorId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, number>({
    mutationFn: (amount) =>
      axios.post(donateSendKey, undefined, { params: { id: creatorId, amount } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [donateKey, creatorId] });
    },
  });
}
