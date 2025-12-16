import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import "dotenv/config";
const SECRET_KEY = process.env.SECRET_KEY || "";

if (!SECRET_KEY) {
  console.warn("SECREAT_KEY is missing");
}

const registrationController = async (req: Request, res: Response) => {
  try {
    const { password, email, ...otherFields } = req.body;

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(403).json({
        message: "User Already Exist || Register Failed",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...otherFields,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "Register Successfully || User Created Successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "User Already Exist || Registration Failed",
      success: false,
      error: error.message,
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res
        .status(403)
        .json({ message: "User not found", success: false });
    }

    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res
        .status(403)
        .json({ message: "Password not match", success: false });
    }

    // Token Generate
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

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
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export { registrationController, loginController };
