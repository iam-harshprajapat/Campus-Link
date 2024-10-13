import React from 'react'
import '../styles/register.css'
import Lottie from 'lottie-react'
import mobile from '../assets/images/phone.json'
import { motion } from 'framer-motion'

const Step6 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}>
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>What's the best number to reach you?</h2>
                        <input type='number' placeholder='Phone' value={formData.mobile}
                            autoComplete='off'
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                    </div>
                    <div className='col-md-6 animation-container'>
                        <div className='col-md-6 animation-container'>
                            <Lottie animationData={mobile} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>

    )
}

export default Step6
