import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const BANNER_DISPLAY_DURATION = 4000; // 4 seconds

export function OfflineBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isOffline = !state.isConnected;

      if (isOffline) {
        // Show banner when going offline
        setShowBanner(true);

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Clear any existing timeout
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        // Auto-hide after duration
        hideTimeoutRef.current = setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setShowBanner(false);
          });
        }, BANNER_DISPLAY_DURATION);
      } else {
        // Hide immediately when coming back online
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowBanner(false);
        });
      }
    });

    return () => {
      unsubscribe();
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [fadeAnim]);

  if (!showBanner) return null;

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          backgroundColor: colors.tint,
          opacity: fadeAnim,
        }
      ]}
    >
      <Text style={styles.text}>Offline - Showing cached content</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
