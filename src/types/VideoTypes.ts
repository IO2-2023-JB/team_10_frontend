export interface PutVideoMetadata {
  title: string;
  description: string;
  thumbnail: string | null;
  tags: string[];
  visibility: VideoVisibility;
}

export type PostVideo = PutVideoMetadata & {
  videoFile: FormData | null;
};

export interface GetVideoMetadataResponse extends PutVideoMetadata {
  id: string;
  authorId: string;
  authorNickname: string;
  viewCount: number;
  processingProgress: ProcessingProgress;
  uploadDate: string;
  editDate: string;
  duration: string | null;
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
  FailedToProcess = 'FailedToProcess',
  Processing = 'Processing',
  Ready = 'Ready',
}

export enum ReactionType {
  Positive = 'Positive',
  Negative = 'Negative',
  None = 'None',
}

export interface GetReactionCounts {
  positiveCount: number;
  negativeCount: number;
  currentUserReaction: ReactionType;
}

export interface PostReaction {
  reactionType: ReactionType;
}

export enum InputType {
  Video = 'Video',
  Image = 'Image',
}

export enum VideoUploadState {
  UploadingMetadata,
  UploadingVideo,
  Processing,
}

export type UploadingVideo =
  | {
      id: string;
      state: VideoUploadState.UploadingVideo | VideoUploadState.Processing;
    }
  | {
      id: null;
      state: VideoUploadState.UploadingMetadata;
    };

export interface GetUserVideosResponse {
  videos: GetVideoMetadataResponse[];
}

export type GetSubscribedVideosResponse = GetUserVideosResponse;
