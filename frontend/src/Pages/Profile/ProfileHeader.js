import React, { useRef, useState } from 'react';
import { IoCameraOutline } from "react-icons/io5";
import Loading from '../../Components/Loading'; // Import the Loading component

const ProfileHeader = ({ user, onFileChange, isLoading, onCameraClick }) => {
    const fileInputRef = useRef(null);
    const [showFullBio, setShowFullBio] = useState(false);
    const BIO_CHAR_LIMIT = 50;

    // Toggle bio display
    const toggleBio = () => {
        setShowFullBio(!showFullBio);
    };

    // Truncate bio if it exceeds character limit
    const truncatedBio = user.bio.length > BIO_CHAR_LIMIT
        ? user.bio.slice(0, BIO_CHAR_LIMIT) + '...'
        : user.bio;

    return (
        <div className='header'>
            <div className='section-1'>
                <div className='profile-image-box'>
                    <div
                        className='profile-image'
                        style={{ backgroundImage: `url(${user.profilePicture})` }}
                    ></div>
                    <div className='camera-icon' onClick={onCameraClick}>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <IoCameraOutline style={{ fontSize: '20px' }} />
                        )}
                    </div>
                    <input
                        type='file'
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={onFileChange}
                        disabled={isLoading} // Disable file input when loading
                    />
                </div>
                <p className='bio' onClick={toggleBio}>
                    {showFullBio ? user.bio : truncatedBio}
                </p>
                <h5 className='connections'>{user.connections.length} Links</h5>
            </div>
            <div className='section-2'>
                <div className='profile-details'>
                    <h4>{user.name}</h4>
                    <h5 style={{ marginTop: '20px' }} className='detail'>{user.email}</h5>
                    <h5 className='detail'>{user.enrollmentNumber}</h5>
                    <h5 className='detail'>{user.branch}</h5>
                    <h5 className='detail'>{user.semester}</h5>
                    <button className='edit-btn' disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Edit Profile'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
