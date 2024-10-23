import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./profileAction";

const initialState = {
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
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})

export default profileSlice.reducer;