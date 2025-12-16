import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "";
// console.log(" This is secret key",SECRET_KEY)
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return res
                .status(403)
                .json({ message: "User Already Exist || Register Failed", success: false });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword, role });
        await newUser.save();
        res.status(201).json({
            message: "Register Successfully || User Created Successfully",
            success: true,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({
            message: "User Already Exist || Register Failed",
            success: false,
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(403).json({ message: "User not found", success: false });
        }
        const isPass = await bcrypt.compare(password, user.password);
        if (!isPass) {
            return res.status(403).json({ message: "Password not match", success: false });
        }
        // Token Generate
        const jwtToken = jwt.sign({ id: user._id, role: user.role, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Login Successfully",
            success: true,
            jwtToken,
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};
export { register, login };
//# sourceMappingURL=authController.js.map