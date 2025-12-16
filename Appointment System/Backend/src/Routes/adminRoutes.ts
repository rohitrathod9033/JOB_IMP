import express from "express";
import Token from "../Middleware/Token";
import checkRole from "../Middleware/checkRole";
import {
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getAllAppointments,
  getDoctorById,
  getDoctorByName,
  getAllDoctors,
} from "../Controller/adminController";

const router = express.Router();

router.post("/doctor/add", Token, checkRole("admin"), addDoctor);  
router.put("/doctor/update/:id", Token, checkRole("admin"), updateDoctor);
router.delete("/doctor/delete/:id", Token, checkRole("admin"), deleteDoctor);
router.get("/doctor/:id", Token, checkRole("admin"), getDoctorById);
router.get("/doctorName", Token, checkRole("admin"), getDoctorByName);
router.get("/getAllAppointments", Token, checkRole("admin"), getAllAppointments);

router.get("/getAllDoctors", Token, checkRole("admin"), getAllDoctors);

export default router;
