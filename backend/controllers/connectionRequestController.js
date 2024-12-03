const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ConnectionRequest = require('../models/ConnectionRequest');

// @desc    Send a connection request
// @route   POST /api/connections/request
// @access  Private
const sendConnectionRequest = asyncHandler(async (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    if (!receiverId) {
        return res.status(400).send({ success: false, message: 'Receiver ID is required' });
    }

    if (senderId === receiverId) {
        return res.status(200).json({ success: false, message: 'You cannot send a request to yourself' });
    }

    // Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
        return res.status(404).json({ success: false, message: 'Receiver not found' });
    }

    // Check if a request already exists
    const existingRequest = await ConnectionRequest.findOne({ sender: senderId, receiver: receiverId });
    if (existingRequest) {
        return res.status(200).json({ success: false, message: 'Request already sent' });
    }

    // Create a new connection request
    const connectionRequest = new ConnectionRequest({ sender: senderId, receiver: receiverId });
    await connectionRequest.save();

    // Update users' connection requests
    await User.findByIdAndUpdate(senderId, { $push: { connectionRequestsSent: receiverId } });
    await User.findByIdAndUpdate(receiverId, { $push: { connectionRequestsReceived: senderId } });

    res.status(201).json({ success: true, message: 'Connection request sent' });
});

// @desc    Accept a connection request
// @route   POST /api/connections/accept/:requestId
// @access  Private
const acceptConnectionRequest = asyncHandler(async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;

    if (!requestId) {
        return res.status(400).json({ success: false, message: 'Request ID is required' });
    }

    const request = await ConnectionRequest.findById(requestId);
    if (!request) {
        return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (userId !== request.receiver.toString()) {
        return res.status(403).json({ success: false, message: 'You are not authorized to accept this request' });
    }

    // Add connections to both users
    await User.findByIdAndUpdate(request.sender, { $push: { connections: request.receiver } });
    await User.findByIdAndUpdate(request.receiver, { $push: { connections: request.sender } });

    // Remove from connection requests
    await User.findByIdAndUpdate(request.sender, { $pull: { connectionRequestsSent: request.receiver } });
    await User.findByIdAndUpdate(request.receiver, { $pull: { connectionRequestsReceived: request.sender } });

    await ConnectionRequest.findByIdAndDelete(requestId);


    res.status(200).json({ success: true, message: 'Connection request accepted' });
});

// @desc    Reject a connection request
// @route   POST /api/connections/reject/:requestId
// @access  Private
const rejectConnectionRequest = asyncHandler(async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;

    if (!requestId) {
        return res.status(400).json({ success: false, message: 'Request ID is required' });
    }

    const request = await ConnectionRequest.findById(requestId);
    if (!request) {
        return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if ((userId !== request.receiver.toString())) {
        return res.status(403).json({ success: false, message: 'You are not authorized to reject this request' });
    }

    // Remove from connection requests
    await User.findByIdAndUpdate(request.sender, { $pull: { connectionRequestsSent: request.receiver } });
    await User.findByIdAndUpdate(request.receiver, { $pull: { connectionRequestsReceived: request.sender } });

    // Delete the connection request from the ConnectionRequest collection
    await ConnectionRequest.findByIdAndDelete(requestId);

    res.status(200).json({ success: true, message: 'Connection request rejected' });
});

// @desc    Get all connection requests for a user
// @route   GET /api/connections/requests
// @access  Private
const getConnectionRequests = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const requests = await ConnectionRequest.find({ receiver: userId, status: 'pending' }).populate('sender', 'name username');
    if (!requests || requests.length === 0) {
        return res.status(200).json({ success: false, message: 'No pending connection requests found' });
    }

    res.status(200).json({ success: true, requests });
});

// @desc    Get all connections for a user
// @route   GET /api/connections
// @access  Private
const getUserConnections = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('connections', 'name username');
    if (!user || !user.connections) {
        return res.status(404).send({ success: false, message: 'No connections found' });
    }

    res.status(200).send({ success: true, connections: user.connections });
});

module.exports = {
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    getConnectionRequests,
    getUserConnections,
};
