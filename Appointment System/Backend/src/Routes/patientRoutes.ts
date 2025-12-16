import express from "express";
const router = express.Router();
import Token from "../Middleware/Token";
import checkRole from "../Middleware/checkRole";
import { appointmentValidation } from "../Validation/appointmentValidation";
import { myAppointments, cancelAppointmentByPatient, bookAppointmentByPatient, getAvailableSlots, getAllDoctors} from "../Controller/patientController";

router.post("/bookAppointment", Token, checkRole("patient"), appointmentValidation, bookAppointmentByPatient);
router.get("/myAppointments", Token, checkRole("patient"), appointmentValidation, myAppointments);
router.put("/appointment/cancel/:id", Token, checkRole("patient"), appointmentValidation, cancelAppointmentByPatient);
router.post("/available-slots", Token, checkRole("patient"), appointmentValidation, getAvailableSlots);

router.get("/get-all-doctors", Token, checkRole("patient"), getAllDoctors);

export default router;




