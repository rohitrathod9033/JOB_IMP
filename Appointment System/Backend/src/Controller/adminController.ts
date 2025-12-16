import { Request, Response } from "express";
import User from "../Model/User";
import Appointment from "../Model/Appointment";
import bcrypt from "bcrypt";

// Add Doctor
const addDoctor = async (req: Request, res: Response) => {
  try {
    const { name, email, password, speciality, experience } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const doctor = new User({
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
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update Doctor
const updateDoctor = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;
    const updatedData = req.body;

    const doctor = await User.findByIdAndUpdate(doctorId, updatedData, {
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
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Doctor
const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;

    const doctor = await User.findByIdAndDelete(doctorId);

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
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
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

const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;
    if (!doctorId) {
      return res.status(404).json({
        success: false,
        message: "Doctor ID Required",
      });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Appointment Section
const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const allAppointments = await Appointment.find()
      .populate("doctorId", "name email speciality")
      .populate("patientId", "name email phone");

    return res.status(200).json({
      success: true,
      appointments: allAppointments,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getDoctorByName = async (req: Request, res: Response) => {
  try {
    let { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Doctor name is required",
      });
    }

    const searchName = String(name);

    const doctor = await User.findOne({
      name: { $regex: searchName, $options: "i" },
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};



export {
  // Doctor
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  getDoctorByName,

  // Appointment
  getAllAppointments,
};
