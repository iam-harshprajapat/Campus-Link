import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './registerAction';

const initialState = {
    success: false,
    loading: false,
    otp: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("Loading...");
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.success = true;
                state.loading = false;
                state.otp = true;
                state.error = null;
                console.log("payload", payload);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.success = false;
                state.error = payload;
                state.loading = false;
                console.log("Error:", payload);
            });
    }
});

export default registerSlice.reducer;
