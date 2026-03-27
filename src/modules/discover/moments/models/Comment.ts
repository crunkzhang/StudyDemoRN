export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  replyTo?: {
    userId: string;
    userName: string;
  };
}
