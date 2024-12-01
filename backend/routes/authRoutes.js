const express = require('express');
const { registerUser, loginUser, verifyOtp, resendOtp, getCurrentUser, sendOtpToResetPassword, resetPassword, getUsersBatch, PgetCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Register Route
router.post('/register', registerUser);

// OTP Verification Route
router.post('/verify-otp', verifyOtp);
//login 
router.post('/login', loginUser);
//verification of Admin OTP
router.post('/resend-otp', resendOtp)
//reset password
router.post('/reset-password-otp', sendOtpToResetPassword);
router.post('/reset-password', resetPassword);
//getcurrent user
router.get('/current-user', authMiddleware, getCurrentUser);
//getcurrent user
router.post('/current-user-post', authMiddleware, PgetCurrentUser);
//get batch of the users
router.post('/batch/users', authMiddleware, getUsersBatch);
module.exports = router;
