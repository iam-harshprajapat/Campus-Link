const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const { uploadPostImage } = require('../config/uploadConfig');

// @desc    Create a new post (text or photo)
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler((req, res) => {
    uploadPostImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err });
        } else {
            const { content, caption } = req.body;

            if (!content && !req.file) {
                return res.status(400).json({ success: false, message: 'Post content or image is required!' });
            }

            try {
                // Create a new post object
                const newPost = new Post({
                    content, // Optional text content
                    image: req.file ? req.file.path : null, // Optional image path
                    caption: req.file ? caption : null, // Optional caption for image post
                    createdBy: req.user.id, // User who created the post
                });

                // Save the post to the database
                const post = await newPost.save();

                // Send success response
                return res.status(201).json({ success: true, post });
            } catch (saveError) {
                console.error(saveError);
                return res.status(500).json({ success: false, message: 'Server error while saving the post.' });
            }
        }
    });
});



// @desc    Like or unlike a post
// @route   PATCH /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Check if the user has already liked the post
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            // Unlike the post by removing the user ID from the likes array
            post.likes = post.likes.filter(like => like.toString() !== userId.toString());
        } else {
            // Like the post by adding the user ID to the likes array
            post.likes.push(userId);
        }

        await post.save();

        // Return updated likes array or count
        res.status(200).json({
            success: true,
            message: hasLiked ? 'Post unliked' : 'Post liked',
            likes: post.likes.length
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


module.exports = { createPost, likePost };