export interface CommentValues {
  id: string;
  authorId: string;
  content: string;
  avatarImage: string;
  nickname: string;
  hasResponses: false;
}

export interface GetComment {
  comments: CommentValues[];
}

export type GetCommentById = CommentValues;

export type GetCommentResponseById = Omit<CommentValues, 'hasResponses'>;
