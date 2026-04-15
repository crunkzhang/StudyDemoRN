import {http, NetDomain} from '../../../../shared/net';
import type {GameSummary} from '../models/types';
import {mockGames} from '../models/mockData';

const USE_MOCK = true;

export const fetchGames = (): Promise<GameSummary[]> =>
  USE_MOCK
    ? Promise.resolve(mockGames)
    : http.get<GameSummary[]>(NetDomain.Discover, '/game/list');
