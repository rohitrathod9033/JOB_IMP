"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Token_1 = __importDefault(require("../Middleware/Token"));
const adminOnly_1 = require("../Middleware/adminOnly");
const adminController_1 = require("../Controller/adminController");
const router = express_1.default.Router();
// Only admin can access these
router.post("/doctor/add", Token_1.default, adminOnly_1.adminOnly, adminController_1.addDoctor);
router.put("/doctor/update/:id", Token_1.default, adminOnly_1.adminOnly, adminController_1.updateDoctor);
router.delete("/doctor/delete/:id", Token_1.default, adminOnly_1.adminOnly, adminController_1.deleteDoctor);
router.get("/getAllAppointments", Token_1.default, adminOnly_1.adminOnly, adminController_1.getAllAppointments);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map