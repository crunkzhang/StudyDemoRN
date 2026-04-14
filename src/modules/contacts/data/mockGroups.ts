export interface GroupInfo { id: string; name: string; memberCount: number; memberNames: string[]; }
export const mockGroups: GroupInfo[] = [
  {id: 'g1', name: 'RN 技术交流群', memberCount: 128, memberNames: ['小李','小王','小张','阿强','Tom','Kelly','Alex','Jenny','Max']},
  {id: 'g2', name: '周末爬山小分队', memberCount: 12, memberNames: ['张三','李四','王五','赵六']},
  {id: 'g3', name: '家人群', memberCount: 6, memberNames: ['爸','妈','哥','姐','我','弟']},
];
