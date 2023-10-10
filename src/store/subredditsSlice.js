import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GET from '../requests';

const defaultSubreddits = await GET.subreddits();

const fetchSubreddit = createAsyncThunk(
  'subreddits/fetchSubreddit',
  async (url, thunkAPI) => {
    const subreddit = await GET.subreddit(url);
    return subreddit;
  }
)

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: defaultSubreddits,
    selected: 0,
    loading: false,
    failed: false,
  },
  reducers: {
    setSubreddits(state, {payload}) {
      state.subreddits = payload;
    },
  },
  extraReducers: {
    [fetchSubreddit.pending]: (state, action) => {
      state.loading = true;
      state.failed = false;
    },
    [fetchSubreddit.rejected]: (state, action) => {
      state.loading = false;
      state.failed = true;
    },
    [fetchSubreddit.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.failed = false;
      state.subreddits = payload;
    },
  },
})

// Action Creators
export const setSubreddits = subredditsSlice.actions.setSubreddits;
export { fetchSubreddit };

// State Selectors
export const getSubreddits = (state) => state?.subreddits?.subreddits;
export const getCurrentSub = (state) => state?.subreddits?.subreddits[state?.subreddits?.selected];

export const subredditsReducer = subredditsSlice.reducer;
export default subredditsSlice;

