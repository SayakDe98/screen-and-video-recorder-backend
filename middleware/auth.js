const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.authenticate = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            throw new Error("Access denied. No token provided.");
        }
        const { authorization } = req.headers;
        const decodedToken = jwt.decode(authorization, process.env.jwtSecret);
        req.user = decodedToken;

        next();
    } catch (error) {
        res.status(401).json({
            message: error.message,
            success: false,
        });
    }
}