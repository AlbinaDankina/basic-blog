/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValues, SignupType } from "../../types/types";
// import { Navigate } from "react-router-dom";

const initialState: FormValues = {
  Username: null,
  Email: null,
  password: null,
  token: null,
  status: "idle",
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getNewUserInfo(state, action) {
      state.Username = action.payload.Username;
      state.Email = action.payload.Email;
      state.password = action.payload.password;
    },
    setUser() {
      // postNewUser();
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
      state.Username = action.payload.user.Username;
      state.Email = action.payload.user.Email;
      state.password = action.payload.user.password;
      state.token = action.payload.user.token;
      localStorage.setItem("token", JSON.stringify(action.payload.user.token)); // сохранить токен для последующих запросов? 
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
    builder.addCase(loginUser.fulfilled, (state) => {
      state.status = "succeeded";
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const { setUser, getNewUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;
