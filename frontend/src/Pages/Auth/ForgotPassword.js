import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, resetPassword } from '../../redux/features/forgotPassword/ForgotPasswordAction';
import { toast } from 'react-toastify';
import '../../styles/ForgotPassword.css'
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);

    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.forgotPassword);

    // Handle sending OTP
    const handleSendOtp = () => {
        if (!email) return alert('Email is required');
        dispatch(sendOtp(email));
        setStep(2); // Move to OTP verification step
    };

    // Handle verifying OTP
    const handleVerifyOtp = () => {
        if (!otp) return alert('OTP is required');
        dispatch(verifyOtp({ email, otp }));
        setStep(3); // Move to password reset step if OTP is verified
    };

    // Handle resetting password
    const handleResetPassword = () => {
        if (!password || !confirmPassword) return toast.error('All fields are required');
        if (password !== confirmPassword) return toast.error('Passwords do not match');
        dispatch(resetPassword({ email, password }));
    };
    useEffect(() => {
        if (error)
            toast.error(error);
        if (message)
            toast.success(message)
    }, [error, message])

    return (
        <>
            <div className='container'>
                {step === 1 && (
                    <div className='forgot-box'>
                        <h2>Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleSendOtp} disabled={loading}>Send OTP</button>
                    </div>
                )}
                {step === 2 && (
                    <div className='forgot-box'>
                        <h2>Enter OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={handleVerifyOtp} disabled={loading}>Submit OTP</button>
                    </div>
                )}
                {step === 3 && (
                    <div className='forgot-box'>
                        <h2>Reset Password</h2>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button onClick={handleResetPassword} disabled={loading}>Change Password</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ForgotPassword;
