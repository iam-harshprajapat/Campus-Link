import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../../Services/API';

// Otp Verification
export const OtpVerify = createAsyncThunk(
    'auth/opt-verification',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await API.post('/auth/verify-otp', { email, otp });
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error);
        }
    }
);

// Resend Otp
export const ResendOtp = createAsyncThunk(
    'auth/resend-otp',
    async (email, { rejectWithValue }) => {
        try {
            const response = await API.post('/auth/resend-otp', { email });
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error);
        }
    }
);
