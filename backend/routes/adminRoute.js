const express = require('express');
const { getUserPendigForApproval, approveUser, rejectUser } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

//get all the pending for approval requests
router.get('/pending-for-approval', adminMiddleware, getUserPendigForApproval);
router.post('/approve-user', adminMiddleware, approveUser);
router.post('/reject-user', adminMiddleware, rejectUser);
module.exports = router;
