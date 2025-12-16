import { Request, Response } from "express";
import User from "../Model/User";
import Appointment from "../Model/Appointment";
import mongoose from "mongoose";
import dayjs from "dayjs";
import { generateSlots } from "../Utils/slotCreate";

const bookAppointmentByPatient = async (req: Request, res: Response) => {
  try {
    const { doctorId, date, startTime, endTime } = req.body;
    const patientId = req.userId;
    console.log("PATIENT ID: ", patientId);

    if (!doctorId || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const appointmentDate = dayjs(date).startOf("day").toDate();
    console.log("APPOINTMENT DATE: ", appointmentDate);

    const doctor = await User.findById(doctorId);
    console.log("DOCTOR From Patient Controller: ", doctor);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found from Backend",
      });
    }

    const unavailableDates =
      doctor.unavailableDates?.map((date) => dayjs(date).format("YYYY-MM-DD")) || [];

    const formattedRequestDate = dayjs(appointmentDate).format("YYYY-MM-DD");
    console.log("FORMATTED REQUEST DATE: ", formattedRequestDate);

    if (unavailableDates.includes(formattedRequestDate)) {
      return res.status(400).json({
        success: false,
        message: "Doctor unavailable on this date",
      });
    }

    const existing = await Appointment.findOne({
      doctorId,
      date: appointmentDate,
      startTime,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Appointment already booked",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const [appointment] = await Appointment.create(
        [
          {
            doctorId,
            patientId,
            date: appointmentDate,
            startTime,
            endTime,
            approved: false,
            cancelled: false,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        appointment,
      });
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();

      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "This slot has just been booked by someone else.",
        });
      }

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// view my appointments by patient
const myAppointments = async (req: Request, res: Response) => {
  try {
    const patientId = req.userId;
    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name email speciality")
      .sort({ date: 1, startTime: 1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// cancel appointment by patient
const cancelAppointmentByPatient = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const patientId = req.userId;

    const appointment = await Appointment.findById(appointmentId);

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
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { doctorId, date } = req.body;

    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: "doctorId and date are required",
      });
    }

    const appointmentDate = dayjs(date).startOf("day").toDate();

    const allSlots = generateSlots(appointmentDate);
    const booked = await Appointment.find({ doctorId, date: appointmentDate });

    const available = allSlots.filter((slot) => {
      const slotStart = dayjs(slot.start).format("HH:mm");
      const slotEnd = dayjs(slot.end).format("HH:mm");

      return !booked.some(
        (b) => b.startTime === slotStart && b.endTime === slotEnd
      );
    });

    const formatted = available.map((slot) => ({
      startTime: dayjs(slot.start).format("HH:mm"),
      endTime: dayjs(slot.end).format("HH:mm"),
    }));

    return res.status(200).json({
      success: true,
      totalSlots: formatted.length,
      availableSlots: formatted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching slots",
      error: err,
    });
  }
};

const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export {
  bookAppointmentByPatient,
  myAppointments,
  cancelAppointmentByPatient,
  getAvailableSlots,
  getAllDoctors,
};
