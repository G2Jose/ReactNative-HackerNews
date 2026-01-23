import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient, persister } from '@/lib/query-client';
import { prefetchAllTabs } from '@/services/prefetch';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootContent() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Prefetch all tabs in the background on app launch
    const startPrefetch = async () => {
      try {
        console.log('Starting background prefetch...');
        await prefetchAllTabs();
        console.log('Background prefetch completed');
      } catch (error) {
        console.error('Prefetch error:', error);
      }
    };

    // Start prefetch after a short delay to not block initial render
    const timer = setTimeout(startPrefetch, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RootContent />
    </PersistQueryClientProvider>
  );
}
