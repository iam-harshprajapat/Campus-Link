const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const router = express.Router();

//getting user profile
router.get('/:userId', authMiddleware, getUserProfile);
router.put('/:userId', authMiddleware, updateUserProfile);
module.exports = router;