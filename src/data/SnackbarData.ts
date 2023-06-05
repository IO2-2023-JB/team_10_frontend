import { atom } from 'recoil';
import { StatusSnackbarData } from '../types/SnackbarTypes';

export const snackbarState = atom<StatusSnackbarData | null>({
  key: 'status',
  default: null,
});
