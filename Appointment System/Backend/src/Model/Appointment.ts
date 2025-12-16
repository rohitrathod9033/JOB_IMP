import mongoose, { Schema } from "mongoose";
import { IAppointment } from "../Types/Types";

const AppointmentSchema = new Schema<IAppointment>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },

    approved: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// PREVENT DOUBLE BOOKING
AppointmentSchema.index(
  { doctorId: 1, date: 1, startTime: 1 },
  { unique: true }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
export default Appointment;
