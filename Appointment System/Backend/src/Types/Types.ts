import { Document } from "mongoose";
import { Types } from "mongoose";
export type UserRole = "doctor" | "patient" | "admin";

export interface userRequest {
  user?: {
    id: string;
    name?: string;
    email?: string;
    role: UserRole;
  };
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;

  // Patient fields
  phone?: string;
  gender?: "male" | "female" | "other";
  age?: number;

  // Doctor fields
  speciality?: string;
  experience?: number;
  unavailableDates?: Date[]; 

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAppointment {
  _id?: string;

  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;

  date: Date;
  startTime: string;
  endTime: string;

  approved?: boolean;
  cancelled?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}