import React from 'react'
import '../styles/register.css'
import Lottie from 'lottie-react'
import books from '../assets/images/books.json'
import { motion } from 'framer-motion';

const Step3 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}>
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>What’s your unique enrollment ID?</h2>
                        <input
                            type='text'
                            placeholder='Enrollment Number'
                            autoComplete='off'
                            value={formData.enrollmentNumber}
                            onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })} />
                    </div>
                    <div className='col-md-6 animation-container'>
                        <Lottie animationData={books} />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Step3
