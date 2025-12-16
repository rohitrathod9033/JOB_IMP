"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Token_1 = __importDefault(require("../Middleware/Token"));
const patientController_1 = require("../Controller/patientController");
router.post("/bookAppointment-slots", Token_1.default, patientController_1.bookAppointmentByPatient);
router.get("/myAppointments-slots", Token_1.default, patientController_1.myAppointments);
router.put("/appointment/cancel/:id", Token_1.default, patientController_1.cancelAppointmentByPatient);
router.post("/available-slots", patientController_1.getAvailableSlots);
exports.default = router;
//# sourceMappingURL=patientRoutes.js.map