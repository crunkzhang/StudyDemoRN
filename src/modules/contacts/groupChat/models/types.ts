export interface GroupInfo {
  id: string;
  name: string;
  memberCount: number;
  memberNames: string[];
}

export interface GroupEntry {
  id: string;
  title: string;
  iconBgColor: string;
  iconKey: 'plus' | 'users';
  jumpUrl: string;
}
