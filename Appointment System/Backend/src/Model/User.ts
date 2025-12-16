import mongoose, { Schema } from "mongoose";
import { IUser } from "../Types/Types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["doctor", "patient", "admin"],
      default: "patient",
    },

    // Doctor-specific fields
    speciality: {
      type: String,
      trim: true,
    },

    experience: {
      type: Number,
      min: 0,
    },

    // Patient-specific fields
    phone: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    age: {
      type: Number,
      min: 0,
    },

    // Full-day unavailable dates for doctors
    unavailableDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;