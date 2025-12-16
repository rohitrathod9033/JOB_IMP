export type LoginForm = {
    email: string;
    password: string;
};

export type RegisterForm = {
  role?: "doctor" | "patient" | "admin";
  name: string;
  email: string;
  password: string;
  speciality?: string;
  experience?: number | null;
  age?: number | null;
  gender?: "male" | "female" | "other";
  phone?: string;
};

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;

    role: "doctor" | "patient" | "admin";

    // Doctor Fields
    speciality?: string;
    experience?: number;

    // Patient Fields
    phone?: string;
    gender?: "male" | "female" | "other";
    age?: number;
}

export interface Slot {
    startTime: string;
    endTime: string;
}

export interface Patient {
    name: string;
    email: string;
    phone?: string;
    age?: number;
    gender?: string;
}

export interface DoctorForm {
    _id: string;
    name: string;
    email: string;
    password: string;
    speciality: string;
    experience: number;
}

export interface IAppointment {
    _id: string;
    doctorId: DoctorForm;
    patientId: Patient;
    date: Date;
    startTime: string;
    endTime: string;
    approved: boolean;
    cancelled: boolean;
    createdAt: string;
}