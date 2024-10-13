const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

module.exports = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers['authorization'].split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed: Invalid token',
                });
            }

            // Decode the user ID from the token
            const userId = decode.id;

            // Find the user in the database
            const user = await User.findById(userId);

            // Check if the user exists and their role is 'admin'
            if (!user || user.role !== 'admin') {
                return res.status(403).send({
                    success: false,
                    message: 'Unauthorized: Admin access required',
                });
            }

            // Attach the user object to the request and proceed
            req.user = user;
            next();
        });
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            success: false,
            message: 'Authentication failed',
            error: err.message,
        });
    }
};
