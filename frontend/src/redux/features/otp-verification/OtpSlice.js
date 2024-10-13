import { createSlice } from "@reduxjs/toolkit";
import { OtpVerify, ResendOtp } from "./OtpAction";

const initialState = {
    success: false,
    loading: false,
    error: null,
    resendSuccess: false,
    resendAttempts: 0,
    resendAllowed: true,
    message: null,
};

const otpSlice = createSlice({
    name: 'otpVerification',
    initialState,
    reducers: {
        resetResendState: (state) => {
            state.resendAttempts = 0;
            state.resendAllowed = true;
            state.resendSuccess = false;
        },
        blockResendOtp: (state) => {
            state.resendAllowed = false;
        },
        allowResendOtp: (state) => {
            state.resendAllowed = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(OtpVerify.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(OtpVerify.fulfilled, (state, { payload }) => {
                state.message = payload;
                state.loading = false;
                state.success = true;
            })
            .addCase(OtpVerify.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(ResendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ResendOtp.fulfilled, (state) => {
                state.loading = false;
                state.resendSuccess = true;
                state.resendAttempts += 1;
                if (state.resendAttempts >= 4) {
                    state.resendAllowed = false; // Block resending OTP after 4 attempts
                }
            })
            .addCase(ResendOtp.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export const { resetResendState, blockResendOtp, allowResendOtp } = otpSlice.actions;
export default otpSlice.reducer;
