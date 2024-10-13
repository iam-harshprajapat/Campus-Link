// src/redux/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, loginUser } from './authAction';

const initialState = {
    success: false,
    loading: false,
    token: null,
    error: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.token = payload.token;
            localStorage.setItem('token', payload.token);
            state.success = true;
        });
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        //getting current user
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.success = true;
            state.error = false;
            state.data = payload.data;
        })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
