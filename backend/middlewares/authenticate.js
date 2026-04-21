const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const authorization = req.headers["x-auth-token"];
    const token = authorization || authorization?.split[1];
    if(!token){
        return res.status(401).json({
            status: false,
            message: "Token not provided!"
        })
    }
    try {
        const verify = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error while authentication: ${error.message}`
        }) 
    }
}

module.exports = authenticate;