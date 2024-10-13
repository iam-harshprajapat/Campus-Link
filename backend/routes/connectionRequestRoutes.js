const express = require('express');
const { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, getConnectionRequests, getUserConnections } = require('../controllers/connectionRequestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Send a connection request
router.post('/request', authMiddleware, sendConnectionRequest);

// Accept a connection request
router.post('/accept/:requestId', authMiddleware, acceptConnectionRequest);

// Reject a connection request
router.post('/reject/:requestId', authMiddleware, rejectConnectionRequest);

// Get all connection requests for a user
router.get('/requests', authMiddleware, getConnectionRequests);

// Get all connections for a user
router.get('/', authMiddleware, getUserConnections);

module.exports = router;
