const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed!',
                });
            } else {
                req.user = { id: decode.id, role: decode.role }; // Attach user info to req.user
                next();
            }
        });
    } catch (err) {
        return res.status(401).send({
            success: false,
            message: 'Authentication failed!',
            error: err,
        });
    }
};
