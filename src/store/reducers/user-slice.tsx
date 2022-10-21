/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValues, SignupType, UpdateProfileType, NewUser } from "../../types/types";
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
        "Please check your email and password.",
      );
    }

    if (response.status !== 200) {
      throw new Error(
        "invalid login data. Give another try"
      );
    }
    const json = await response.json();
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
    return json;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// экшн для вытягивания данных залогиненного юзера
export const getLoggedInUser = createAsyncThunk<
  NewUser,
  void,
  { rejectValue: string }
>("user/getLoggedInUser", async (_, { rejectWithValue }) => {
  const BASE_URL = "https://blog.kata.academy/api";
  const token = JSON.parse(localStorage.getItem("token")!);
  try {
    const response: any = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        "something went wrong while getting info about the logged-in user. Please try again",
      );
    }

    if (response.status !== 200) {
      throw new Error(
        "something went wrong while getting info about the logged-in user. Please try again"
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
    logIn(state) {
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
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
      state.Username = action.payload.user.username;
      state.Email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.token = action.payload.user.token;
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
      // сохранить токен для разлогинивания
      localStorage.setItem("token", JSON.stringify(action.payload.user.token));
      state.Username = action.payload.user.username;
      state.Email = action.payload.user.email;
      state.avatar = action.payload.user.image;
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
    builder.addCase(editProfile.pending, (state) => {
      state.updateStatus = "loading";
      state.error = null;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.updateStatus = "succeeded";
      state.Username = action.payload.user.username;
      state.Email = action.payload.user.email;
      state.avatar = action.payload.user.image;
      state.bio = action.payload.user.bio;
      state.password = action.payload.user.password;
      state.error = null;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.updateStatus = "failed";
      state.error = action.payload;
      console.log(state.error);
    });
    builder.addCase(getLoggedInUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.Username = action.payload.user.username;
      state.avatar = action.payload.user.image;
      state.token = action.payload.user.token;
      localStorage.setItem("token", JSON.stringify(action.payload.user.token));
      state.error = null;
    });
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const { logOut, logIn, getNewUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;
