import {fetchContactList} from '../../common/requests/contactReq';
import {fetchGroupChatList} from '../../groupChat/requests/groupChatReq';
import {fetchOfficialAccountList} from '../../officialAccount/requests/officialAccountReq';
import type {SearchResult} from '../models/types';

export const searchAll = async (keyword: string): Promise<SearchResult | null> => {
  const key = keyword.trim().toLowerCase();
  if (!key) return null;
  const [contacts, groups, official] = await Promise.all([
    fetchContactList(),
    fetchGroupChatList(),
    fetchOfficialAccountList(),
  ]);
  const match = (s: string) => s.toLowerCase().includes(key);
  return {
    contacts: contacts.filter(c => match(c.name) || match(c.wxid)).slice(0, 3),
    groups: groups.filter(g => match(g.name)).slice(0, 3),
    official: official.filter(o => match(o.name) || match(o.latest)).slice(0, 3),
  };
};
