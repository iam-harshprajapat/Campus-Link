import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { OtpVerify, ResendOtp } from '../../redux/features/otp-verification/OtpAction';
import { blockResendOtp, allowResendOtp } from '../../redux/features/otp-verification/OtpSlice';
import '../../styles/otpVerification.css';
import { toast } from 'react-toastify';

const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const location = useLocation();
    const navigate = useNavigate();  // Use useNavigate for navigation
    const email = location?.state?.email || '';
    const dispatch = useDispatch();
    const { message, loading, error, resendSuccess, resendAttempts, resendAllowed, success } = useSelector(state => state.otpVerification);

    // Handle OTP submission
    const handleSubmit = () => {
        dispatch(OtpVerify({ email, otp }));
    };

    // Resend OTP handler
    const handleResendOtp = () => {
        if (resendAllowed) {
            dispatch(ResendOtp(email));
            setTimer(60);  // Reset the timer
            dispatch(blockResendOtp());  // Block resend until timer ends
        }
    };

    // Timer countdown
    useEffect(() => {
        let interval;
        if (!resendAllowed) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        dispatch(allowResendOtp());  // Allow resend after timer
                        clearInterval(interval);
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [resendAllowed, dispatch]);

    // Navigate to home page on successful OTP verification
    useEffect(() => {
        if (success) {
            toast.success(message)
            navigate('/');  // Redirect to home page after successful OTP verification
        }
    }, [success, navigate, message]);

    return (
        <>
            <div className='container'>
                <div className='otp-box'>
                    <h2>Verify OTP</h2>
                    <p><b>*NOTE: </b>OTP is six digits and is valid for 10 minutes. You can resend OTP a maximum of 4 times. After 4 unsuccessful attempts or 4 resends, the user will be blocked for 1 hour.</p>
                    <div className='otp-input'>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                        />
                        <button
                            className='resend-btn'
                            onClick={handleResendOtp}
                            disabled={!resendAllowed || resendAttempts >= 4}
                            style={{
                                cursor: (!resendAllowed || resendAttempts >= 4) ? 'not-allowed' : 'pointer',
                                backgroundColor: (!resendAllowed || resendAttempts >= 4) ? '#ccc' : '#2B3467'
                            }}
                        >
                            {resendAllowed ? 'Resend' : `Wait ${timer} sec`}
                        </button>
                    </div>
                    <button
                        className='otp-submit-btn'
                        onClick={handleSubmit} disabled={loading}>Submit</button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {resendSuccess && <p>OTP resent successfully!</p>}
                </div>
            </div>
        </>
    );
};

export default OtpPage;
