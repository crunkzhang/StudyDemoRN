import {http, NetDomain} from '../../../../shared/net';
import type {TagInfo} from '../models/types';
import {mockTagList} from '../models/mockData';

const USE_MOCK = true;

export const fetchTagList = (): Promise<TagInfo[]> =>
  USE_MOCK
    ? Promise.resolve(mockTagList)
    : http.get<TagInfo[]>(NetDomain.User, '/tag/list');

export const createTag = (params: {name: string; contactIds: string[]}): Promise<TagInfo> =>
  USE_MOCK
    ? Promise.resolve({id: `tag_${Date.now()}`, name: params.name, count: params.contactIds.length, contacts: params.contactIds})
    : http.post<TagInfo>(NetDomain.User, '/tag/create', {body: params});
