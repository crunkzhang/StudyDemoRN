export type FriendRequestStatus = 'pending' | 'accepted' | 'expired';

export interface FriendRequest {
  id: string;
  name: string;
  source: string;
  status: FriendRequestStatus;
}
