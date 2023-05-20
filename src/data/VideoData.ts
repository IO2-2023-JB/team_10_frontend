import { atom } from 'recoil';
import { UploadingVideo } from '../types/VideoTypes';

export const uploadingVideoState = atom<UploadingVideo | null>({
  key: 'uploadingVideoState',
  default: null,
});

export const uploadProgressState = atom<number | null>({
  key: 'uploadProgressState',
  default: null,
});
