export type FetchPostsType = {
  articles: ArticleType[];
  articlesCount: number;
};

export type ArticleType = {
  author: {
    following: boolean;
    username: string;
    image: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

export type InitialState = {
  articles: ArticleType[];
  article: ArticleType | null;
  articlesCount: number;
  currentPage: number;
  articlesPerPage: number;
  isLoading: boolean;
  status: string | null;
  error: unknown | null;
};
