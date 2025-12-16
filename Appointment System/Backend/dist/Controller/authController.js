"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registrationController = void 0;
const User_js_1 = __importDefault(require("../Model/User.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY || "";
if (!SECRET_KEY) {
    console.warn("SECREAT_KEY is missing");
}
const registrationController = async (req, res) => {
    try {
        const { password, email, ...otherFields } = req.body;
        const existsUser = await User_js_1.default.findOne({ email });
        if (existsUser) {
            return res.status(403).json({
                message: "User Already Exist || Register Failed",
                success: false,
            });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_js_1.default({
            ...otherFields,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(201).json({
            message: "Register Successfully || User Created Successfully",
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "User Already Exist || Registration Failed",
            success: false,
            error: error.message,
        });
    }
};
exports.registrationController = registrationController;
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_js_1.default.findOne({ email }).lean();
        if (!user) {
            return res
                .status(403)
                .json({ message: "User not found", success: false });
        }
        const isPass = await bcrypt_1.default.compare(password, user.password);
        if (!isPass) {
            return res
                .status(403)
                .json({ message: "Password not match", success: false });
        }
        // Token Generate
        const jwtToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Login Successfully",
            success: true,
            token: jwtToken,
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            speciality: user.speciality,
            experience: user.experience,
            phone: user.phone,
            gender: user.gender,
            age: user.age,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};
exports.loginController = loginController;
//# sourceMappingURL=authController.js.map