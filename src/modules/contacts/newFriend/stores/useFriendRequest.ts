import {useEffect, useState} from 'react';
import type {FriendRequest} from '../models/types';
import {fetchFriendRequestList} from '../requests/friendRequestReq';

export const useFriendRequest = () => {
  const [list, setList] = useState<FriendRequest[]>([]);

  useEffect(() => {
    fetchFriendRequestList().then(setList);
  }, []);

  const accept = (id: string) =>
    setList(prev => prev.map(x => (x.id === id ? {...x, status: 'accepted'} : x)));

  return {list, accept};
};
