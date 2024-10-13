const cron = require('node-cron');
const User = require('../models/User');

// Function to delete unverified users with expired OTPs
const cleanupUnverifiedUsers = async () => {
    const now = new Date();
    try {
        const result = await User.deleteMany({ otpExpires: { $lt: now }, otp: { $exists: true } });
        console.log(`Cleanup completed. Deleted ${result.deletedCount} unverified users.`);
    } catch (err) {
        console.error('Error while cleaning up unverified users:', err);
    }
};

// Schedule the job to run at a specified interval (e.g., every hour)
const scheduleCleanupJob = () => {
    cron.schedule('0 * * * *', cleanupUnverifiedUsers); // Runs every hour
};

module.exports = { scheduleCleanupJob };
