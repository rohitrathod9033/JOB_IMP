import express from "express";
import Token from "../Middleware/Token";
import checkRole from "../Middleware/checkRole";
import { doctorAppointments, acceptAppointment, rejectAppointment, updateUnavailableSlots, getPatientDetails} from "../Controller/doctorController";

const router = express.Router();

router.get("/appointments/view", Token, checkRole("doctor"), doctorAppointments);
router.put("/appointment/accept/:id", Token, checkRole("doctor"), acceptAppointment);
router.put("/appointment/reject/:id", Token, checkRole("doctor"), rejectAppointment);
router.put("/unavailable-dates", Token, checkRole("doctor"), updateUnavailableSlots);
router.get("/patient/:id", Token, checkRole("doctor"), getPatientDetails);

export default router;
