const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const token = req.headers["x-auth-token"];
    if(!token){
        return res.status(401).json({
            status: false,
            message: "Token not provided!"
        })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Now contains { email, role }
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: `Invalid or expired token!`
        }) 
    }
}

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            status: false,
            message: "Access Denied: Admin role required!"
        });
    }
}

module.exports = { authenticate, adminOnly };