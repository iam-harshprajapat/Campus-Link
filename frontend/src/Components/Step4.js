import React from 'react'
import '../styles/register.css'
import Lottie from 'lottie-react'
import studentTeacher from '../assets/images/studnetTeacher.json'
import { motion } from 'framer-motion';
const Step4 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}
            >
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>How do you want to contribute?</h2>
                        <select name='role' value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value={''}>Role</option>
                            <option value={'student'}>Student</option>
                            <option value={'faculty'}>Faculty</option>
                        </select>
                    </div>
                    <div className='col-md-6 animation-container'>
                        <Lottie animationData={studentTeacher} />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Step4
