import {useEffect, useState} from 'react';
import {searchAll} from '../requests/searchReq';
import type {SearchResult} from '../models/types';

export const useSearch = () => {
  const [raw, setRaw] = useState('');
  const [debounced, setDebounced] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(raw.trim()), 200);
    return () => clearTimeout(id);
  }, [raw]);

  useEffect(() => {
    searchAll(debounced).then(setResults);
  }, [debounced]);

  return {raw, setRaw, debounced, results};
};
