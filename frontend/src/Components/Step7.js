import React from 'react'
import '../styles/register.css'
import Lottie from 'lottie-react'
import degree from '../assets/images/degree.json'
import { motion } from 'framer-motion'

const Step7 = ({ formData, setFormData }) => {
    return (
        <>
            <motion.div className='container sec-container'
                initial={{ x: -900 }}
                animate={{ x: 0 }}>
                <div className='row inner-container'>
                    <div className='col-md-6 form'>
                        <h2 className='label'>Which semester of your journey are you on?</h2>
                        <select name='semester' value={formData.semester}
                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                        >
                            <option value={''}>semester</option>
                            <option value={'first'}>I</option>
                            <option value={'second'}>II</option>
                            <option value={'third'}>III</option>
                            <option value={'fourth'}>IV</option>
                            <option value={'fifth'}>V</option>
                            <option value={'sixth'}>VI</option>
                            <option value={'seventh'}>VII</option>
                            <option value={'eight'}>VIII</option>
                        </select>
                    </div>
                    <div className='col-md-6 animation-container'>
                        <Lottie animationData={degree} />
                    </div>
                </div>
            </motion.div>
        </>

    )
}

export default Step7
