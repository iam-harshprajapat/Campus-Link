import React from 'react'
import '../styles/register.css'
import Lottie from 'lottie-react'
import password from '../assets/images/password.json'
import { motion } from 'framer-motion'
const Step5 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}>
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>Choose a secret code...</h2>
                        <input
                            type='password'
                            placeholder='Password'
                            autoComplete='off'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                        />
                        <input
                            type='password'
                            placeholder='Confirm password'
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                    </div>
                    <div className='col-md-6 animation-container'>
                        <Lottie animationData={password} />
                    </div>
                </div>
            </motion.div>
        </>

    )
}

export default Step5
