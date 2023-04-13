export interface UploadVideo {
  title: string;
  description: string;
  thumbnail: string | null;
  tags: string[];
  visibility: VideoVisibility;
}

export interface GetVideoMetadataResponse extends UploadVideo {
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

export enum ReactionType {
  Positive = 'Positive',
  Negative = 'Negative',
  None = 'None',
}

export interface ReactionCounts {
  positiveCount: number;
  negativeCount: number;
  currentUserReaction: ReactionType;
}

export interface PostReaction {
  reactionType: ReactionType;
}
