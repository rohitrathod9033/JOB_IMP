"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Token_1 = __importDefault(require("../Middleware/Token"));
const doctorOnly_1 = require("../Middleware/doctorOnly");
const doctorController_1 = require("../Controller/doctorController");
const router = express_1.default.Router();
router.get("/appointments-slots/view", Token_1.default, doctorOnly_1.doctorOnly, doctorController_1.doctorAppointments);
router.put("/appointment-slots/accept/:id", Token_1.default, doctorOnly_1.doctorOnly, doctorController_1.acceptAppointment);
router.put("/appointment-slots/reject/:id", Token_1.default, doctorOnly_1.doctorOnly, doctorController_1.rejectAppointment);
router.put("/unavailable-dates", Token_1.default, doctorOnly_1.doctorOnly, doctorController_1.updateUnavailableSlots);
router.get("/patient/:id", Token_1.default, doctorOnly_1.doctorOnly, doctorController_1.getPatientDetails);
exports.default = router;
//# sourceMappingURL=doctorPanelRoutes.js.map