import {http, NetDomain} from '../../../../shared/net';
import type {AddEntry, FriendApplication} from '../models/types';
import {mockAddEntries, mockApplications} from '../models/mockData';

// 本页面 mock 开关：联调时改 false
const USE_MOCK = true;

export const fetchFriendApplications = (): Promise<FriendApplication[]> =>
  USE_MOCK
    ? Promise.resolve(mockApplications)
    : http.get<FriendApplication[]>(NetDomain.User, '/friend/applications');

export const acceptFriendApplication = (
  applicationId: string,
): Promise<{ok: true}> =>
  USE_MOCK
    ? Promise.resolve({ok: true})
    : http.post<{ok: true}>(
        NetDomain.User,
        '/friend/applications/accept',
        {body: {applicationId}},
      );

export const fetchAddEntries = (): Promise<AddEntry[]> =>
  USE_MOCK
    ? Promise.resolve(mockAddEntries)
    : http.get<AddEntry[]>(NetDomain.User, '/friend/addEntries');
