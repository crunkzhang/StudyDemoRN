import type {FriendApplication, AddEntry} from './types';

export const mockApplications: FriendApplication[] = [
  {id: '1', name: '陆涛', source: '来自手机联系人：陆涛', status: 'pending'},
  {id: '2', name: '林夏', source: '朋友验证：同事推荐', status: 'pending'},
  {id: '3', name: '周诗', source: '朋友验证：好久不见', status: 'accepted'},
  {id: '4', name: '吴迪', source: '朋友验证：你好啊',     status: 'expired'},
];

export const mockAddEntries: AddEntry[] = [
  {
    id: 'phone',
    title: '添加手机联系人',
    iconBgColor: '#F39B38',
    jumpUrl: 'wechatrn://contact/addByPhone',
  },
  {
    id: 'qq',
    title: '添加 QQ 好友',
    iconBgColor: '#4D7CFE',
    jumpUrl: 'wechatrn://contact/addByQQ',
  },
];
