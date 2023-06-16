export interface PostTicket {
  targetId: string;
  reason: string;
}

export enum ButtonType {
  Standard,
  MenuItem,
  Icon,
}

export enum TicketStatus {
  Submitted = 'Submitted',
  Resolved = 'Resolved',
}

export enum TicketTargetType {
  Video = 'Video',
  User = 'User',
  Playlist = 'Playlist',
  Comment = 'Comment',
  CommentResponse = 'CommentResponse',
}
export interface GetTicket {
  ticketId: string;
  submitterId: string;
  targetId: string;
  targetType: TicketTargetType;
  reason: string;
  status: TicketStatus;
  response: string;
}

export interface PutTicket {
  response: string;
}
