// src/redux/features/auth/authAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../Services/API';


// Login User
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const payload = {};
            payload.email = email;
            payload.password = password;
            const response = await API.post('/auth/login', payload);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error);
        }
    }
);




// Get Current User
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/auth/current-user'); // Fetch current user data
            return response.data; // Return only the user data from the response
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Failed to fetch current user.';
            return rejectWithValue(message); // Return error message if the request fails
        }
    }
);

