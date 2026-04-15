import {http, NetDomain} from '../../../../shared/net';
import {fetchContactList} from '../../common/requests/contactReq';
import {fetchGroupChatList} from '../../groupChat/requests/groupChatReq';
import {fetchOfficialAccountList} from '../../officialAccount/requests/officialAccountReq';
import type {SearchResult} from '../models/types';

const USE_MOCK = true;

const searchLocal = async (key: string): Promise<SearchResult> => {
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

export const searchAll = async (keyword: string): Promise<SearchResult | null> => {
  const key = keyword.trim().toLowerCase();
  if (!key) return null;
  return USE_MOCK
    ? searchLocal(key)
    : http.get<SearchResult>(NetDomain.User, '/search/all', {query: {keyword: key}});
};
