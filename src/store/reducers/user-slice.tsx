/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValues, SignupType, UpdateProfileType } from "../../types/types";
// import { Navigate } from "react-router-dom";

const initialState: FormValues = {
  Username: null,
  Email: null,
  password: null,
  bio: null,
  avatar: null,
  token: "",
  status: "idle",
  updateStatus: "idle",
  isLoggedIn: false,
  error: null,
};

// экшн для signUp
export const postNewUser = createAsyncThunk<
  any,
  FormValues,
  { rejectValue: string }
>(
  "user/postNewUser",
  async ({ Username, Email, password }, { rejectWithValue }) => {
    const BASE_URL = "https://blog.kata.academy/api";
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          // eslint-disable-next-line prettier/prettier
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: Username,
            email: Email,
            password,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(
          "service is unavailable. Please try again reloading your web-page!",
        );
      }
      const json = response.json();
      return json;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// экшн для logIn
export const loginUser = createAsyncThunk<
  any,
  SignupType,
  { rejectValue: string }
>("user/loginUser", async ({ Email, password, token }, { rejectWithValue }) => {
  const BASE_URL = "https://blog.kata.academy/api";
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: Email,
          password,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(
        "service is unavailable. Please try again reloading your web-page!",
      );
    }

    if (response.status !== 200) {
      throw new Error(
        "invalid login data. Give another try"
      );
    }
    const json = response.json();
    return json;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// экшн для редактирования профиля
export const editProfile = createAsyncThunk<
  any,
  UpdateProfileType,
  { rejectValue: string }
>("user/editProfile", async ({ Username, Email, password, avatar, token }, { rejectWithValue }) => {
  const BASE_URL = "https://blog.kata.academy/api";
  try {
    console.log("incoming data", Username, Email, password, avatar, token);
    const response: any = await fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: Email,
          password,
          username: Username,
          bio: "",
          image: avatar,
        },
      }),
    });
    console.log("upd response", response);
    if (!response.ok) {
      throw new Error(
        "service is unavailable. Please try again reloading your web-page!",
      );
    }

    if (response.status !== 200) {
      throw new Error(
        "Something went wrong. Please give another try"
      );
    }
    const json = response.json();
    console.log("upd data", json);
    return json;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getNewUserInfo(state, action) {
      state.Username = action.payload.Username;
      state.Email = action.payload.Email;
      state.password = action.payload.password;
    },
    logOut(state) {
      console.log("in logout");
      state.isLoggedIn = false;
    },
    removeUserInfo(state) {
      state.Username = null;
      state.Email = null;
      state.password = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postNewUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(postNewUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      state.Username = action.payload.user.username;
      state.Email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.token = action.payload.user.token;
      // сохранить данные пользователя для последующего залогинивания
      localStorage.setItem("token", JSON.stringify(action.payload.user.token));
      localStorage.setItem("username", JSON.stringify(action.payload.user.username));
      localStorage.setItem("Email", JSON.stringify(action.payload.user.email));
      state.error = null;
    });
    builder.addCase(postNewUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      console.log(state.error);
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // сохранить данные пользователя для последующего залогинивания
      localStorage.setItem("username", JSON.stringify(action.payload.user.username));
      localStorage.setItem("Email", JSON.stringify(action.payload.user.email));
      state.Username = action.payload.user.username;
      state.Email = action.payload.user.email;
      state.status = "succeeded";
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
      state.error = action.payload;
      // alert("Неверные пользовательские данные");
      console.log(state.error);
    });
    builder.addCase(editProfile.pending, (state) => {
      state.updateStatus = "loading";
      state.error = null;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.updateStatus = "succeeded";
      console.log("edit succeeded", action.payload.user);
      state.Username = action.payload.user.username;
      state.Email = action.payload.user.email;
      state.avatar = action.payload.user.image;
      state.bio = action.payload.user.bio;
      state.password = action.payload.user.password;
      // сохранить данные пользователя для последующего залогинивания
      localStorage.setItem("username", JSON.stringify(action.payload.user.username));
      localStorage.setItem("Email", JSON.stringify(action.payload.user.email));
      state.error = null;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.updateStatus = "failed";
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const { logOut, getNewUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;
