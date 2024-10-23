import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/features/login/authAction';
import './profilePage.css';
import { IoCameraOutline } from "react-icons/io5";
import { BiMessageRounded, BiLike, BiSolidLike } from 'react-icons/bi'
import Loading from '../../Components/Loading';
import { getPostsByUser } from '../../redux/features/posts/postAction';
import { updateProfile } from '../../redux/features/profile/profileAction';

const ProfilePage = () => {
    const { data } = useSelector((state) => state.auth);
    const { posts, error, loading: postLoading } = useSelector((state) => state.posts);
    const { loading: profileLoading } = useSelector((state) => state.profile);
    const [file, setFile] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false); // Track update success state
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const [showFullBio, setShowFullBio] = useState(false);
    const BIO_CHAR_LIMIT = 50;

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const toggleBio = () => {
        setShowFullBio(!showFullBio);
    };

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (data?.user) {
            dispatch(getPostsByUser(data.user._id));
        }
        if (file && data?.user) {
            dispatch(updateProfile({ userId: data.user._id, file })).then(() => {
                setUpdateSuccess(true); // Set success when the profile is updated
                setFile(null); // Clear file after dispatch
            });
        }
    }, [dispatch, data, file]);

    // Reload page after profile update is successful
    useEffect(() => {
        if (updateSuccess && !profileLoading) {
            setUpdateSuccess(false); // Prevent re-triggering the reload
            window.location.reload();
        }
    }, [updateSuccess, profileLoading]); // Monitor updateSuccess and profileLoading changes

    if (!data || !data.user || postLoading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error loading posts: {error}</p>;
    }

    const truncatedBio = data.user.bio.length > BIO_CHAR_LIMIT
        ? data.user.bio.slice(0, BIO_CHAR_LIMIT) + '...'
        : data.user.bio;

    return (
        <>
            <div className='container-fluid profile-container'>
                <div className='header'>
                    <div className='section-1'>
                        <div className='profile-image-box'>
                            <div
                                className='profile-image'
                                style={{ backgroundImage: `url(${data.user.profilePicture})` }}
                            ></div>
                            <div className='camera-icon' onClick={handleCameraClick}>
                                {profileLoading ? (
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
                                onChange={handleFileChange}
                                disabled={profileLoading} // Disable file input when loading
                            />
                        </div>
                        <p className='bio' onClick={toggleBio}>
                            {showFullBio ? data.user.bio : truncatedBio}
                        </p>
                        <h5 className='connections'>{data.user.connections.length} Links</h5>
                    </div>
                    <div className='section-2'>
                        <div className='profile-details'>
                            <h4>{data.user.name}</h4>
                            <h5 style={{ marginTop: '20px' }} className='detail'>{data.user.email}</h5>
                            <h5 className='detail'>{data.user.enrollmentNumber}</h5>
                            <h5 className='detail'>{data.user.branch}</h5>
                            <h5 className='detail'>{data.user.semester}</h5>
                            <button className='edit-btn' disabled={profileLoading}>
                                {profileLoading ? 'Updating...' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                <h3>Posts</h3>

                <div className='post-container'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            post.image ? (
                                <div className='post' key={post._id}>
                                    <div className='post-header'>
                                        <div className='user-info'>
                                            <div className='user-image' style={{ backgroundImage: `url(${data.user.profilePicture})` }}></div>
                                            <div className='user-name'>
                                                <p style={{ fontSize: '18px' }}>{data.user.name}</p>
                                                <p style={{ fontWeight: '400', fontSize: '11px' }}>{new Date(post.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className='post-caption'><p>{post.caption}</p></div>
                                    </div>
                                    <div className='post-image' style={{ backgroundImage: `url(${post.image})` }}>                                    </div>
                                    <div className='post-footer'>
                                        <div className='post-like' >
                                            {post.likes.includes(data.user._id) ? (<BiSolidLike className='post-interaction' style={{ color: '#2B3467' }} />) : (<BiLike className='post-interaction' />)}
                                            <p>{post.likes.length}</p>
                                            <div className='list'>i</div>
                                        </div>
                                        <div className='post-comment'>
                                            <BiMessageRounded className='post-interaction' />
                                            <p>{post.comments.length}</p>
                                            <div className='list'>i</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='post-type-text' key={post._id}>
                                    <div className='post-text-header'>
                                        <div className='user-info'>
                                            <div className='user-image' style={{ backgroundImage: `url(${data.user.profilePicture})` }}></div>
                                            <div className='user-name'>
                                                <p style={{ fontSize: '18px' }}>{data.user.name}</p>
                                                <p style={{ fontWeight: '400', fontSize: '11px' }}>{new Date(post.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='post-content'>
                                        <p>{post.content}</p>
                                    </div>
                                    <div className='post-footer'>
                                        <div className='post-like' >
                                            {post.likes.includes(data.user._id) ? (<BiSolidLike className='post-interaction' style={{ color: '#2B3467' }} />) : (<BiLike className='post-interaction' />)}
                                            <p>{post.likes.length}</p>
                                            <div className='list'>i</div>
                                        </div>
                                        <div className='post-comment'>
                                            <BiMessageRounded className='post-interaction' />
                                            <p>{post.comments.length}</p>
                                            <div className='list'>i</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div >
        </>
    );
};

export default ProfilePage;
