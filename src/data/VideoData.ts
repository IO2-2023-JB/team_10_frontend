import axios from 'axios';
import { atom } from 'recoil';
import { NOTIFICATION_TIMEOUT } from '../const';
import { NOTIFICATION_INTERVAL } from './../const';

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

export const pageNotification = atom<NotificationData | null>({
  key: 'NavbarNotification',
  default: null,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        const intervalId = setInterval(async () => {
          const metadata = (
            await axios.get<GetVideoMetadataResponse>('video-metadata', {
              params: { id: newValue?.videoId },
            })
          ).data;
          let message: string;
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
  videoFile: FormData;
};

export interface GetVideoMetadataResponse extends UploadVideoMetadata {
  id: string;
  authorId: string;
  authorNickname: string;
  viewCount: number;
  processingProgress: ProcessingProgress;
  uploadDate: string;
  editDate: string;
  duration: string;
}

export enum VideoVisibility {
  Private = 'Private',
  Public = 'Public',
}

export enum ProcessingProgress {
  MetadataRecordCreated = 'MetadataRecordCreated',
  Uploading = 'Uploading',
  Uploaded = 'Uploaded',
  FailedToUpload = 'FailedToUpload',
  Processing = 'Processing',
  Ready = 'Ready',
}

export enum InputType {
  Video = 'Video',
  Image = 'Image',
}
