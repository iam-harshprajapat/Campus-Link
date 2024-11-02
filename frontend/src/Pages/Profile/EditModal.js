import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const EditModal = ({ closeModal, user }) => {
    // State to manage form values
    const [formData, setFormData] = useState({
        bio: user.bio || '',
        branch: user.branch || '',
        semester: user.semester || '',
        city: user.city || ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    return (
        <div style={{ height: '100%', width: '600px', display: 'flex', flexDirection: 'column' }}>
            {/* -----------------------------HEADER--------------------------- */}
            <div style={{ borderBottom: '1px solid #9c9999', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ border: 'none', padding: '0', fontSize: '18px' }}>Edit Profile</h3>
                <IoMdClose fontSize={25} color='red' onClick={closeModal} style={{ cursor: 'pointer' }} />
            </div>
            {/* ------------------------------BODY--------------------------------- */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="name" style={{ color: '#000', width: '100px' }}>Name: </label>
                    <input type="text" value={user.name} disabled style={{ width: '250px', paddingLeft: '10px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="bio" style={{ color: '#000', width: '100px' }}>Bio: </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        style={{
                            outline: 'none',
                            width: 'auto',
                            minWidth: '250px',
                            fontSize: '15px',
                            whiteSpace: 'pre-wrap',
                            resize: 'both',
                            minHeight: '48px',
                            height: 'auto',
                            paddingLeft: '10px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="email" style={{ color: '#000', width: '100px' }}>Email: </label>
                    <input type="text" value={user.email} disabled style={{ width: '250px', paddingLeft: '10px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="enrollmentNumber" style={{ color: '#000', width: '100px' }}>Enrollment Number: </label>
                    <input type="text" value={user.enrollmentNumber} disabled style={{ width: '250px', paddingLeft: '10px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="mobile" style={{ color: '#000', width: '100px' }}>Mobile: </label>
                    <input type="text" value={user.mobile} disabled style={{ width: '250px', paddingLeft: '10px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="role" style={{ color: '#000', width: '100px' }}>Role: </label>
                    <input type="text" value={user.role} disabled style={{ width: '250px', paddingLeft: '10px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="branch" style={{ color: '#000', width: '100px' }}>Branch: </label>
                    <input

                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        style={{ outline: 'none', width: '250px', paddingLeft: '10px' }}
                    />
                </div>

                {/* Semester dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="semester" style={{ color: '#000', width: '100px' }}>Semester: </label>
                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleInputChange}
                        style={{ width: '250px', height: '28px', outline: 'none', paddingLeft: '10px' }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={`Semester-${i + 1}`}>
                                Semester-{i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px' }}>
                    <label htmlFor="city" style={{ color: '#000', width: '100px' }}>City: </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        style={{ width: '250px', outline: 'none', paddingLeft: '10px' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
                    <button style={{ width: '80px', height: '35px', border: '1px solid #c9c9c9', color: '#fff', background: '#2B3467', borderRadius: '40px' }}>Save</button>
                    <button style={{ width: '80px', height: '35px', border: '1px solid #c9c9c9', background: 'transparent', borderRadius: '40px', }} >Cancle</button>
                </div>
            </div>
        </div >
    );
};

export default EditModal;
