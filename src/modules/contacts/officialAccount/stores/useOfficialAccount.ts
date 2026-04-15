import {useEffect, useState} from 'react';
import type {OfficialAccount} from '../models/types';
import {fetchOfficialAccountList} from '../requests/officialAccountReq';

export const useOfficialAccount = () => {
  const [list, setList] = useState<OfficialAccount[]>([]);
  useEffect(() => {
    fetchOfficialAccountList().then(setList);
  }, []);
  return {list};
};
