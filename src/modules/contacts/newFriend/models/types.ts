export type FriendApplicationStatus = 'pending' | 'accepted' | 'expired';

export interface FriendApplication {
  id: string;
  name: string;
  avatar?: string;
  source: string;
  status: FriendApplicationStatus;
}

export interface AddEntry {
  id: string;
  title: string;
  iconUrl?: string;
  iconBgColor: string;
  jumpUrl: string;
}
