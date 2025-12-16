"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY || "";
if (!SECRET_KEY) {
    console.warn("Secreat Key is missing");
}
let Token = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    // If no token provided
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token Not Found || Require Token for Authorization",
            success: false,
        });
    }
    const token = bearerToken.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Wrong Token Entered", success: false });
    }
    try {
        // Decode Token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        req.userId = decoded.id;
        req.userRole = decoded.role;
        return next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ message: "Invalid Token Entered", success: false });
    }
};
exports.default = Token;
//# sourceMappingURL=Token.js.map