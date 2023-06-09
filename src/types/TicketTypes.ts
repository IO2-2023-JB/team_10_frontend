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

export interface GetTicketStatus {
  status: TicketStatus;
}
export interface GetTicket {
  submitterId: string;
  targetId: string;
  reason: string;
  status: GetTicketStatus;
  response: string;
}
