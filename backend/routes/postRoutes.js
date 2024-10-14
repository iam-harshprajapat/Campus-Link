const express = require('express');
const { createPost, likePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new post
router.post('/', authMiddleware, createPost);

// Liking the post
router.patch('/:id/like', authMiddleware, likePost)


module.exports = router;
