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
