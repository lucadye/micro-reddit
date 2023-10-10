import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './postsSlice';
import { commentsReducer } from './commentsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;
export const subscribe = store.subscribe;
