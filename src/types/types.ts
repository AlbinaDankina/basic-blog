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

export type FormValues = {
  Username: string | null;
  Email: string | null;
  password: string | null;
  confirmPassword?: string | null;
  token: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  isLoggedIn: boolean;
  error: unknown | null;
  consent?: boolean;
  bio?: string | null;
  avatar?: string | null;
};

export type UpdateProfileType = {
  Username?: string | null;
  Email?: string | null;
  password?: string | null;
  bio?: string | null;
  avatar?: string | null;
  token?: string;
};

export type SignupType = {
  Username?: string | null;
  Email: string | null | undefined;
  password: string | null;
  token?: string;
};

export type NewUser = {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
};

export type MyKnownError = {
  errorMessage: string;
};
