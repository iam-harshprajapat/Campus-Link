import React, { useState } from 'react';
import './ImagePost.css';
import { BiMessageRounded, BiLike, BiSolidLike } from 'react-icons/bi';
import { IoIosSend } from "react-icons/io";
import Modal from '../../Components/Modal';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getBatchUsers, clearCommentUsers, postComment } from '../../redux/features/posts/postAction';
import { addLocalComment, removeLocalComment } from '../../redux/features/posts/postSlice';

const ImagePost = ({ posts, user }) => {
    const [activePost, setActivePost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const { commentUsers } = useSelector((state) => state.posts);

    const openModal = (post) => {
        setActivePost(post);
        const userIds = post.comments.map(comment => comment.postedBy);
        dispatch(getBatchUsers(userIds));
    };

    const closeModal = () => {
        setActivePost(null);
        dispatch(clearCommentUsers()); // Clear comment users on modal close
    };

    const findUserDetails = (userId) => commentUsers.find(user => user._id === userId);

    const handleCommentSubmit = (postId) => {
        // Generate a temporary comment ID for optimistic updates
        const tempComment = {
            _id: Date.now().toString(), // Temp ID
            text: commentText,
            postedBy: user._id,
            createdAt: new Date().toISOString(),
            temp: true, // Mark as temporary
        };

        // Optimistically add the comment
        dispatch(addLocalComment({ postId, comment: tempComment }));
        setCommentText(''); // Clear input

        // Dispatch the actual comment action
        const text = commentText;
        dispatch(postComment({ text, postId })).unwrap()
            .catch(() => {
                // If failed, remove the optimistic comment
                dispatch(removeLocalComment({ postId, tempCommentId: tempComment._id }));
            });
    };

    return (
        <>
            <div className="image-post-container">
                {posts.map((post) => (
                    post.image && (
                        <div
                            className="image-post"
                            key={post._id}
                            style={{ backgroundImage: `url(${post.image})` }}
                            onClick={() => openModal(post)}
                        >
                            <div className="image-wrapper">
                                <div className="info-box">
                                    <div className="inner-box">
                                        <BiLike className="icon" />
                                        <p>{post.likes.length}</p>
                                    </div>
                                    <div className="inner-box">
                                        <BiMessageRounded className="icon" />
                                        <p>{post.comments.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>

            {activePost && (
                <Modal closeModal={closeModal}>
                    <div className="post-modal">
                        <div className="post-image-container">
                            <img src={activePost.image} alt="Post" className="post-image" />
                        </div>
                        <div className="post-comments">
                            <div className="post-header">
                                <div className="user-profile" style={{ backgroundImage: `url(${user.profilePicture})` }}></div>
                                <div className="user-info">
                                    <h2>{user.name}</h2>
                                    <p>{moment(activePost.createdAt).fromNow()}</p>
                                </div>
                            </div>
                            <div className="post-caption">
                                <p>{activePost.caption}</p>
                            </div>

                            {/* Comment Section */}
                            <div className="comments-section" style={{ marginTop: '10px' }}>
                                {
                                    activePost.comments.map((comment, index) => {
                                        const commenter = findUserDetails(comment.postedBy);
                                        return (
                                            <div key={index} className="comment-container">
                                                <div className="comment-header">
                                                    <div
                                                        className="comment-user-image"
                                                        style={{ backgroundImage: `url(${commenter?.profilePicture || ''})` }}
                                                    ></div>
                                                    <div className="comment-details">
                                                        <div className="comment-user-name">{commenter?.name || 'Unknown User'} <span style={{
                                                            fontFamily: 'opensans-regular',
                                                            fontSize: '11px', color: 'rgb(99, 99, 99)', paddingLeft: '5px'
                                                        }}> {moment(comment.createdAt).fromNow()}</span></div>
                                                        <div className="comment-time">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="comment-text">
                                                    {comment.text}
                                                </div>

                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="like-comment">
                                {activePost.likes.includes(user._id) ? (
                                    <BiSolidLike className="do-like-icon" style={{ color: '#2B3467' }} />
                                ) : (
                                    <BiLike className="do-like-icon" />
                                )}
                                {
                                    activePost.likes.length > 0 &&
                                    <div className="likes-display">
                                        <BiLike className='icon' />
                                        <p>Liked by {activePost.likes.length} people</p>
                                    </div>
                                }
                                <div className="do-comment">
                                    <textarea type="text" placeholder='drop a comment...' spellCheck='false' onChange={(e) => setCommentText(e.target.value)}></textarea>
                                    <IoIosSend className='icon' onClick={() => handleCommentSubmit(activePost._id)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ImagePost;
