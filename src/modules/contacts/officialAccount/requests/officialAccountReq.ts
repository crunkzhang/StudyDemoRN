import {http, NetDomain} from '../../../../shared/net';
import type {OfficialAccount} from '../models/types';
import {mockOfficialAccountList} from '../models/mockData';

const USE_MOCK = true;

export const fetchOfficialAccountList = (): Promise<OfficialAccount[]> =>
  USE_MOCK
    ? Promise.resolve(mockOfficialAccountList)
    : http.get<OfficialAccount[]>(NetDomain.User, '/official/list');
