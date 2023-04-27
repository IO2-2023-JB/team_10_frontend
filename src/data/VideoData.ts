import axios from 'axios';
import { atom } from 'recoil';
import { NOTIFICATION_TIMEOUT } from '../const';
import { NOTIFICATION_INTERVAL } from './../const';
import {
  ProcessingProgress,
  GetVideoMetadataResponse,
  NotificationData,
} from '../types/VideoTypes';

const clearNotif = (
  message: string,
  status: ProcessingProgress,
  intervalId: NodeJS.Timer,
  setSelf: (param: NotificationData) => void
) => {
  clearInterval(intervalId);
  setSelf({
    open: true,
    message: message,
    status: status,
    videoId: '',
  });
  setTimeout(() => {
    setSelf({ open: false, status: status, videoId: '', message: message });
  }, NOTIFICATION_TIMEOUT);
};

export const videoNotificationState = atom<NotificationData>({
  key: 'NavbarNotification',
  default: {
    open: false,
    status: ProcessingProgress.MetadataRecordCreated,
    message: '',
    videoId: '',
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        if (newValue === null) return;
        const intervalId = setInterval(async () => {
          await axios
            .get<GetVideoMetadataResponse>('video-metadata', {
              params: { id: newValue?.videoId },
            })
            .then((res) => {
              const metadata = res.data;
              let message = '';
              switch (metadata.processingProgress) {
                case ProcessingProgress.FailedToUpload:
                  clearNotif(
                    'Publikacja nie powiodła się.',
                    ProcessingProgress.FailedToUpload,
                    intervalId,
                    setSelf
                  );
                  break;
                case ProcessingProgress.Ready:
                  clearNotif(
                    'Publikacja zakończona sukcesem!',
                    ProcessingProgress.Ready,
                    intervalId,
                    setSelf
                  );
                  break;
                default:
                  message = 'Stan publikacji: ';
                  switch (metadata.processingProgress) {
                    case ProcessingProgress.MetadataRecordCreated:
                      message += 'Dane filmu wysłane.';
                      break;
                    case ProcessingProgress.Processing:
                      message += 'Trwa przetwarzanie.';
                      break;
                    case ProcessingProgress.Uploading:
                      message += 'Wysyłanie filmu.';
                      break;
                    case ProcessingProgress.Uploaded:
                      message += 'Wysłano film';
                      break;
                    default:
                      message += 'Trwa publikacja';
                      break;
                  }
                  setSelf({
                    open: true,
                    message: message,
                    status: metadata.processingProgress,
                    videoId: metadata.id,
                  });
              }
            })
            .catch((res) => {
              clearNotif(
                `Błąd połączenia z serwerem: ${res.message}`,
                ProcessingProgress.FailedToUpload,
                intervalId,
                setSelf
              );
            });
        }, NOTIFICATION_INTERVAL);
      });
    },
  ],
});
