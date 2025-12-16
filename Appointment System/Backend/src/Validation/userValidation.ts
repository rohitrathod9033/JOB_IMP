import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const name = /^[A-Za-z ]+$/;
const doctorName = /^Dr\.\s[A-Za-z ]+$/;
const email = /^[A-Za-z][A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const doctorEmail = /^dr[A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const password =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const registrationValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    role: Joi.string()
      .valid("doctor", "patient", "admin")
      .default("patient")
      .required(),

    // NAME
    name: Joi.when("role", {
      is: "doctor",
      then: Joi.string().pattern(doctorName).required(),
      otherwise: Joi.string().pattern(name).min(3).max(30).required(),
    }),

    // EMAIL
    email: Joi.when("role", {
      is: "doctor",
      then: Joi.string().pattern(doctorEmail).required(),
      otherwise: Joi.string().pattern(email).required(),
    }),

    password: Joi.string().pattern(password).min(6).max(100).required(),

    // DOCTOR FIELDS
    speciality: Joi.when("role", {
      is: "doctor",
      then: Joi.string().min(3).max(30).required(),
      otherwise: Joi.forbidden(),
    }),

    experience: Joi.when("role", {
      is: "doctor",
      then: Joi.number().min(1).max(100).required(),
      otherwise: Joi.forbidden(),
    }),

    // PATIENT FIELDS
    phone: Joi.when("role", {
      is: "patient",
      then: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
      otherwise: Joi.forbidden(),
    }),

    gender: Joi.when("role", {
      is: "patient",
      then: Joi.string().valid("male", "female", "other").required(),
      otherwise: Joi.forbidden(),
    }),

    age: Joi.when("role", {
      is: "patient",
      then: Joi.number().min(1).max(120).required(),
      otherwise: Joi.forbidden(),
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Wrong Registration Validation",
      error: error.details[0].message,
    });
  }
  next();
};

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().pattern(email).required(),
    password: Joi.string().pattern(password).min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Wrong Login Validation",
      error: error.details[0].message,
    });
  }
  next();
};

export { registrationValidation, loginValidation };