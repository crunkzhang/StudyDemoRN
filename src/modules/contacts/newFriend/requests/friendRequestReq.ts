import type {FriendRequest} from '../models/types';
import {mockFriendRequestList} from '../models/mockData';

export const fetchFriendRequestList = async (): Promise<FriendRequest[]> => mockFriendRequestList;
