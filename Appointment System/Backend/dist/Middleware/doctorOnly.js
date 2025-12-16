"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorOnly = void 0;
const doctorOnly = (req, res, next) => {
    if (req.userRole !== "doctor") {
        return res.status(403).json({
            success: false,
            message: "Access denied: Only doctors can access this route",
        });
    }
    next();
};
exports.doctorOnly = doctorOnly;
//# sourceMappingURL=doctorOnly.js.map