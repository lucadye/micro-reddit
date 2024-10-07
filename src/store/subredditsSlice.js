import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GET from '../requests';

const DEFAULT_SUBREDDITS = await GET.subreddits();
const POPULAR = {
  name: 'Popular',
  url: '/r/popular/',
};

const fetchSubreddit = createAsyncThunk(
  'subreddits/fetchSubreddit',
  async (query, thunkAPI) => {
    const subreddit = await GET.subreddit(query);
    if (subreddit.error === 429) {
      throw Error('429');
    }
    return subreddit;
  }
)

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: DEFAULT_SUBREDDITS,
    selected: DEFAULT_SUBREDDITS[0],
    loading: false,
    failed: false,
  },
  reducers: {
    setSubreddits(state, {payload}) {
      state.subreddits = payload;
      state.selected = 0;
    },
    removeSubreddit(state, {payload}) {
      state.subreddits = state.subreddits.filter((s, i)=>{
        return i !== payload;
      });
    },
    clearFailure(state, action) {
      state.failed = false;
    },
    setSelected(state, {payload}) {
      state.selected = payload;
    },
    resetSelected(state, action) {
      state.selected = POPULAR;
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
      state.selected = payload;
      state.subreddits = [payload, ...state.subreddits];
    },
  },
})

// Action Creators
export const setSubreddits   = subredditsSlice.actions.setSubreddits;
export const removeSubreddit = subredditsSlice.actions.removeSubreddit;
export const clearFailure    = subredditsSlice.actions.clearFailure;
export const setSelected     = subredditsSlice.actions.setSelected;
export const resetSelected   = subredditsSlice.actions.resetSelected;
export { fetchSubreddit };

// State Selectors
export const getSubreddits = ({subreddits}) => subreddits?.subreddits;
export const getCurrentSub = ({subreddits}) => subreddits?.selected;
export const isLoading     = ({subreddits}) => subreddits.loading;
export const failedToLoad  = ({subreddits}) => subreddits.failed;

export const subredditsReducer = subredditsSlice.reducer;
export default subredditsSlice;

