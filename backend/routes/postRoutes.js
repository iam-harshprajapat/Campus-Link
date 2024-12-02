const express = require('express');
const { createPost, likePost, addComment, deleteComment, getComments, getUsersWhoLikedPost, getPostsByUser, deletePost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new post
router.post('/', authMiddleware, createPost);
router.delete('/:postId', authMiddleware, deletePost);
router.get('/users/:userId/posts', authMiddleware, getPostsByUser);


// Liking the post
router.patch('/:id/like', authMiddleware, likePost);
router.get('/:postId/likes', authMiddleware, getUsersWhoLikedPost);

//comments
router.post('/:postId/comments', authMiddleware, addComment);
router.delete('/:postId/comments/:commentId', authMiddleware, deleteComment);
router.get('/:postId/comments', authMiddleware, getComments);
router.get('/get-all-posts', authMiddleware, getAllPosts);
module.exports = router;