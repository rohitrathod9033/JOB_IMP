"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSlots = exports.cancelAppointmentByPatient = exports.myAppointments = exports.bookAppointmentByPatient = void 0;
const User_1 = __importDefault(require("../Model/User"));
const Appointment_1 = __importDefault(require("../Model/Appointment"));
const mongoose_1 = __importDefault(require("mongoose"));
const dayjs_1 = __importDefault(require("dayjs"));
const slotCreate_1 = require("../Utils/slotCreate");
// book appointment by patient
const bookAppointmentByPatient = async (req, res) => {
    try {
        const { doctorId, date, startTime, endTime } = req.body;
        const patientId = req.userId;
        if (!doctorId || !date || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // string to date
        const appointmentdate = (0, dayjs_1.default)(date).toDate();
        const doctor = await User_1.default.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        const unavailable = doctor.unavailableDates?.map((d) => {
            return (0, dayjs_1.default)(d).format("YYYY-MM-DD");
        }) || [];
        const stringDate = (0, dayjs_1.default)(appointmentdate).format("YYYY-MM-DD");
        if (unavailable.includes(stringDate)) {
            return res.status(400).json({
                success: false,
                message: "Doctor unavailable on this date",
            });
        }
        const exist = await Appointment_1.default.findOne({
            doctorId,
            date: appointmentdate,
            startTime,
            endTime,
        });
        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Appointment already Booked",
            });
        }
        // -----------
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const appointment = await Appointment_1.default.create([{ doctorId, patientId, date: appointmentdate, startTime, endTime }], { session });
            await session.commitTransaction();
            session.endSession();
            return res.status(201).json({
                success: true,
                message: "Appointment booked successfully",
                appointment: appointment[0],
            });
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.bookAppointmentByPatient = bookAppointmentByPatient;
// view my appointments by patient
const myAppointments = async (req, res) => {
    try {
        const patientId = req.userId;
        const appointments = await Appointment_1.default.find({ patientId })
            .populate("doctorId", "name email speciality")
            .sort({ date: 1, startTime: 1 });
        return res.status(200).json({
            success: true,
            appointments,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.myAppointments = myAppointments;
// cancel appointment by patient
const cancelAppointmentByPatient = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const patientId = req.userId;
        const appointment = await Appointment_1.default.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }
        if (appointment.patientId.toString() !== patientId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }
        appointment.cancelled = true;
        await appointment.save();
        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.cancelAppointmentByPatient = cancelAppointmentByPatient;
const getAvailableSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.body;
        if (!doctorId || !date) {
            return res.status(400).json({
                success: false,
                message: "doctorId and date are required",
            });
        }
        const appointmentDate = (0, dayjs_1.default)(date).startOf("day").toDate();
        const bookedAppointments = await Appointment_1.default.find({
            doctorId,
            date: appointmentDate,
        }).select("startTime endTime");
        const booked = bookedAppointments.map((a) => ({
            start: a.startTime,
            end: a.endTime,
        }));
        // create
        const allSlots = (0, slotCreate_1.createSlots)();
        const availableSlots = allSlots.filter((slot) => {
            const alreadyBooked = booked.some((b) => b.start === slot.start && b.end === slot.end);
            console.log(alreadyBooked);
            return !alreadyBooked;
        });
        console.log(availableSlots);
        return res.status(200).json({
            success: true,
            totalSlots: allSlots.length,
            bookedSlots: booked.length,
            availableSlots,
            message: "Slots fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAvailableSlots = getAvailableSlots;
//# sourceMappingURL=patientController.js.map