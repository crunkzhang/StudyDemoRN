import type {ContactLite} from '../models/types';
import {mockContactList} from '../models/mockData';

export const fetchContactList = async (): Promise<ContactLite[]> => mockContactList;
