import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import RenderHTML from 'react-native-render-html';
import type { HNItem } from '@/types/hackernews';
import { fetchItem, formatTimestamp, getDomain, processHNText, processHNHTML } from '@/services/api';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function Comment({ item, depth = 0 }: { item: HNItem; depth?: number }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [collapsed, setCollapsed] = useState(depth > 0);
  const { width } = useWindowDimensions();

  if (!item.text) return null;

  const childCount = item.children ? item.children.length : 0;

  const tagsStyles = {
    body: {
      color: colors.text,
      fontSize: 14,
      lineHeight: 20,
    },
    p: {
      marginTop: 0,
      marginBottom: 8,
    },
    a: {
      color: colors.tint,
      textDecorationLine: 'underline' as const,
    },
    code: {
      fontFamily: 'monospace',
      backgroundColor: colors.border + '20',
      padding: 2,
      borderRadius: 3,
    },
    pre: {
      backgroundColor: colors.border + '20',
      padding: 8,
      borderRadius: 6,
      marginVertical: 8,
    },
  };

  const handleLinkPress = async (_event: any, href: string) => {
    const canOpen = await Linking.canOpenURL(href);
    if (canOpen) {
      await Linking.openURL(href);
    }
  };

  return (
    <View style={[styles.commentContainer, { marginLeft: depth > 0 ? depth * 12 : 0 }]}>
      <View
        style={[
          styles.commentBorder,
          {
            borderLeftColor: depth > 0 ? colors.border : 'transparent',
            paddingLeft: depth > 0 ? 8 : 0,
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => setCollapsed(!collapsed)}
          activeOpacity={0.7}
          style={styles.commentHeader}
        >
          <Text style={[styles.collapseIcon, { color: colors.subtle }]}>
            {collapsed ? '[+]' : '[\u2212]'}
          </Text>
          <Text style={[styles.commentAuthor, { color: colors.tint }]}>
            {item.author}
          </Text>
          <Text style={[styles.commentMeta, { color: colors.subtle }]}>
            {' • '}
            {formatTimestamp(item.created_at_i)}
          </Text>
          {collapsed && childCount > 0 && (
            <Text style={[styles.commentMeta, { color: colors.subtle }]}>
              {' • '}
              {childCount} {childCount === 1 ? 'reply' : 'replies'}
            </Text>
          )}
        </TouchableOpacity>

        {!collapsed && (
          <>
            <RenderHTML
              contentWidth={width - 32 - (depth * 12)}
              source={{ html: processHNHTML(item.text) }}
              tagsStyles={tagsStyles}
              renderersProps={{
                a: {
                  onPress: handleLinkPress,
                },
              }}
            />
            {item.children && item.children.map((child) => (
              <Comment key={child.id} item={child} depth={depth + 1} />
            ))}
          </>
        )}
      </View>
    </View>
  );
}

export default function StoryScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();

  const { data: item, isLoading } = useQuery({
    queryKey: ['story', id],
    queryFn: () => fetchItem(Number(id)),
    enabled: !!id,
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Show header title when scrolled past ~100px (approximate title area)
    setShowHeaderTitle(scrollY > 100);
  };

  const openURL = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  const storyTagsStyles = {
    body: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 22,
    },
    p: {
      marginTop: 0,
      marginBottom: 8,
    },
    a: {
      color: colors.tint,
      textDecorationLine: 'underline' as const,
    },
    code: {
      fontFamily: 'monospace',
      backgroundColor: colors.border + '20',
      padding: 2,
      borderRadius: 3,
    },
    pre: {
      backgroundColor: colors.border + '20',
      padding: 8,
      borderRadius: 6,
      marginVertical: 8,
    },
  };

  const handleLinkPress = async (_event: any, href: string) => {
    const canOpen = await Linking.canOpenURL(href);
    if (canOpen) {
      await Linking.openURL(href);
    }
  };

  if (isLoading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: '',
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.tint,
            headerBackTitle: 'Back',
          }}
        />
        <View style={[styles.centered, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Stack.Screen
          options={{
            title: '',
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.tint,
            headerBackTitle: 'Back',
          }}
        />
        <View style={[styles.centered, { backgroundColor: colors.background }]}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Failed to load story
          </Text>
        </View>
      </>
    );
  }

  const domain = getDomain(item.url);

  return (
    <>
      <Stack.Screen
        options={{
          title: showHeaderTitle ? (item.title || 'Story') : '',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.tint,
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {processHNText(item.title)}
          </Text>
          {domain && item.url && (
            <TouchableOpacity onPress={() => openURL(item.url!)}>
              <Text style={[styles.domain, { color: colors.tint }]}>
                {domain} →
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.meta}>
            <Text style={[styles.metaText, { color: colors.subtle }]}>
              {item.points} points by {item.author}
            </Text>
            <Text style={[styles.metaText, { color: colors.subtle }]}>
              {' • '}
            </Text>
            <Text style={[styles.metaText, { color: colors.subtle }]}>
              {formatTimestamp(item.created_at_i)}
            </Text>
          </View>
          {item.text && (
            <RenderHTML
              contentWidth={width - 32}
              source={{ html: processHNHTML(item.text) }}
              tagsStyles={storyTagsStyles}
              renderersProps={{
                a: {
                  onPress: handleLinkPress,
                },
              }}
            />
          )}
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {item.children && item.children.length > 0 ? (
          <View style={styles.comments}>
            <Text style={[styles.commentsTitle, { color: colors.text }]}>
              {item.children.length} Comments
            </Text>
            {item.children.map((child) => (
              <Comment key={child.id} item={child} />
            ))}
          </View>
        ) : (
          <View style={styles.noComments}>
            <Text style={[styles.noCommentsText, { color: colors.subtle }]}>
              No comments yet
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  domain: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 13,
  },
  storyText: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  comments: {
    padding: 16,
    gap: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentContainer: {
    gap: 6,
  },
  commentBorder: {
    borderLeftWidth: 2,
    paddingLeft: 8,
    gap: 6,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 4,
  },
  collapseIcon: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
    minWidth: 20,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '500',
  },
  commentMeta: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  noComments: {
    padding: 16,
    alignItems: 'center',
  },
  noCommentsText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
  },
});
