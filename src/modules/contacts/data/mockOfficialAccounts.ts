export interface OfficialAccount { id: string; name: string; latest: string; time: string; unread: number; }
export const mockOfficialAccounts: OfficialAccount[] = [
  {id: 'o1', name: '微信派', latest: '微信 8.0.42 版本更新功能说明', time: '昨天', unread: 2},
  {id: 'o2', name: '腾讯科技', latest: '一季度财报解读：AI 增速显著', time: '3-15', unread: 0},
  {id: 'o3', name: 'InfoQ', latest: 'React Native 新架构落地案例', time: '3-14', unread: 1},
];
