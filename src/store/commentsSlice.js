import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GET from '../requests';


const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({url, index}, thunkAPI) => {
    const comments = await GET.comments(url);
    return {comments, index};
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    failed: false,
  },
  reducers: {
    setComments(state, {payload}) {
      state.comments = payload;
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.loading = true;
      state.failed = false;
    },
    [fetchComments.rejected]: (state, action) => {
      state.loading = false;
      state.failed = true;
    },
    [fetchComments.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.failed = false;
      state.comments[payload.index] = payload.comments;
    },
  },
})

// Action Creators
export const setComments = commentsSlice.actions.setComments;
export { fetchComments };

// State Selectors
export const getComments = (state) => state.comments;
export const getCommentsByIndex = (index) => (state) => state.comments.comments[index];

export const commentsReducer = commentsSlice.reducer;
export default commentsSlice;
