import { createSlice } from '@reduxjs/toolkit';
import { getPostsByUser, getBatchUsers, clearCommentUsers } from './postAction';

const initialState = {
    posts: [],
    commentUsers: [],
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
            })
            .addCase(getPostsByUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.posts = payload;
                state.success = true;
            })
            .addCase(getPostsByUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(getBatchUsers.pending, (state) => {
                state.error = null;
            })
            .addCase(getBatchUsers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.commentUsers = payload; // Set the fetched comment users
            })
            .addCase(getBatchUsers.rejected, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(clearCommentUsers, (state) => {
                state.commentUsers = []; // Clear comment users
            });
    },
});

export default postSlice.reducer;
