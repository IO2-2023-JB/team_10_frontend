import axios from 'axios';
import { atom } from 'recoil';
import { NOTIFICATION_TIMEOUT } from '../const';
import { NOTIFICATION_INTERVAL } from './../const';
import {
  ProcessingProgress,
  GetVideoMetadataResponse,
  VideoVisibility,
} from './VideoTypes';

export interface NotificationData {
  videoId: string;
  message: string;
  status: ProcessingProgress;
}

const clearNotif = (
  message: string,
  status: ProcessingProgress,
  intervalId: NodeJS.Timer,
  setSelf: (param: NotificationData | null) => void
) => {
  clearInterval(intervalId);
  setSelf({
    message: message,
    status: status,
    videoId: '',
  });
  setTimeout(() => {
    setSelf(null);
  }, NOTIFICATION_TIMEOUT);
};

export const pageNotificationState = atom<NotificationData | null>({
  key: 'NavbarNotification',
  default: null,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        const intervalId = setInterval(async () => {
          const { data: metadata } = await axios.get<GetVideoMetadataResponse>(
            'video-metadata',
            {
              params: { id: newValue?.videoId },
            }
          );
          let message = '';
          switch (metadata.processingProgress) {
            case ProcessingProgress.FailedToUpload:
              clearNotif(
                'Upload failed.',
                ProcessingProgress.FailedToUpload,
                intervalId,
                setSelf
              );
              break;
            case ProcessingProgress.Ready:
              clearNotif(
                'Video successfully published!',
                ProcessingProgress.Ready,
                intervalId,
                setSelf
              );
              break;
            default:
              message = `Processing state: ${metadata.processingProgress.toString()}.`;
              setSelf({
                message: message,
                status: metadata.processingProgress,
                videoId: metadata.id,
              });
          }
        }, NOTIFICATION_INTERVAL);
      });
    },
  ],
});

export interface UploadVideoMetadata {
  title: string;
  description: string;
  thumbnail: string | null;
  tags: string[];
  visibility: VideoVisibility;
}

export type UploadVideo = UploadVideoMetadata & {
  videoFile: FormData | null;
};
