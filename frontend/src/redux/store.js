import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/login/authSlice';
import registerReducer from './features/register/registerSlice';
import otpReducer from './features/otp-verification/OtpSlice';
import forgotPasswordReducer from './features/forgotPassword/ForgotPasswordSlice';
import noteReducer from './features/notes/noteSlice';
import postReducer from './features/posts/postSlice';
import profileReducer from './features/profile/profileSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        otpVerification: otpReducer,
        forgotPassword: forgotPasswordReducer,
        note: noteReducer,
        posts: postReducer,
        profile: profileReducer,
    },
});

export default store;