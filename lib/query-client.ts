import { QueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity, // Keep data in cache forever
      staleTime: Infinity, // Data never becomes stale automatically
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'offlineFirst', // Use cached data when offline
    },
    mutations: {
      retry: 2,
    },
  },
});

export const persister: Persister = {
  persistClient: async (client: PersistedClient) => {
    await AsyncStorage.setItem('HACKERNEWS_CACHE', JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = await AsyncStorage.getItem('HACKERNEWS_CACHE');
    return cache ? JSON.parse(cache) : undefined;
  },
  removeClient: async () => {
    await AsyncStorage.removeItem('HACKERNEWS_CACHE');
  },
};
