import express from "express";
import { loginValidation,registrationValidation } from "../Validation/userValidation";
import { registrationController, loginController } from "../Controller/authController";
const router = express.Router();

router.post("/login", loginValidation, loginController);
router.post("/register", registrationValidation, registrationController);

export default router;
