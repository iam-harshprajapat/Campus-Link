import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import { loginUser } from '../../redux/features/login/authAction';
import phoneAnimation from '../../assets/images/PhoneAnimation.json';
import '../../styles/form.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const Login = () => {
    const phoneRef = useRef(null); // animation
    const [isReversing, setIsReversing] = useState(false); // animation

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { loading, token, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            toast.error('Email, Username or Enrollment is required', {
                position: "bottom-right",
                className: 'foo-bar'
            });
        } else if (!password) {
            toast.error('Password is required', {
                position: "bottom-right",
                className: 'foo-bar'
            });
        } else {
            dispatch(loginUser({ email, password }));
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/feed');
        }
        if (error) {
            console.log(error)
            toast.error(error, {
                position: "bottom-right",
                className: 'foo-bar'
            })
        }
    }, [token, error, navigate]);

    const handleAnimationComplete = () => {
        if (!isReversing) {
            phoneRef.current?.setDirection(-1);
            setIsReversing(true);
            phoneRef.current?.play();
        } else {
            phoneRef.current?.setDirection(1);
            setIsReversing(false);
            phoneRef.current?.play();
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className='container box'>
                    <div className='row'>
                        <div className='col-md-6 image-box'>
                            <Lottie
                                width={400}
                                animationData={phoneAnimation}
                                lottieRef={phoneRef}
                                loop={false}
                                onComplete={handleAnimationComplete}
                            />
                            <h2>Campus Link</h2>
                            <h3>Join Us Today</h3>
                        </div>
                        <div className='col-md-6 form-container'>
                            <div className='form-inner-box'>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className='login-input'
                                        type='text'
                                        placeholder='email or username or enrollment'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        className='login-input'
                                        type='password'
                                        placeholder='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className='login-btn'
                                        type='submit'
                                    >
                                        Log in
                                    </button>
                                </form>
                                <div className='box-or'>
                                    <hr />
                                    <span>OR</span>
                                    <hr />
                                </div>
                                <div className='forpass'>
                                    <p><a href='/reset-password'>Forgot password?</a></p>
                                </div>
                            </div>
                            <div className='form-inner-box1'>
                                <p>Don't have an account?<a href='/register'> Sign up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
