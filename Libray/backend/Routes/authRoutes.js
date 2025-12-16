import express from "express";
const router = express.Router();

import { registrationValidation, loginValidation } from "../Middlewares/authValidation.js";
import { register, login, getAllUsers } from "../Controller/authController.js";

router.post("/register", registrationValidation, register);
router.post("/login", loginValidation, login);

// Admin
router.get("/users", getAllUsers);

export default router;