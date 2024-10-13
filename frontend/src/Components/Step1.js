import React from 'react'
import '../styles/register.css'
import step1 from '../assets/images/step1.json'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion';

const Step1 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}
            >
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>What should we call you?</h2>
                        <input
                            type='text'
                            autoComplete='off'
                            placeholder='Name'
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                        />
                    </div>
                    <div className='col-md-6 animation-container'>
                        <Lottie animationData={step1} />
                    </div>
                </div>
            </motion.div>
        </>


    )
}

export default Step1
