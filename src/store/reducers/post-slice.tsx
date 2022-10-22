/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ArticleType,
  FetchPostsType,
  InitialState,
  LikeResponseType,
} from "../../types/types";

const initialState: InitialState = {
  articles: [],
  article: null,
  likes: {},
  articlesCount: 0,
  currentPage: 0,
  articlesPerPage: 20,
  favorited: false,
  favoritesCount: 0,
  isLoading: true,
  status: null,
  error: null,
};
export const fetchPosts = createAsyncThunk<FetchPostsType, number>(
  "posts/fetchPosts",
  async function fetchArticles(pageNumber, { rejectWithValue }) {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
      const response = await fetch(`${BASE_URL}/articles?offset=${pageNumber}`);
      const data = await response.json();
      // const posts = await data.articles;
      if (!response.ok) {
        throw new Error(
          "service is unavailable. Please try again reloading your web-page!",
        );
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchArticle = createAsyncThunk<ArticleType, string>(
  "posts/fetchArticle",
  async function fetchSingleArticle(slug, { rejectWithValue }) {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
      const response = await fetch(`${BASE_URL}/articles/${slug}`);
      if (!response.ok) {
        throw new Error(
          "service is unavailable. Please try again reloading your web-page!",
        );
      }
      const data = await response.json();
      return data.article;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const likePost = createAsyncThunk<LikeResponseType, string>(
  "posts/likePost",
  async (slug, { rejectWithValue }) => {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
      const token = JSON.parse(localStorage.getItem("token")!);
      const response = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("error in like adding");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const dislikePost = createAsyncThunk<LikeResponseType, string>(
  "posts/dislikePost",
  async (slug, { rejectWithValue }) => {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
      const token = JSON.parse(localStorage.getItem("token")!);
      const response: any = await fetch(
        `${BASE_URL}/articles/${slug}/favorite`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("error in like adding");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const postsSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPrevPage(state, action) {
      state.currentPage = action.payload - 1;
    },
    setNextPage(state, action) {
      state.currentPage = action.payload + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "resolved";
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.error = null;
      action.payload.articles.forEach((arr) => {
        const id = arr.slug;
        state.likes[id] = arr.favoritesCount;
      });
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.log(state.error);
    });
    builder.addCase(fetchArticle.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.status = "resolved";
      state.article = action.payload;
      state.error = null;
    });
    builder.addCase(fetchArticle.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.log(state.error);
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.status = "resolved";
      state.favorited = true;
      state.favoritesCount = action.payload.article.favoritesCount;
      state.error = null;
      const likedSlug = Object.keys(state.likes).filter((el) => {
        if (el === action.payload.article.slug) {
          return el;
        }
        return null;
      });
      state.likes[likedSlug.join()] += 1;
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.log("error while liking", state.status);
    });
    builder.addCase(dislikePost.fulfilled, (state, action) => {
      state.status = "resolved";
      state.favorited = false;
      state.favoritesCount = action.payload.article.favoritesCount;
      state.error = null;
      const dislikedSlug = Object.keys(state.likes).filter((el) => {
        if (el === action.payload.article.slug) {
          return el;
        }
        return null;
      });
      state.likes[dislikedSlug.join()] -= 1;
    });
    builder.addCase(dislikePost.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.log("error while disliking", state.status);
    });
  },
});

export const { setCurrentPage, setPrevPage, setNextPage } = postsSlice.actions;
export default postsSlice.reducer;
