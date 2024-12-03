import React, { useEffect, useState } from 'react'
import './TextUpload.css'
import { RxCross2 } from 'react-icons/rx';
import { GrPowerReset } from "react-icons/gr";
import DefaultProfile from '../../assets/images/default_profile.jpg'
import { toast } from 'react-toastify';
import API from '../../Services/API';
const TextUpload = ({ closeModal, user }) => {
    const [value, setValue] = useState('')
    const uploadPost = async () => {
        if (!value)
            return toast.error('Please write something...')
        try {
            const formData = new FormData()
            formData.append('content', value)
            const res = await API.post('/post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Post uploaded successfully')
            window.location.reload()
            closeModal();
        }
        catch (error) {
            console.log('Error uploading post: ', error)
            toast.error('Failed to upload post!')
        }
    }
    return (
        <div className='upload-text-modal'>
            <RxCross2 className='t-cross' onClick={() => closeModal()} />
            <div className="t-user-header">
                <div className="t-user-profile" style={user.profilePicture ? { backgroundImage: `url(${user.profilePicture})` } : { backgroundImage: `url(${DefaultProfile})` }}></div>
                <p>{user.name}</p>
            </div>
            <div className="t-write">
                <textarea placeholder='write your thoughts...' value={value} onChange={(e) => setValue(e.target.value)}></textarea>
                <GrPowerReset className='t-reset' onClick={() => setValue('')}
                />
            </div>
            <button className='action-btn' onClick={() => uploadPost()}>Post</button>
            <button className="action-btn" onClick={() => closeModal()}>Cancel</button>
        </div>
    )
}

export default TextUpload
