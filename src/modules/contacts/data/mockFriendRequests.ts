export type FriendRequestStatus = 'pending' | 'accepted' | 'expired';
export interface FriendRequest {
  id: string; name: string; source: string; status: FriendRequestStatus;
}
export const mockFriendRequests: FriendRequest[] = [
  {id: '1', name: '陆涛', source: '来自手机联系人：陆涛', status: 'pending'},
  {id: '2', name: '林夏', source: '朋友验证：同事推荐', status: 'pending'},
  {id: '3', name: '周诗', source: '朋友验证：好久不见', status: 'accepted'},
  {id: '4', name: '吴迪', source: '朋友验证：你好', status: 'expired'},
];
