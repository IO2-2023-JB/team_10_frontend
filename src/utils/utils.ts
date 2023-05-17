import { AxiosError } from 'axios';
import { GetUserDetailsResponse } from '../types/UserTypes';

export const shallowComparison = (obj1: object, obj2: object) => {
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
      return Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key];
    })
  );
};

export const toBase64 = (file: File) =>
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
  return error.response?.data?.toString() ?? error.message;
}
