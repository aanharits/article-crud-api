const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            status: 'Unauthorized - Token not found',
        });
    }

    const token = bearer.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            status: 'Forbidden - Invalid token',
        });
    }
};

module.exports = authorize;
