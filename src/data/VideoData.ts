import { atom } from 'recoil';
import { UploadingVideo } from '../types/VideoTypes';

export const uploadingVideoState = atom<UploadingVideo | null>({
  key: 'uploadingVideoState',
  default: null,
});
