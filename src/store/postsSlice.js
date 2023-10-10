import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GET from '../requests';


const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (url, thunkAPI) => {
    const page = await GET.page(url);
    return page;
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    failed: false,
  },
  reducers: {
    setPosts(state, {payload}) {
      state.posts = payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
      state.failed = false;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.failed = true;
    },
    [fetchPosts.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.failed = false;
      state.posts = payload;
    },
  },
})

// Action Creators
export const setPosts = postsSlice.actions.setPosts;
export { fetchPosts };

// State Selectors
export const getPosts = (state) => state.posts.posts;

export const postsReducer = postsSlice.reducer;
export default postsSlice;
