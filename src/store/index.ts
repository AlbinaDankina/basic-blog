import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./post-slice";

const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});

export default store;

// эти два элемента нужны для работы с хуками:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
