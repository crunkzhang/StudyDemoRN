import {useEffect, useState} from 'react';
import type {GroupEntry, GroupInfo} from '../models/types';
import {fetchGroupChatList, fetchGroupEntries} from '../requests/groupChatReq';

export const useGroupChat = () => {
  const [list, setList] = useState<GroupInfo[]>([]);
  const [entries, setEntries] = useState<GroupEntry[]>([]);
  useEffect(() => {
    fetchGroupChatList().then(setList).catch(e => console.warn('[groupChat] list', e));
    fetchGroupEntries().then(setEntries).catch(e => console.warn('[groupChat] entries', e));
  }, []);
  return {list, entries};
};
