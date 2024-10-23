import { createAsyncThunk } from '@reduxjs/toolkit';
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
