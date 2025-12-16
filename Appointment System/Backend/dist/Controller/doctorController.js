"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientDetails = exports.updateUnavailableSlots = exports.rejectAppointment = exports.acceptAppointment = exports.doctorAppointments = void 0;
const Appointment_1 = __importDefault(require("../Model/Appointment"));
const User_1 = __importDefault(require("../Model/User"));
// view Appointment by doctor
const doctorAppointments = async (req, res) => {
    try {
        console.log("CUSTOM REQUEST OBJECT: ", req);
        const doctorId = req.userId;
        const appointments = await Appointment_1.default.find({
            doctorId,
            cancelled: false,
        }).populate("patientId", "name email phone age gender");
        return res.status(200).json({
            success: true,
            appointments,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.doctorAppointments = doctorAppointments;
// accept appointment by doctor
const acceptAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const doctorId = req.userId;
        const appointment = await Appointment_1.default.findById(appointmentId);
        console.log("appointment from doctor controll: ", appointment);
        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }
        if (appointment.doctorId.toString() !== doctorId) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        appointment.approved = true;
        await appointment.save();
        return res.status(200).json({
            success: true,
            message: "Appointment accepted",
            appointment,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.acceptAppointment = acceptAppointment;
// reject appointment by doctor
const rejectAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const doctorId = req.userId;
        const appointment = await Appointment_1.default.findById(appointmentId);
        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }
        if (appointment.doctorId.toString() !== doctorId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }
        appointment.cancelled = true;
        await appointment.save();
        return res.status(200).json({
            success: true,
            message: "Appointment rejected",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.rejectAppointment = rejectAppointment;
// update unavailable slots
const updateUnavailableSlots = async (req, res) => {
    try {
        const doctorId = req.userId;
        const { dates } = req.body;
        const doctor = await User_1.default.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        doctor.unavailableDates = dates;
        await doctor.save();
        return res.status(200).json({
            success: true,
            message: "Unavailable dates updated",
            doctor,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateUnavailableSlots = updateUnavailableSlots;
// patient detail by id
const getPatientDetails = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await User_1.default.findById(patientId).select("name email phone age gender");
        if (!patient) {
            return res
                .status(404)
                .json({ success: false, message: "Patient not found" });
        }
        return res.status(200).json({
            success: true,
            patient,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPatientDetails = getPatientDetails;
//# sourceMappingURL=doctorController.js.map