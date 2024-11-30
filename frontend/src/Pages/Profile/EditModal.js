import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/features/profile/profileAction';
import { toast } from 'react-toastify';

const EditModal = ({ closeModal, user }) => {
    // State to manage form values
    const [formData, setFormData] = useState({
        bio: user.bio || '',
        branch: user.branch || '',
        semester: user.semester || '',
        city: user.city || '',
        userId: user._id,
    });
    const dispatch = useDispatch();
    const { success, loading, error } = useSelector((state) => state.profile);
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const saveInformation = () => {
        dispatch(updateProfile({ ...formData }));
        setTimeout(() => {
            closeModal();
            window.location.reload();
        }, 4000)
    }

    useEffect(() => {
        if (success) {
            toast.success('Profile Updated Successfully')
        }
        if (error) toast.error(error);
    }, [success, error])


    return (
        <div style={{ height: '100%', width: '600px', display: 'flex', flexDirection: 'column', padding: '20px' }}>
            {/* -----------------------------HEADER--------------------------- */}
            <div style={{ borderBottom: '1px solid #9c9999', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ border: 'none', padding: '0', fontSize: '18px', fontFamily: 'opensans-bold' }}>Edit Profile</h3>
                <motion.div
                    whileHover={{ rotate: '180deg', scale: '1.3' }}

                    transition={{ duration: 0.3 }}
                >
                    <IoMdClose fontSize={25} color='red' onClick={closeModal} style={{ cursor: 'pointer' }} />
                </motion.div>
            </div>
            {/* ------------------------------BODY--------------------------------- */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="name" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Name: </label>
                    <input type="text" value={user.name} disabled style={{ width: '250px', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="bio" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Bio: </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        style={{
                            outline: 'none',
                            fontSize: '15px',
                            whiteSpace: 'pre-wrap',
                            resize: 'none',
                            height: '48px',
                            width: '250px',
                            paddingLeft: '10px',
                            fontFamily: 'opensans-regular',
                            fontSize: '13px',
                        }}
                        spellCheck='false'
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="email" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Email: </label>
                    <input type="text" value={user.email} disabled style={{ width: '250px', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="enrollmentNumber" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Enrollment Number: </label>
                    <input type="text" value={user.enrollmentNumber} disabled style={{ width: '250px', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="mobile" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Mobile: </label>
                    <input type="text" value={user.mobile} disabled style={{ width: '250px', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="role" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Role: </label>
                    <input type="text" value={user.role} disabled style={{ width: '250px', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="branch" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Branch: </label>
                    <input

                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        style={{ outline: 'none', width: '250px', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }}
                    />
                </div>

                {/* Semester dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="semester" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>Semester: </label>
                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleInputChange}
                        style={{ width: '250px', height: '28px', outline: 'none', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={`Semester-${i + 1}`}>
                                Semester-{i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="city" style={{ color: '#000', width: '100px', fontFamily: 'opensans-semibold', fontSize: '15px' }}>City: </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        style={{ width: '250px', outline: 'none', paddingLeft: '10px', fontFamily: 'opensans-regular', fontSize: '13px' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
                    <button onClick={saveInformation} style={{ width: '80px', height: '35px', border: '1px solid #c9c9c9', color: '#fff', background: '#2B3467', borderRadius: '40px' }}>{loading ? 'Updating...' : 'Save'}</button>
                    <button style={{ width: '80px', height: '35px', border: '1px solid #c9c9c9', background: 'transparent', borderRadius: '40px', }} onClick={closeModal}>Cancle</button>
                </div>
            </div>
        </div >
    );
};

export default EditModal;
