// PostList.js
import React from 'react';
import { BiMessageRounded, BiLike, BiSolidLike } from 'react-icons/bi';
// import './PostList.css'; // Create a separate CSS file for styles

const PostList = ({ posts, user }) => {
    return (
        <div className='post-container'>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div className='post' key={post._id}>
                        {/* Post content rendering logic */}
                        <div className='post-header'>
                            <div className='user-info'>
                                <div className='user-image' style={{ backgroundImage: `url(${user.profilePicture})` }}></div>
                                <div className='user-name'>
                                    <p style={{ fontSize: '18px' }}>{user.name}</p>
                                    <p style={{ fontWeight: '400', fontSize: '11px' }}>{new Date(post.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className='post-caption'><p>{post.caption}</p></div>
                        </div>
                        <div className='post-image' style={{ backgroundImage: `url(${post.image})` }} />
                        <div className='post-footer'>
                            <div className='post-like'>
                                {post.likes.includes(user._id) ? <BiSolidLike className='post-interaction' style={{ color: '#2B3467' }} /> : <BiLike className='post-interaction' />}
                                <p>{post.likes.length}</p>
                            </div>
                            <div className='post-comment'>
                                <BiMessageRounded className='post-interaction' />
                                <p>{post.comments.length}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default PostList;
