"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidation_1 = require("../Validation/userValidation");
const authController_1 = require("../Controller/authController");
const router = express_1.default.Router();
router.post("/login", userValidation_1.loginValidation, authController_1.loginController);
router.post("/register", userValidation_1.registrationValidation, authController_1.registrationController);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map