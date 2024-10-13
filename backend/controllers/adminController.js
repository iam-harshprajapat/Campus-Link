const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

// @desc    Getting list of all the users who are pending for approval by admin
// @route   POST /api/admin/pending-for-approval
// @access  Admin only
const getUserPendigForApproval = asyncHandler(async (req, res) => {
    try {
        const unapprovedUser = await User.find({ isApproved: false });
        if (unapprovedUser) {
            return res.status(200).send({
                success: true,
                message: 'Unapproved user fetched successfully!',
                unapprovedUser
            })
        }
        return res.status(404).send({
            success: false,
            message: 'No UnApproved users found!',
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal server error!',
            error
        })
    }

})


// @desc    approving user by their id or email
// @route   POST /api/admin/approve-user
// @access  Admin only
const approveUser = asyncHandler(async (req, res) => {
    const { _id, email } = req.body;
    if (email || _id) {
        try {
            const user = await User.findOne({ $or: [{ _id }, { email }] });

            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found!'
                })
            }
            if (user.isApproved === true) {
                return res.status(400).send({
                    success: false,
                    message: 'User already approved!'
                })
            }
            user.isApproved = true;
            await user.save();
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: '🎉 You\'re Approved! Time to Log In and Explore 🚀',
                text: `Dear ${user.name},\n\nGreat news! 🎊 Your account has been approved by the admin, and you’re all set to dive into the platform. 🌟\n\nYou can now log in and start connecting with your peers, faculty, and more. 💻🔑\n\nIf you have any questions or need help getting started, feel free to reach out. We're excited to have you on board!\n\n\nRegards,\nCampus Link`
            });
            return res.status(200).send({
                success: true,
                message: `User approved with email ${user.email}`
            })
        }
        catch (error) {
            return res.statusMessage(500).send({
                success: false,
                message: 'Internal server error!',
                error
            })

        }
    }
    else {
        return res.status(401).send({
            success: false,
            messgae: 'Please Provide user _id or email'
        })
    }
})



// @desc    rejecting user by their id or email
// @route   POST /api/admin/reject-user
// @access  Admin only
const rejectUser = asyncHandler(async (req, res) => {
    const { _id, email, reason } = req.body;
    if (_id || email) {
        try {
            const user = await User.findOne({ $or: [{ _id }, { email }] })
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found!'
                })
            }
            if (user.isApproved === false) {
                const emailText = reason ? `Hello ${user.name},\n\nWe regret to inform you that your recent registration has been rejected by our admin team due to some issues with the provided details.\n\nReason: ${reason}\n\nBut don’t worry! You can re-register with the correct details by visiting our website.\n\nPlease make sure that all your information is accurate to ensure a smooth approval process.\n\nWe look forward to having you on board soon! 😃\n\nBest regards,\nThe Campus Link Team` :
                    `Hello ${user.name},\n\nWe regret to inform you that your recent registration has been rejected by our admin team due to some issues with the provided details.\n\nBut don’t worry! You can re-register with the correct details by visiting our website.\n\nPlease make sure that all your information is accurate to ensure a smooth approval process.\n\nWe look forward to having you on board soon! 😃\n\n\nRegards,\nCampus Link`
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Registration Rejected - Action Required ⚠️',
                    text: emailText
                });
                await User.deleteOne({ emai: user.email });//write after sending email
            }
            if (user.isApproved === true) {
                const emailText = reason ? `Hello ${user.name},\n\nWe hope this message finds you well.\n\nWe regret to inform you that your account has been temporarily suspended due to some unusual or suspicious activity detected on our platform. 🚫🔍\n\nReason: ${reason}\n\nOur team takes security and compliance seriously to ensure a safe environment for all users. If you believe this is a mistake or would like more information, please reach out to our support team at service.campuslink@gmail.com for assistance.\n\nWe will be happy to investigate further and help you resolve any issues.\n\nThank you for your understanding.\n\nBest regards,\nThe Campus Link Team`
                    : `Hello ${user.name},\n\nWe hope this message finds you well.\n\nWe regret to inform you that your account has been temporarily suspended due to some unusual or suspicious activity detected on our platform. 🚫🔍\n\nOur team takes security and compliance seriously to ensure a safe environment for all users. If you believe this is a mistake or would like more information, please reach out to our support team at service.campuslink@gmail.com for assistance.\n\nWe will be happy to investigate further and help you resolve any issues.\n\nThank you for your understanding.\n\n\nRegards,\nCampus Link`
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Account Suspension Due to Suspicious Activity ⚠️',
                    text: emailText
                });
                await User.deleteOne({ email: user.email });//write after sending email
            }
            return res.status(200).send({
                success: true,
                message: 'User\'s profile rejected successfully'
            })
        }
        catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: 'Internal server error!',
                error
            })
        }
    }
    else {
        return res.status(400).send({
            success: false,
            message: 'Please Provide user _id or email!'
        })
    }
})
module.exports = {
    getUserPendigForApproval,
    approveUser,
    rejectUser,
}