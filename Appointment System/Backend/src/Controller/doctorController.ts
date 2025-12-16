import { Request, Response } from "express";
import Appointment from "../Model/Appointment";
import User from "../Model/User";

// view Appointment by doctor
const doctorAppointments = async (req: Request, res: Response) => {
  try {
    console.log("CUSTOM REQUEST OBJECT: ", req);
    const doctorId = req.userId;
    const appointments = await Appointment.find({
      doctorId,
      cancelled: false,
    }).populate("patientId", "name email phone age gender");

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// accept appointment by doctor
const acceptAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const doctorId = req.userId;

    const appointment = await Appointment.findById(appointmentId);
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
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// reject appointment by doctor
const rejectAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const doctorId = req.userId;

    const appointment = await Appointment.findById(appointmentId);

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
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update unavailable slots
const updateUnavailableSlots = async (req: Request, res: Response) => {
  try {
    const doctorId = req.userId;
    const { dates } = req.body;
    console.log("Unavailable Slots : ", req.body);

    const doctor = await User.findById(doctorId);

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
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// patient detail by id
const getPatientDetails = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;

    const patient = await User.findById(patientId).select(
      "name email phone age gender"
    );

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    return res.status(200).json({
      success: true,
      patient,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  doctorAppointments,
  acceptAppointment,
  rejectAppointment,
  updateUnavailableSlots,
  getPatientDetails,
};
