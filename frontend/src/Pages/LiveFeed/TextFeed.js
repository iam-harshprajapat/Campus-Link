import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack, IoMdTrash } from "react-icons/io";
import './TextFeed.css'
import API from '../../Services/API';
import moment from 'moment';
import DefaultProfile from '../../assets/images/default_profile.jpg'
import { BiLike, BiReply } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { IoHandRightOutline } from "react-icons/io5"

const TextFeed = () => {
    const [posts, setPosts] = useState([]);
    const [userCache, setUserCache] = useState({});
    const fetchPostData = async () => {
        try {
            const response = await API.get("/post/get-all-posts");
            const postData = response.data.posts;
            const updatedPosts = await Promise.all(
                postData.map(async (post) => {
                    if (!userCache[post.createdBy]) {
                        const userResponse = await API.post("/auth/current-user-post", {
                            userId: post.createdBy,
                        });
                        const userData = userResponse.data.user;
                        setUserCache((prev) => ({ ...prev, [post.createdBy]: userData }));
                        return { ...post, user: userData };
                    }
                    return { ...post, user: userCache[post.createdBy] };
                })
            );
            setPosts(updatedPosts);
        } catch (error) {
            console.log("error: " + error);
        }
    };
    const navigate = useNavigate();
    const handleProfile = (userId) => {
        navigate(`/${userId}`)
    }

    useEffect(() => {
        fetchPostData()
    }, [])
    return (
        <>
            <div className="l-container">
                <Link to={'/feed'}><button className="l-back">
                    <IoIosArrowRoundBack className='icon' />back
                </button></Link>
                <div className="l-feed-container">
                    {
                        posts
                            .filter((post) => post.content)
                            .map((post) => (
                                <div className="l-post-container" key={post._id} >
                                    <div className="l-post-header" onClick={() => { handleProfile(post.user._id) }}>
                                        <div className="l-pic"
                                            style={post.user.profilePicture ? { backgroundImage: `url(${post.user.profilePicture})` } : { backgroundImage: `url(${DefaultProfile})` }}
                                        ></div>
                                        <div className="l-des">
                                            <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{post.user.name}</p>
                                            <p style={{ fontSize: '10px', color: 'gray' }}>{moment(post.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div className="l-post-body">
                                        {post.content}
                                    </div>
                                    <div className="l-post-footer">
                                        <div className="l-icon">
                                            <IoHandRightOutline className='l-action' />
                                        </div>
                                        <div className="l-icon">
                                            <BiReply className='l-action' />
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
        </>
    )
}

export default TextFeed
