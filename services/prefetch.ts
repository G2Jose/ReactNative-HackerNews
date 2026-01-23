import { queryClient } from '@/lib/query-client';
import { fetchStories, fetchItem } from '@/services/api';
import type { StoryCategory } from '@/types/hackernews';

const CATEGORIES: StoryCategory[] = ['top', 'new', 'best', 'ask', 'jobs'];
const STORIES_TO_PREFETCH = 10;
const CONCURRENT_REQUESTS = 3;

type PrefetchProgress = {
  category: StoryCategory;
  storiesFetched: number;
  totalStories: number;
  detailsFetched: number;
  totalDetails: number;
};

export type PrefetchStatus = {
  isComplete: boolean;
  progress: PrefetchProgress[];
  totalProgress: number; // 0-100
};

let prefetchStatus: PrefetchStatus = {
  isComplete: false,
  progress: [],
  totalProgress: 0,
};

// Helper to batch async operations with concurrency limit
async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = [];
  const queue = [...items];

  const workers = Array(concurrency)
    .fill(null)
    .map(async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (item) {
          try {
            const result = await processor(item);
            results.push(result);
          } catch (error) {
            console.error('Error processing item:', error);
          }
        }
      }
    });

  await Promise.all(workers);
  return results;
}

async function prefetchCategory(category: StoryCategory): Promise<void> {
  const categoryProgress: PrefetchProgress = {
    category,
    storiesFetched: 0,
    totalStories: STORIES_TO_PREFETCH,
    detailsFetched: 0,
    totalDetails: STORIES_TO_PREFETCH,
  };

  prefetchStatus.progress.push(categoryProgress);

  try {
    // Fetch first page of stories (30 stories)
    const page1 = await queryClient.fetchQuery({
      queryKey: ['stories', category, 0],
      queryFn: () => fetchStories(category, 0, 30),
    });

    categoryProgress.storiesFetched = Math.min(30, STORIES_TO_PREFETCH);
    updateTotalProgress();

    let allStories = page1.hits.slice(0, STORIES_TO_PREFETCH);

    // If we need more than 30, fetch second page
    if (STORIES_TO_PREFETCH > 30) {
      const page2 = await queryClient.fetchQuery({
        queryKey: ['stories', category, 1],
        queryFn: () => fetchStories(category, 1, 30),
      });

      allStories = [...allStories, ...page2.hits.slice(0, STORIES_TO_PREFETCH - 30)];
      categoryProgress.storiesFetched = STORIES_TO_PREFETCH;
      updateTotalProgress();
    }

    // Prefetch full story details + comments for each story
    await batchProcess(
      allStories,
      async (story) => {
        try {
          await queryClient.prefetchQuery({
            queryKey: ['story', story.objectID],
            queryFn: () => fetchItem(Number(story.objectID)),
          });
          categoryProgress.detailsFetched++;
          updateTotalProgress();
        } catch (error) {
          console.error(`Error prefetching story ${story.objectID}:`, error);
        }
      },
      CONCURRENT_REQUESTS
    );
  } catch (error) {
    console.error(`Error prefetching category ${category}:`, error);
  }
}

function updateTotalProgress() {
  const totalItems = CATEGORIES.length * STORIES_TO_PREFETCH * 2; // stories + details
  const completedItems = prefetchStatus.progress.reduce(
    (sum, p) => sum + p.storiesFetched + p.detailsFetched,
    0
  );
  prefetchStatus.totalProgress = Math.round((completedItems / totalItems) * 100);
}

export async function prefetchAllTabs(): Promise<void> {
  console.log('Starting prefetch of all tabs...');
  prefetchStatus = {
    isComplete: false,
    progress: [],
    totalProgress: 0,
  };

  try {
    // Prefetch all categories in parallel
    await Promise.all(CATEGORIES.map((category) => prefetchCategory(category)));

    prefetchStatus.isComplete = true;
    prefetchStatus.totalProgress = 100;
    console.log('Prefetch complete!');
  } catch (error) {
    console.error('Error during prefetch:', error);
  }
}

export function getPrefetchStatus(): PrefetchStatus {
  return prefetchStatus;
}

export function resetPrefetchStatus(): void {
  prefetchStatus = {
    isComplete: false,
    progress: [],
    totalProgress: 0,
  };
}
