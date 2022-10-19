import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./reducers/post-slice";
import userArticleSlice from "./reducers/user-article-slice";
import userSlice from "./reducers/user-slice";

const store = configureStore({
  reducer: {
    posts: postSlice,
    user: userSlice,
    article: userArticleSlice,
  },
});

export default store;

// эти два элемента нужны для работы с хуками:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
