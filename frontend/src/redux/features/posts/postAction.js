import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../Services/API';

// Get Posts by User
export const getPostsByUser = createAsyncThunk(
    'posts/getPostsByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/post/users/${userId}/posts`);
            return response.data.posts; // Return only the posts from the response
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Failed to fetch posts.';
            return rejectWithValue(message); // Return error message if the request fails
        }
    }
);


// New Action: Get Batch Users
export const getBatchUsers = createAsyncThunk(
    'posts/getBatchUsers',
    async (userIds, { rejectWithValue }) => {
        try {
            const response = await API.post('/auth/batch/users', { userIds });
            return response.data; // Return the fetched users
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Failed to fetch users.';
            return rejectWithValue(message); // Return error message if the request fails
        }
    }
);
export const postComment = createAsyncThunk(
    'posts/comment',
    async ({ text, postId }, { rejectWithValue }) => {
        try {
            const payload = { text };
            const response = await API.post(`/post/${postId}/comments`, payload);
            return {
                ...response.data.comment,
                postId, // Include postId to identify where to add this comment in the local state
            };
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Unable to post comment';
            return rejectWithValue(message);
        }
    }
);

// Action to clear comment users
export const clearCommentUsers = createAction('posts/clearCommentUsers');