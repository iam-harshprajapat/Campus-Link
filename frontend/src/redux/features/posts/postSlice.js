import { createSlice } from '@reduxjs/toolkit';
import { getPostsByUser, getBatchUsers, clearCommentUsers, postComment } from './postAction';

const initialState = {
    posts: [],
    commentUsers: [],
    loading: false,
    error: null,
    success: false,
    commentSuccess: true,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addLocalComment: (state, action) => {
            const { postId, comment } = action.payload;
            const post = state.posts.find(p => p._id === postId);
            if (post) {
                post.comments.push(comment); // Add comment locally
            }
        },
        removeLocalComment: (state, action) => {
            const { postId, tempCommentId } = action.payload;
            const post = state.posts.find(p => p._id === postId);
            if (post) {
                post.comments = post.comments.filter(
                    comment => comment._id !== tempCommentId
                ); // Remove temporary comment if API fails
            }
        },
    },
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
            })
            .addCase(postComment.fulfilled, (state, { payload }) => {
                const { postId, _id } = payload;
                const post = state.posts.find(p => p._id === postId);
                if (post) {
                    const tempComment = post.comments.find(comment => comment.temp);
                    if (tempComment) tempComment._id = _id; // Replace temp ID with actual ID
                }
            })
            .addCase(postComment.rejected, (state, { meta }) => {
                const { postId, tempCommentId } = meta.arg;
                state.commentSuccess = false;
                const post = state.posts.find(p => p._id === postId);
                if (post) {
                    post.comments = post.comments.filter(
                        comment => comment.tempId !== tempCommentId
                    );
                }
            });
    },
});
export const { addLocalComment, removeLocalComment } = postSlice.actions;
export default postSlice.reducer;
