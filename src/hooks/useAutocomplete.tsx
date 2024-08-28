import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import useLocalStorage from './useLocalstorage';

const locationIQTOKEN = process.env.NEXT_PUBLIC_LOCATION_IQ_TOKEN!;
const locationIQURL = `https://api.locationiq.com/v1/autocomplete?key=${locationIQTOKEN}&countrycodes=NG&q=`;

const cache = new Map<string, any[]>();

const fetchAutocompleteResults = async (query: string) => {
  if (cache.has(query)) {
    return cache.get(query);
  }

  try {
    const { data } = await axios.get(`${locationIQURL}${query}`);
    cache.set(query, data);
    return data;
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    throw error;
  }
};

const useAutocomplete = () => {
  const [query, setQuery] = useLocalStorage('locationQuery', '');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedFetch = useMemo(
    () => debounce(async (query: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAutocompleteResults(query);
        setResults(data);
      } catch (error) {
        setError('Failed to fetch autocomplete data');
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query && query.length > 1) {
      debouncedFetch(query);
    } else {
      setResults([]);
      setLoading(false);
    }
    return () => {
      debouncedFetch.cancel();
    };
  }, [query, debouncedFetch]);

  return { query, setQuery, results, loading, error };
};

export default useAutocomplete;
