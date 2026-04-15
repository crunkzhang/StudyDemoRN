import type {TagInfo} from '../models/types';
import {mockTagList} from '../models/mockData';

export const fetchTagList = async (): Promise<TagInfo[]> => mockTagList;
