export type ApiItem = {
  _loading?: boolean;
  _loaded?: boolean;
  id: string;
  text?: string;
  by?: string;
  kids?: string[];
  title: string;
  score: number;
  descendants: string[];
  type: string;
};

export type ItemMap = { [key: string]: ApiItem };
