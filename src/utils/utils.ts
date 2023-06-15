import { AxiosError } from 'axios';
import { GetUserDetailsResponse } from '../types/UserTypes';
import { TicketStatus, TicketTargetType } from '../types/TicketTypes';

export const shallowComparison = (obj1: object, obj2: object) => {
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
      return Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key];
    })
  );
};

export const toBase64 = (file: Blob) =>
  new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

export function getInitials(userDetails: GetUserDetailsResponse): string {
  return ((userDetails.name[0] ?? '') + (userDetails.surname[0] ?? '')).toUpperCase();
}

export function getCurrentSubroute(path: string, root: string): string {
  root = root.replace('/', '');
  const pathParts = path.split('/');
  const rootIndex = pathParts.indexOf(root);
  return pathParts[rootIndex + 1] ?? '';
}

export function getErrorMessage(error: AxiosError | null): string | null {
  if (error === null) return null;
  if (typeof error.response?.data === 'string' && error.response.data !== '')
    return error.response?.data;
  return error.message;
}

export function removeEmptySearchParams(searchParams: URLSearchParams): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Array.from(searchParams.entries())) {
    if (value) params.append(key, value);
  }
  return params;
}

export const valueAsNumber = (value: string): number | null => {
  if (value === '') return 0;
  const number = parseFloat(value.replace(',', '.'));
  if (isNaN(number)) return null;
  return number;
};

export const translateTicketTargetType = (value: TicketTargetType): string => {
  switch (value) {
    case TicketTargetType.Video:
      return 'wideło';
    case TicketTargetType.Playlist:
      return 'grajlista';
    case TicketTargetType.User:
      return 'konto użytkownika';
    case TicketTargetType.Comment:
      return 'komentarz';
    case TicketTargetType.CommentResponse:
      return 'odpowiedź do komentarza';
  }
};

export const translateTicketStatus = (value: TicketStatus): string => {
  switch (value) {
    case TicketStatus.Resolved:
      return 'rozwiązane';
    case TicketStatus.Submitted:
      return 'oczekuje na odpowiedź';
  }
};
