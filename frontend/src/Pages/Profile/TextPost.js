import React from 'react';
import { BiMessageRounded, BiLike, BiSolidLike } from 'react-icons/bi';
import './TextPost.css';
import moment from 'moment';

const TextPost = ({ posts, user }) => {
    const formatContentWithHashtags = (content) => {
        // Split the content by hashtags, keeping the hashtags
        const parts = content.split(/(#[\w]+)/g);

        return parts.map((part, index) =>
            part.startsWith('#') ? (
                <span className='hash' key={index} >{part}</span>
            ) : (
                part
            )
        );
    };
    if (!posts) {
        return <h3>No post...</h3>
    }
    return (
        <>
            {posts.map((post) => (
                !post.image &&
                <div className="text-post-container" key={post._id}>
                    <div className="post-header">
                        <div className="profile-image" style={{ backgroundImage: `url(${user.profilePicture})` }}></div>
                        <div className="name-date">
                            <h2>{user.name}</h2>
                            <p>{moment(post.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>{formatContentWithHashtags(post.content)}</p>
                    </div>
                    {post.likes.length > 0 && <p className="likedBy">Liked by {post.likes.length} people</p>}
                    <div className="interaction">
                        <div className="like">
                            {post.likes.includes(user._id) ? (
                                <BiSolidLike className="icon" style={{ color: '#2B3467' }} />
                            ) : (
                                <BiLike className="icon" />
                            )}
                        </div>
                        <div className="comment">
                            <BiMessageRounded className="icon" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TextPost;
