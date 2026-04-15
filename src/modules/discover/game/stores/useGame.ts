import {useEffect, useState} from 'react';
import type {GameSummary} from '../models/types';
import {fetchGames} from '../requests/gameReq';

export const useGame = () => {
  const [list, setList] = useState<GameSummary[]>([]);
  useEffect(() => {
    fetchGames().then(setList).catch(e => console.warn('[game] list', e));
  }, []);
  return {list};
};
