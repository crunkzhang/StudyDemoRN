import type {GroupInfo} from '../models/types';
import {mockGroupChatList} from '../models/mockData';

export const fetchGroupChatList = async (): Promise<GroupInfo[]> => mockGroupChatList;
