import type {OfficialAccount} from '../models/types';
import {mockOfficialAccountList} from '../models/mockData';

export const fetchOfficialAccountList = async (): Promise<OfficialAccount[]> => mockOfficialAccountList;
