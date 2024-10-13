import React from 'react'
import '../styles/register.css'
import Lottie from 'lottie-react'
import user from '../assets/images/user.json'
import { motion } from 'framer-motion'

const Step8 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}
            >
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>What’s your unique identity?</h2>
                        <input type='text' placeholder='Username' value={formData.username}
                            autoComplete='off'
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                    </div>
                    <div className='col-md-6 animation-container'>
                        <Lottie animationData={user} />
                    </div>
                </div>
            </motion.div>
        </>

    )
}

export default Step8
