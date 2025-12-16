"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registrationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const name = /^[A-Za-z ]+$/;
const doctorName = /^Dr\.\s[A-Za-z ]+$/;
const email = /^[A-Za-z][A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const doctorEmail = /^dr[A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const registrationValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        role: joi_1.default.string()
            .valid("doctor", "patient", "admin")
            .default("patient")
            .required(),
        // NAME
        name: joi_1.default.when("role", {
            is: "doctor",
            then: joi_1.default.string().pattern(doctorName).required(),
            otherwise: joi_1.default.string().pattern(name).min(3).max(30).required(),
        }),
        // EMAIL
        email: joi_1.default.when("role", {
            is: "doctor",
            then: joi_1.default.string().pattern(doctorEmail).required(),
            otherwise: joi_1.default.string().pattern(email).required(),
        }),
        password: joi_1.default.string().pattern(password).min(6).max(100).required(),
        // DOCTOR FIELDS
        speciality: joi_1.default.when("role", {
            is: "doctor",
            then: joi_1.default.string().min(3).max(30).required(),
            otherwise: joi_1.default.forbidden(),
        }),
        experience: joi_1.default.when("role", {
            is: "doctor",
            then: joi_1.default.number().min(1).max(100).required(),
            otherwise: joi_1.default.forbidden(),
        }),
        // PATIENT FIELDS
        phone: joi_1.default.when("role", {
            is: "patient",
            then: joi_1.default.string()
                .pattern(/^[0-9]{10}$/)
                .required(),
            otherwise: joi_1.default.forbidden(),
        }),
        gender: joi_1.default.when("role", {
            is: "patient",
            then: joi_1.default.string().valid("male", "female", "other").required(),
            otherwise: joi_1.default.forbidden(),
        }),
        age: joi_1.default.when("role", {
            is: "patient",
            then: joi_1.default.number().min(1).max(120).required(),
            otherwise: joi_1.default.forbidden(),
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
exports.registrationValidation = registrationValidation;
const loginValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().pattern(email).required(),
        password: joi_1.default.string().pattern(password).min(6).max(100).required(),
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
exports.loginValidation = loginValidation;
//# sourceMappingURL=userValidation.js.map