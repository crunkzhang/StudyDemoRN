export interface TagInfo { id: string; name: string; count: number; contacts: string[]; }
export const mockTags: TagInfo[] = [
  {id: 't1', name: '同事', count: 12, contacts: ['陈静','王芳','张伟','李娜']},
  {id: 't2', name: '大学同学', count: 23, contacts: ['刘洋','高远','邓超']},
  {id: 't3', name: '家人', count: 6, contacts: ['爸','妈','哥','姐']},
];
