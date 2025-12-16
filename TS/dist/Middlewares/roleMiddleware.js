const authorizeRole = (...role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied :: Admins can access only",
                success: false,
            });
        }
        next();
    };
};
export default authorizeRole;
//# sourceMappingURL=roleMiddleware.js.map