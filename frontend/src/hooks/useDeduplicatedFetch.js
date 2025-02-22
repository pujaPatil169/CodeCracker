import { useEffect, useRef, useState } from 'react';

// Map to track pending requests
const pendingRequests = new Map();

/**
 * Custom hook for deduplicated API calls
 * @param {Function} fetchFn - The async function to execute
 * @param {string} key - Unique key for the request
 * @returns {Object} - { data, loading, error }
 */
export function useDeduplicatedFetch(fetchFn, key) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!key) return;

    const executeFetch = async () => {
      // Use existing promise if request is already in progress
      if (pendingRequests.has(key)) {
        const existingPromise = pendingRequests.get(key);
        try {
          const result = await existingPromise;
          if (isMounted.current) setData(result);
        } catch (err) {
          if (isMounted.current) setError(err);
        }
        return;
      }

      // Create new promise and store it
      const promise = fetchFn();
      pendingRequests.set(key, promise);

      try {
        if (isMounted.current) setLoading(true);
        const result = await promise;
        if (isMounted.current) setData(result);
      } catch (err) {
        if (isMounted.current) setError(err);
      } finally {
        pendingRequests.delete(key);
        if (isMounted.current) setLoading(false);
      }
    };

    executeFetch();
  }, [fetchFn, key]);

  return { data, loading, error };
}
