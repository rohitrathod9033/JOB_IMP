const authorizeRole = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied :: Admins can access only", success: false });
        }
        next();
    };
};

export { authorizeRole };