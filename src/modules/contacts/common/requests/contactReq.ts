import {http, NetDomain} from '../../../../shared/net';
import type {ContactLite} from '../models/types';
import {mockContactList} from '../models/mockData';

const USE_MOCK = true;

export const fetchContactList = (): Promise<ContactLite[]> =>
  USE_MOCK
    ? Promise.resolve(mockContactList)
    : http.get<ContactLite[]>(NetDomain.User, '/contact/list');
