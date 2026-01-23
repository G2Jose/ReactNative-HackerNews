import he from 'he';
import type { HNItem, HNStory, SearchResponse, StoryCategory } from '@/types/hackernews';

const BASE_URL = 'https://hn.algolia.com/api/v1';

const CATEGORY_TAGS: Record<StoryCategory, string> = {
  top: 'front_page',
  new: 'story',
  best: 'story',
  ask: 'ask_hn',
  jobs: 'job',
};

export const fetchStories = async (
  category: StoryCategory,
  page: number = 0,
  hitsPerPage: number = 30
): Promise<SearchResponse> => {
  const tag = CATEGORY_TAGS[category];

  const endpoint = category === 'new'
    ? `${BASE_URL}/search_by_date?tags=${tag}&page=${page}&hitsPerPage=${hitsPerPage}`
    : category === 'best'
    ? `${BASE_URL}/search?tags=${tag}&page=${page}&hitsPerPage=${hitsPerPage}`
    : `${BASE_URL}/search?tags=${tag}&page=${page}&hitsPerPage=${hitsPerPage}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch stories: ${response.statusText}`);
  }

  return response.json();
};

export const fetchItem = async (itemId: number): Promise<HNItem> => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch item: ${response.statusText}`);
  }

  return response.json();
};

export const formatTimestamp = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp * 1000;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const getDomain = (url: string | null): string => {
  if (!url) return '';
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return '';
  }
};

export const processHNText = (text: string | null): string => {
  if (!text) return '';
  // Decode HTML entities (&#x2F; -> /), then strip HTML tags (for titles)
  const decoded = he.decode(text);
  return decoded.replace(/<[^>]*>/g, '');
};

export const processHNHTML = (html: string | null): string => {
  if (!html) return '';
  // Only decode HTML entities, keep HTML tags for rendering
  return he.decode(html);
};
