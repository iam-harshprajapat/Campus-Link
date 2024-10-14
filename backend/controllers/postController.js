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


// @desc    Add a comment to a post
// @route   POST /api/posts/:postId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
        return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Add new comment
        const newComment = {
            text,
            postedBy: req.user.id,
            createdAt: Date.now(),
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ success: true, comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @desc    Delete a comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user.id; // Logged-in user ID

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Find the comment within the post
    const comment = post.comments.id(commentId);
    if (!comment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Check if the user is either the owner of the comment or the owner of the post
    if (comment.postedBy.toString() !== userId.toString() && post.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: 'You are not authorized to delete this comment' });
    }

    // Remove the comment using pull
    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);

    // Save the updated post
    await post.save();

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
});

// @desc    Get all comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId).populate('comments.postedBy', 'username email');

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, comments: post.comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


module.exports = { createPost, likePost, addComment, deleteComment, getComments };