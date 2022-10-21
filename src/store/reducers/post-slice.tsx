/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleType, FetchPostsType, InitialState } from "../../types/types";

const initialState: InitialState = {
  articles: [],
  article: null,
  articlesCount: 0,
  currentPage: 0,
  articlesPerPage: 20,
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
  },
});

export const { setCurrentPage, setPrevPage, setNextPage } = postsSlice.actions;
export default postsSlice.reducer;
