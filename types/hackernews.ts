export type StoryType = 'story' | 'ask' | 'show' | 'job' | 'poll';

export type HNItem = {
  id: number;
  created_at: string;
  created_at_i: number;
  type: StoryType;
  author: string;
  title: string | null;
  url: string | null;
  text: string | null;
  points: number | null;
  parent_id: number | null;
  story_id: number | null;
  children: HNItem[];
  options?: HNItem[];
};

export type HNStory = {
  objectID: string;
  title: string;
  url: string | null;
  author: string;
  points: number;
  num_comments: number;
  created_at: string;
  created_at_i: number;
  _tags: string[];
};

export type SearchResponse = {
  hits: HNStory[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
};

export type StoryCategory = 'top' | 'new' | 'best' | 'ask' | 'jobs';
