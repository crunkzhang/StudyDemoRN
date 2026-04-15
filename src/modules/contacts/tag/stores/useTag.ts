import {useEffect, useState} from 'react';
import type {TagInfo} from '../models/types';
import {fetchTagList} from '../requests/tagReq';

export const useTag = () => {
  const [list, setList] = useState<TagInfo[]>([]);
  useEffect(() => {
    fetchTagList().then(setList);
  }, []);
  return {list};
};
