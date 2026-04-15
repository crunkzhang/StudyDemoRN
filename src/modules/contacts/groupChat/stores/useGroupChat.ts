import {useEffect, useState} from 'react';
import type {GroupInfo} from '../models/types';
import {fetchGroupChatList} from '../requests/groupChatReq';

export const useGroupChat = () => {
  const [list, setList] = useState<GroupInfo[]>([]);
  useEffect(() => {
    fetchGroupChatList().then(setList);
  }, []);
  return {list};
};
