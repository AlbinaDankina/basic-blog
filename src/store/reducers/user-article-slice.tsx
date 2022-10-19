/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  UserArticleInitialType,
  NewArticleType,
  PublishedArticle,
} from "../../types/types";

const initialState: UserArticleInitialType = {
  isModalVisible: true,
  isArticlePublished: "idle",
  isArticleUpdated: "idle",
  error: null,
};
// создание новой статьи
export const publishArticle = createAsyncThunk<
  PublishedArticle,
  NewArticleType,
  { rejectValue: string }
>(
  "userArticle/publishArticle",
  async ({ title, description, text, tags, token }, { rejectWithValue }) => {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
      console.log(title, description, text, token);
      const response: any = await fetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body: text,
            tagList: tags,
          },
        }),
      });
      console.log("post-edit response", response);
      if (!response.ok) {
        throw new Error(
          "service is unavailable. Please try again reloading your web-page!",
        );
      }

      if (response.status !== (200 || 201)) {
        throw new Error("Something went wrong. Please give another try");
      }
      const json = response.json();
      console.log("return from create", json);
      return json;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// внести правки в статью
export const updateArticle = createAsyncThunk<
  PublishedArticle,
  NewArticleType,
  { rejectValue: string }
>(
  "userArticle/updateArticle",
  async ({ title, description, text, slug, token }, { rejectWithValue }) => {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
      console.log(title, description, text, token);
      const response: any = await fetch(`${BASE_URL}/articles/${slug}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body: text,
          },
        }),
      });
      console.log("post-edit response", response);
      if (!response.ok) {
        throw new Error(
          "service is unavailable. Please try again reloading your web-page!",
        );
      }

      if (response.status !== (200 || 201)) {
        throw new Error("Something went wrong. Please give another try");
      }
      const json = response.json();
      console.log("return from create", json);
      return json;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const articleSlice = createSlice({
  name: "userArticle",
  initialState,
  reducers: {
    showModal() {},
  },
  extraReducers: (builder) => {
    builder.addCase(publishArticle.pending, (state) => {
      state.isArticlePublished = "loading";
      state.error = null;
    });
    builder.addCase(publishArticle.fulfilled, (state, action) => {
      state.isArticlePublished = "succeeded";
      console.log("publish succeeded", action.payload.article);
      state.error = null;
    });
    builder.addCase(publishArticle.rejected, (state) => {
      state.isArticlePublished = "failed";
      console.log(state.error);
    });
    builder.addCase(updateArticle.pending, (state) => {
      state.isArticleUpdated = "loading";
      state.error = null;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.isArticleUpdated = "succeeded";
      console.log("publish succeeded", action.payload.article);
      state.error = null;
    });
    builder.addCase(updateArticle.rejected, (state) => {
      state.isArticleUpdated = "failed";
      console.log(state.error);
    });
  },
});

export const { showModal } = articleSlice.actions;
export default articleSlice.reducer;
