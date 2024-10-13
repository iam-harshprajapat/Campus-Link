import React, { useEffect, useState } from 'react';
import '../../styles/register.css';
import Step1 from '../../Components/Step1';
import Step2 from '../../Components/Step2';
import Step3 from '../../Components/Step3';
import Step4 from '../../Components/Step4';
import Step5 from '../../Components/Step5';
import Step6 from '../../Components/Step6';
import Step7 from '../../Components/Step7';
import Step8 from '../../Components/Step8';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/features/register/registerAction';
import Loading from '../../Components/Loading';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [step, setStep] = useState(1);
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        enrollmentNumber: '',
        password: '',
        confirmPassword: '',
        role: '',
        username: '',
        semester: '',
        mobile: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { otp, error, loading } = useSelector((state) => state.register);
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                className: 'foo-bar'
            });
        }
    }, [error]);

    useEffect(() => {
        if (otp)
            navigate('/register/otp/otp-verification', { state: { email: registrationData.email } });
    }, [otp, navigate, registrationData.email]);

    const isFieldValid = () => {
        switch (step) {
            case 1:
                return registrationData.name.trim() !== '';
            case 2:
                return registrationData.email.trim() !== '';
            case 3:
                return registrationData.enrollmentNumber.trim() !== '';
            case 4:
                return registrationData.role.trim() !== '';
            case 5:
                return registrationData.confirmPassword.trim() !== '' && registrationData.password === registrationData.confirmPassword;
            case 6:
                return registrationData.mobile.trim() !== '';
            case 7:
                return registrationData.semester.trim() !== '';
            case 8:
                return registrationData.username.trim() !== ''; // Fixed validation for step 8
            default:
                return false;
        }
    };

    const PageDisplay = () => {
        switch (step) {
            case 1:
                return <Step1 formData={registrationData} setFormData={setRegistrationData} />;
            case 2:
                return <Step2 formData={registrationData} setFormData={setRegistrationData} />;
            case 3:
                return <Step3 formData={registrationData} setFormData={setRegistrationData} />;
            case 4:
                return <Step4 formData={registrationData} setFormData={setRegistrationData} />;
            case 5:
                return <Step5 formData={registrationData} setFormData={setRegistrationData} />;
            case 6:
                return <Step6 formData={registrationData} setFormData={setRegistrationData} />;
            case 7:
                return <Step7 formData={registrationData} setFormData={setRegistrationData} />;
            case 8:
                return <Step8 formData={registrationData} setFormData={setRegistrationData} />;
            default:
                return null;
        }
    };

    const nxt = () => {
        if (step === 5 && registrationData.password !== registrationData.confirmPassword) {
            return toast.error('Password not matched!', {
                position: "top-center",
                className: 'foo-bar'
            });
        }
        if (!isFieldValid()) {
            return toast.error('You missed a field!', {
                position: "top-center",
                className: 'foo-bar'
            });
        }
        setStep(step + 1);
    };

    const handleSubmit = () => {
        if (!isFieldValid()) {
            return toast.error('You missed a field!', {
                position: "top-center",
                className: 'foo-bar'
            });
        }
        dispatch(registerUser({
            email: registrationData.email,
            name: registrationData.name,
            username: registrationData.username,
            enrollmentNumber: registrationData.enrollmentNumber,
            mobile: registrationData.mobile,
            semester: registrationData.semester,
            role: registrationData.role,
            password: registrationData.password
        }));
    };

    return (

        <>
            {loading ? (<Loading />) : (
                < div className='container-fluid register-container'>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${step * 12.5}%` }}></div>
                    </div>
                    {PageDisplay()}
                    <div className='button' style={{ justifyContent: 'space-between' }}>
                        {step === 1 && <p>Already have an account? <a href='/'>Login</a></p>}
                        {step > 1 && <button className='prev' onClick={() => setStep(step - 1)}>Prev</button>}
                        {step < 8 ? (
                            <button onClick={nxt}>Next</button>
                        ) : (
                            <button className='send-otp' onClick={handleSubmit}>Send OTP</button>
                        )}
                    </div>
                    <ToastContainer />
                </ div >
            )
            }
        </>
    );
};

export default Registration
