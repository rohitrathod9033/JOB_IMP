"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAppointments = exports.getDoctorById = exports.getAllDoctors = exports.deleteDoctor = exports.updateDoctor = exports.addDoctor = void 0;
const User_1 = __importDefault(require("../Model/User"));
const Appointment_1 = __importDefault(require("../Model/Appointment"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Add Doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, experience } = req.body;
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const doctor = new User_1.default({
            name,
            email,
            password: hashPassword,
            role: "doctor",
            speciality,
            experience,
        });
        await doctor.save();
        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor,
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.addDoctor = addDoctor;
// Update Doctor
const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const updatedData = req.body;
        const doctor = await User_1.default.findByIdAndUpdate(doctorId, updatedData, {
            new: true,
        });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            doctor,
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.updateDoctor = updateDoctor;
// Delete Doctor
const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await User_1.default.findByIdAndDelete(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.deleteDoctor = deleteDoctor;
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User_1.default.find({ role: "doctor" });
        return res.status(200).json({
            success: true,
            doctors,
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.getAllDoctors = getAllDoctors;
const getDoctorById = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await User_1.default.findById(doctorId);
        return res.status(200).json({
            success: true,
            doctor,
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.getDoctorById = getDoctorById;
// -------------------
// Appointment Section
// -------------------
const getAllAppointments = async (req, res) => {
    try {
        const allAppointments = await Appointment_1.default.find()
            .populate("doctorId", "name email speciality")
            .populate("patientId", "name email phone");
        return res.status(200).json({
            success: true,
            appointments: allAppointments,
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.getAllAppointments = getAllAppointments;
//# sourceMappingURL=adminController.js.map