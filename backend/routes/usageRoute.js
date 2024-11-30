const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const getAllUsers = require('../controllers/usageController');

const router = express.Router();

router.get('/get-all-user', authMiddleware, getAllUsers)

module.exports = router