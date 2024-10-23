import { createSlice } from '@reduxjs/toolkit';
import { getPostsByUser } from './postAction';

const initialState = {
    posts: [],
    loading: false,
    error: null,
    success: false,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPostsByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder.addCase(getPostsByUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.posts = payload; // Set the posts in the state
            state.success = true;
        });
        builder.addCase(getPostsByUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload; // Set the error in the state
        });
    },
});

export default postSlice.reducer;
