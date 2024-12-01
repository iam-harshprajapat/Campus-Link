import React, { useState, useEffect } from 'react';
import './ImageUpload.css';
import { IoMdClose } from 'react-icons/io';
import { FaDesktop } from 'react-icons/fa';
import API from '../../Services/API';
import { toast } from 'react-toastify';

const ImageUpload = ({ closeModal, user }) => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log("Selected file:", selectedFile);
        }
    };

    const uploadPost = async () => {
        if (!file) {
            toast.warn('Please select a file and enter a caption!');
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('postImage', file);
            formData.append('caption', caption);
            formData.append('content', "");

            const res = await API.post('/post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(res);
            toast.success('Post uploaded successfully!');
            window.location.reload();
            closeModal();
        } catch (error) {
            console.error('Error uploading post:', error);
            toast.error('Failed to upload post!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="upload-modal-container">
            <div className="upload-profile-info">
                <div
                    className="upload-user-profile-image"
                    style={{ backgroundImage: `url(${user.profilePicture})` }}
                ></div>
                <p>{user.name}</p>
                <IoMdClose onClick={closeModal} className="close-icon" />
            </div>

            {!file && (
                <div className="upload-actions">
                    <label className="choose-image-button">
                        <FaDesktop className="computer-icon" />
                        Choose Image from Local Machine
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            )}

            {file && (
                <div className="after-selected">
                    <div
                        className="selected-image"
                        style={{
                            backgroundImage: `url(${URL.createObjectURL(file)})`,
                        }}
                    ></div>
                    <div className="write-caption">
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            rows="3"
                        ></textarea>
                        <button
                            onClick={uploadPost}
                            className="i-upload"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                            onClick={() => {
                                setFile(null);
                                setCaption('');
                            }}
                            className="i-upload"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
