import {useEffect, useState} from 'react';
import type {AddEntry, FriendApplication} from '../models/types';
import {
  acceptFriendApplication,
  fetchAddEntries,
  fetchFriendApplications,
} from '../requests/friendRequestReq';

export const useFriendRequest = () => {
  const [list, setList] = useState<FriendApplication[]>([]);
  const [addEntries, setAddEntries] = useState<AddEntry[]>([]);

  useEffect(() => {
    fetchFriendApplications()
      .then(setList)
      .catch(e => console.warn('[newFriend] applications', e));
    fetchAddEntries()
      .then(setAddEntries)
      .catch(e => console.warn('[newFriend] addEntries', e));
  }, []);

  const accept = async (id: string) => {
    try {
      await acceptFriendApplication(id);
      setList(prev =>
        prev.map(x => (x.id === id ? {...x, status: 'accepted'} : x)),
      );
    } catch (e) {
      console.warn('[newFriend] accept', e);
    }
  };

  return {list, addEntries, accept};
};
