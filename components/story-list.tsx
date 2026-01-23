import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { HNStory, StoryCategory } from '@/types/hackernews';
import { fetchStories, formatTimestamp, getDomain, processHNText } from '@/services/api';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { OfflineBanner } from '@/components/offline-banner';

type StoryListProps = {
  category: StoryCategory;
};

export function StoryList({ category }: StoryListProps) {
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['stories', category],
    queryFn: ({ pageParam = 0 }) => fetchStories(category, pageParam, 30),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return nextPage < lastPage.nbPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  });

  const stories = data?.pages.flatMap((page) => page.hits) ?? [];

  const handleRefresh = async () => {
    setLastUpdated(Date.now());
    await refetch();
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleStoryPress = (story: HNStory) => {
    router.push({
      pathname: '/story/[id]',
      params: {
        id: story.objectID,
        title: story.title,
      },
    });
  };

  const renderStory = ({ item, index }: { item: HNStory; index: number }) => {
    const domain = getDomain(item.url);

    return (
      <TouchableOpacity
        style={[styles.storyItem, { borderBottomColor: colors.icon + '30' }]}
        onPress={() => handleStoryPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.storyHeader}>
          <Text style={[styles.storyIndex, { color: colors.subtle }]}>
            {index + 1}.
          </Text>
          <View style={styles.storyContent}>
            <Text style={[styles.storyTitle, { color: colors.text }]}>
              {processHNText(item.title)}
            </Text>
            {domain && (
              <Text style={[styles.storyDomain, { color: colors.subtle }]}>
                ({domain})
              </Text>
            )}
            <View style={styles.storyMeta}>
              <Text style={[styles.metaText, { color: colors.subtle }]}>
                {item.points} points by {item.author}
              </Text>
              <Text style={[styles.metaText, { color: colors.subtle }]}>
                {' • '}
              </Text>
              <Text style={[styles.metaText, { color: colors.subtle }]}>
                {formatTimestamp(item.created_at_i)}
              </Text>
              <Text style={[styles.metaText, { color: colors.subtle }]}>
                {' • '}
              </Text>
              <Text style={[styles.metaText, { color: colors.subtle }]}>
                {item.num_comments} comments
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getLastUpdatedText = () => {
    if (!lastUpdated) return null;
    const now = Date.now();
    const diff = now - lastUpdated;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return 'Updated just now';
    if (minutes < 60) return `Updated ${minutes}m ago`;
    if (hours < 24) return `Updated ${hours}h ago`;
    return `Updated ${Math.floor(hours / 24)}d ago`;
  };

  if (isLoading && stories.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <OfflineBanner />
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={(item) => item.objectID}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={colors.tint}
            title={getLastUpdatedText() || ''}
            titleColor={colors.subtle}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color={colors.tint} style={styles.footer} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  storyHeader: {
    flexDirection: 'row',
    gap: 8,
  },
  storyIndex: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 24,
  },
  storyContent: {
    flex: 1,
    gap: 4,
  },
  storyTitle: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  storyDomain: {
    fontSize: 12,
  },
  storyMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
  },
  footer: {
    paddingVertical: 20,
  },
});
