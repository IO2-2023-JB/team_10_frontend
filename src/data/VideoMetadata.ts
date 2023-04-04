export interface UploadVideo {
  title: string;
  description: string | null;
  thumbnail: string | null;
  tags: string[] | null;
  visibility: VideoVisibility;
}

export interface GetVideoMetadataResponse extends UploadVideo {
  id: string;
  authorId: string;
  authorNickname: string;
  viewCount: number;
  processingProgress: ProcessingProgress;
  uploadDate: Date;
  editDate: Date;
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
