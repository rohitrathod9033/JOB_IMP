"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied: Only Admin can perform this action",
        });
    }
    next();
};
exports.adminOnly = adminOnly;
//# sourceMappingURL=adminOnly.js.map