import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./profileAction";

const initialState = {
    success: false,
    loading: false,
    error: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            });
    }
})

export default profileSlice.reducer;