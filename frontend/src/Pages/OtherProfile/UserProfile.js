import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from './../../Services/API';
import defaultProfile from '../../assets/images/default_profile.jpg'
import './UserProfile.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FiMoreHorizontal, FiGrid, FiList, FiX } from "react-icons/fi";
import ImagePost from './../Profile/ImagePost';
import TextPost from './../Profile/TextPost';
import { toast } from 'react-toastify';
import Loading from './../../Components/Loading';

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [posts, setPost] = useState(null)
    const [connected, setConnected] = useState(false)
    const [dotClick, setDotClick] = useState(false)
    const [activeTab, setActiveTab] = useState("gallery");

    // -------------------------------------------fetching user data--------------------------------
    const { userId } = useParams();
    const fetchUserData = async () => {
        const response = await API.post('/auth/current-user-post', { userId })
        // console.log(response);
        setUser(response.data.user);
    }

    // -------------------------------------------fetching post data--------------------------------
    const fetchPostData = async () => {
        const response = await API.get(`/post/users/${userId}/posts`)
        // console.log(response);
        setPost(response.data.posts);
    }

    // -------------------------------------------handle Log Out----------------------------------
    const handleLogout = (e) => {
        e.stopPropagation();
        localStorage.removeItem('token');
        window.location.reload();
    }

    // --------------------------------------------Connect----------------------------------------
    const sendConnectionRequest = async () => {
        const response = await API.post('/connections/request', { receiverId: userId })
        console.log(response);
        if (response.data.success === true) {
            toast.success(response.data.message);
        }
        if (response.data.success === false)
            toast.error(response.data.message);
    }
    //----------------------------------------------GET User-------------------------------------
    const getCurrentUser = async () => {
        const response = await API.get('/auth/current-user');
        if (response.data.user.connections.includes(userId)) {
            setConnected(true);
        }
    }


    useEffect(() => {
        fetchUserData();
        fetchPostData();
        getCurrentUser()
    }, [])


    if (!user) {
        return <Loading />
    }
    if (!posts) {
        <h4>No Posts...</h4>
    }
    return (
        <>
            <div className="profileContainer" onClick={() => setDotClick(false)}>
                <BsThreeDotsVertical className='threedot' onClick={(e) => {
                    e.stopPropagation();
                    setDotClick((prev) => !prev);
                }} />
                {dotClick && (
                    <div
                        className="logout"
                        onClick={handleLogout}
                    >
                        <MdLogout /> Logout
                    </div>
                )}
                <div className="profileDetails">
                    <div className="section-one">
                        <div className="user-profile-image" style={user.profilePicture ? { backgroundImage: `url(${user.profilePicture})` } : { backgroundImage: `url(${defaultProfile})` }}></div>
                    </div>
                    <div className="section-two">
                        <p style={{ fontSize: '30px', fontWeight: '700' }}>{user.name}</p>
                        <p style={{ fontSize: '18px' }}>{user.branch}</p>
                        <p>{user.enrollmentNumber}</p>
                        <p>{user.email}</p>
                        <p style={{ fontWeight: '700', color: '#00ffb3', cursor: 'pointer' }}>{user.connections.length} Connections</p>
                    </div>
                </div>
                <div className="bio-connect">
                    <p>{user.bio}</p>
                    {
                        connected ? (
                            <button onClick={() => setConnected(false)}>Disconnect</button>
                        ) : (
                            <button onClick={() => sendConnectionRequest()}>Connect</button>
                        )
                    }
                </div>
                <div className="posts">
                    <div className="post-type-buttons">
                        <button
                            onClick={() => setActiveTab('gallery')}
                            style={activeTab === 'gallery' ? { borderBottom: '2px solid #2b3467', background: 'linear-gradient(0deg, rgba(128, 128, 128, 0.150), transparent)' } : {}}
                        >
                            Gallery <FiGrid />
                        </button>
                        <button
                            onClick={() => setActiveTab('text')}
                            style={activeTab === 'text' ? { borderBottom: '2px solid #2b3467', background: 'linear-gradient(0deg, rgba(128, 128, 128, 0.150), transparent)' } : {}}
                        >
                            Text <FiList />
                        </button>
                    </div>
                    <div className="posts-container">
                        {
                            activeTab === 'gallery' ? (<ImagePost posts={posts} user={user} />) : (<TextPost posts={posts} user={user} />)
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserProfile
