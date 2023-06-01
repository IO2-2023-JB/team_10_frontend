import { Alert, AlertColor, AlertTitle, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useVideoMetadata } from '../../api/video';
import { AUTO_HIDE_DURATION } from '../../const';
import { uploadingVideoState } from '../../data/VideoData';
import { ProcessingProgress, VideoUploadState } from '../../types/VideoTypes';
import { getErrorMessage } from '../../utils/utils';

interface UploadStatusSnackbarContent {
  message: string;
  title?: string;
  severity?: AlertColor;
}

function getMessage(
  uploadState: VideoUploadState | ProcessingProgress
): UploadStatusSnackbarContent {
  switch (uploadState) {
    case VideoUploadState.UploadingMetadata:
      return {
        message: 'Przesyłanie metadanych filmu...',
        title: 'Nie opuszczaj MojeWideło!',
      };
    case VideoUploadState.UploadingVideo:
      return {
        message: 'Przesyłanie filmu...',
        title: 'Nie opuszczaj MojeWideło!',
      };
    case ProcessingProgress.MetadataRecordCreated:
      return { message: 'Przesłano metadane filmu' };
    case ProcessingProgress.Uploading:
      return { message: 'Przesyłanie filmu...' };
    case ProcessingProgress.Uploaded:
      return { message: 'Przesłano film' };
    case ProcessingProgress.Processing:
      return { message: 'Trwa przetwarzanie...' };
    case ProcessingProgress.Ready:
      return { message: 'Pomyślnie przetworzono!', severity: 'success' };
    case ProcessingProgress.FailedToUpload:
      return { message: 'Nie udało się przesłać filmu', severity: 'error' };
    default:
      return { message: 'Status przesyłania nieznany', severity: 'error' };
  }
}

function UploadStatusSnackbar() {
  const [uploadingVideo, setUploadingVideo] = useRecoilState(uploadingVideoState);

  const enabled =
    uploadingVideo !== null && uploadingVideo.state === VideoUploadState.Processing;

  const { data: videoMetadata, error } = useVideoMetadata(
    enabled ? uploadingVideo.id : undefined,
    true
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<UploadStatusSnackbarContent>({ message: '' });
  const [autoHide, setAutoHide] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setContent({
        message: getErrorMessage(error)!,
        title: 'Nie udało się przesłać filmu!',
      });
    }
  }, [error, setContent]);

  useEffect(() => {
    if (uploadingVideo !== null) setIsOpen(true);

    switch (uploadingVideo?.state) {
      case VideoUploadState.UploadingMetadata:
      case VideoUploadState.UploadingVideo:
        setContent(getMessage(uploadingVideo.state));
        break;

      case VideoUploadState.Processing:
        if (videoMetadata !== undefined) {
          const content = getMessage(videoMetadata.processingProgress);
          setContent(content);

          if (
            videoMetadata.processingProgress === ProcessingProgress.FailedToUpload ||
            videoMetadata.processingProgress === ProcessingProgress.Ready
          ) {
            setAutoHide(true);
            setUploadingVideo(null);
          }
        }
        break;
    }
  }, [setContent, setUploadingVideo, uploadingVideo, videoMetadata]);

  const handleClose = () => {
    setIsOpen(false);
    setAutoHide(false);
  };

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={autoHide ? AUTO_HIDE_DURATION : null}
      onClose={(_, reason) => {
        if (reason === 'timeout') handleClose();
      }}
    >
      <Alert severity={content.severity ?? 'info'}>
        {content.title && <AlertTitle>{content.title}</AlertTitle>}
        {content.message}
      </Alert>
    </Snackbar>
  );
}

export default UploadStatusSnackbar;
