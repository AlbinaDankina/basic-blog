/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
import {
  UserArticleInitialType,
  NewArticleType,
  PublishedArticle,
  DeleteArticleType,
} from "../../types/types";

const initialState: UserArticleInitialType = {
  isModalVisible: false,
  isArticlePublished: "idle",
  isArticleUpdated: "idle",
  isArticleDeleted: "idle",
  isEdit: false,
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
      if (!response.ok) {
        throw new Error(
          "Ooops, something happened while publishing. See details in NetWork page in DevTools in your browser",
        );
      }

      if (response.status !== (200 || 201)) {
        throw new Error(
          "Something went wrong. See details in NetWork page in DevTools in your browser",
        );
      }
      const json = response.json();
      return json;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// внесение правок в статью
export const updateArticle = createAsyncThunk<
  PublishedArticle,
  NewArticleType,
  { rejectValue: string }
>(
  "userArticle/updateArticle",
  async ({ title, description, text, slug, token }, { rejectWithValue }) => {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
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
      if (!response.ok) {
        throw new Error(
          "Something went wrong. See details in NetWork page in DevTools in your browser",
        );
      }

      if (response.status !== (200 || 201)) {
        throw new Error(
          "Something went wrong. See details in NetWork page in DevTools in your browser",
        );
      }
      const json = response.json();
      return json;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// удаление статьи
export const deleteArticle = createAsyncThunk<
  PublishedArticle,
  DeleteArticleType,
  { rejectValue: string }
>("userArticle/deleteArticle", async ({ slug, token }, { rejectWithValue }) => {
  const BASE_URL = "https://blog.kata.academy/api";
  try {
    const response: any = await fetch(`${BASE_URL}/articles/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log("response in delete", response);
    if (!response.ok) {
      throw new Error(
        "Ooops, something happened while deletion. See details in NetWork page in DevTools in your browser",
      );
    }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const articleSlice = createSlice({
  name: "userArticle",
  initialState,
  reducers: {
    showModal(state) {
      state.isModalVisible = !state.isModalVisible;
    },
    underEdit(state) {
      state.isEdit = true;
    },
    underCreate(state) {
      state.isEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishArticle.pending, (state) => {
      state.isArticlePublished = "loading";
      state.error = null;
    });
    builder.addCase(publishArticle.fulfilled, (state) => {
      state.isArticlePublished = "succeeded";
      state.error = null;
      console.log("publish success");
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
      console.log("upd article succeeded", action.payload.article);
      state.error = null;
    });
    builder.addCase(updateArticle.rejected, (state) => {
      state.isArticleUpdated = "failed";
      console.log(state.error);
    });
    builder.addCase(deleteArticle.pending, (state) => {
      state.isArticleDeleted = "loading";
      state.error = null;
    });
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.isArticleDeleted = "succeeded";
      state.error = null;
    });
    builder.addCase(deleteArticle.rejected, (state) => {
      state.isArticleDeleted = "failed";
      console.log(state.error);
    });
  },
});

export const { showModal, underCreate, underEdit } = articleSlice.actions;
export default articleSlice.reducer;
