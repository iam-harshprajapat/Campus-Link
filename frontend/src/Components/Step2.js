import React from 'react'
import '../styles/register.css'
import Lottie from 'lottie-react'
import email from '../assets/images/email.json'
import { motion } from 'framer-motion'
const Step2 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}>
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>Where can we drop you a message?</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            autoComplete='off'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                        />
                    </div>
                    <div className='col-md-6 animation-container'>
                        <Lottie animationData={email} loop={false} />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Step2
