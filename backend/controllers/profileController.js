const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { uploadProfilePicture } = require('../config/uploadConfig');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinaryconfig');

// @desc    Get user profile by userId
// @route   GET /api/profile/:userId
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch the user by userId
        const user = await User.findById(userId).select('-password').populate('connections', 'name username');  // Excluding password field

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send user profile data
        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                enrollmentNumber: user.enrollmentNumber,
                mobile: user.mobile,
                semester: user.semester,
                branch: user.branch,
                bio: user.bio,
                city: user.city,
                profilePicture: user.profilePicture,
                connections: user.connections,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Update User Profile Controller
const updateUserProfile = asyncHandler((req, res) => {
    // Use the multer middleware for uploading profile pictures
    uploadProfilePicture(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err });
        }

        try {
            const { userId } = req.params;
            const { semester, branch, bio, city } = req.body;

            // Find the user by ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Handle profile picture upload if provided
            if (req.file && req.file.path) {
                // Check if the user already has an existing profile picture
                const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'user_profile_photos',
                    use_filename: true,
                    unique_filename: false
                });

                if (user.profilePicture) {
                    const publicId = user.profilePicture.split('/').pop().split('.')[0]; // Extract public ID from URL
                    await cloudinary.uploader.destroy(publicId);
                }
                // Set the new Cloudinary URL as the user's profile picture
                user.profilePicture = cloudinaryResult.secure_url;


                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error deleting local profile picture:", err);
                    } else {
                        console.log("Local profile picture deleted successfully");
                    }
                });
            }

            // Update the editable fields
            if (semester) user.semester = semester;
            if (branch) user.branch = branch;
            if (bio) user.bio = bio;
            if (city) user.city = city;

            // Save the updated user information
            await user.save();

            // Return the updated user profile
            return res.status(200).json({ success: true, message: 'Profile updated successfully', user });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server error', error });
        }
    });
});

module.exports = {
    getUserProfile,
    updateUserProfile,
};
