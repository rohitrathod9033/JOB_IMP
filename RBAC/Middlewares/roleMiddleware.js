// Particular Role --- Access Route

let authorizeRole = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            return res.status(403).json({ message: "Access Denied", success: false });
        }
        next();
    }
};

module.exports = authorizeRole;