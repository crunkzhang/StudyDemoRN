import type {GroupEntry, GroupInfo} from './types';

export const mockGroupChatList: GroupInfo[] = [
  {id: 'g1', name: 'RN 技术交流群', memberCount: 128, memberNames: ['小李','小王','小张','阿强','Tom','Kelly','Alex','Jenny','Max']},
  {id: 'g2', name: '周末爬山小分队', memberCount: 12, memberNames: ['张三','李四','王五','赵六']},
  {id: 'g3', name: '家人群', memberCount: 6, memberNames: ['爸','妈','哥','姐','我','弟']},
];

export const mockGroupEntries: GroupEntry[] = [
  {id: 'create', title: '发起群聊', iconBgColor: '#07C160', iconKey: 'plus', jumpUrl: 'wechatrn://group/create'},
  {id: 'saved',  title: '保存到通讯录的群聊', iconBgColor: '#4D7CFE', iconKey: 'users', jumpUrl: 'wechatrn://group/saved'},
];
