const express = require('express');
const { createPost, likePost, addComment, deleteComment, getComments } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new post
router.post('/', authMiddleware, createPost);

// Liking the post
router.patch('/:id/like', authMiddleware, likePost)

//comments
router.post('/:postId/comments', authMiddleware, addComment);
router.delete('/:postId/comments/:commentId', authMiddleware, deleteComment)
router.get('/:postId/comments', authMiddleware, getComments);
module.exports = router;
