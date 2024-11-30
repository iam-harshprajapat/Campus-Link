const User = require('../models/User');
const getAllUsers = async (req, res) => {
    try {
        const results = await User.find();
        res.status(200).send({
            success: true,
            results
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server Error',
            error
        })

    }
}

module.exports = getAllUsers;