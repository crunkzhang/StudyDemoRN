import {http, NetDomain} from '../../../../shared/net';
import type {GroupEntry, GroupInfo} from '../models/types';
import {mockGroupChatList, mockGroupEntries} from '../models/mockData';

const USE_MOCK = true;

export const fetchGroupChatList = (): Promise<GroupInfo[]> =>
  USE_MOCK
    ? Promise.resolve(mockGroupChatList)
    : http.get<GroupInfo[]>(NetDomain.User, '/group/list');

export const fetchGroupEntries = (): Promise<GroupEntry[]> =>
  USE_MOCK
    ? Promise.resolve(mockGroupEntries)
    : http.get<GroupEntry[]>(NetDomain.User, '/group/entries');
