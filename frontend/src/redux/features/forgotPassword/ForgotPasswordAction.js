import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendOtp = createAsyncThunk('forgotPassword/sendOtp', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/reset-password-otp`, { email });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to send OTP');
    }
});

export const verifyOtp = createAsyncThunk('forgotPassword/verifyOtp', async ({ email, otp }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'OTP verification failed');
    }
});

export const resetPassword = createAsyncThunk('forgotPassword/resetPassword', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/reset-password`, { email, password });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to reset password');
    }
});
