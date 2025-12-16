import * as yup from "yup";

const nameRegex = /^[A-Za-z ]+$/;
const doctorName = /^Dr\.\s[A-Za-z ]+$/;
const email = /^[A-Za-z][A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const doctorEmail = /^dr[A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const password =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const registerValidation = yup.object({
    role: yup
        .string()
        .oneOf(["doctor", "patient", "admin"])
        .required("Role is required"),

    name: yup.string().when("role", (role, schema) => {
        const r = Array.isArray(role) ? role[0] : role;

        return r === "doctor"
            ? schema
                  .matches(doctorName, "Name must start with 'Dr.'")
                  .required("Doctor name is required")
            : schema
                  .matches(nameRegex, "Only alphabets allowed")
                  .min(3)
                  .max(30)
                  .required("Name is required");
    }),

    email: yup.string().when("role", (role, schema) => {
        const r = Array.isArray(role) ? role[0] : role;

        return r === "doctor"
            ? schema
                  .matches(doctorEmail, "Doctor email must start with 'dr'")
                  .required("Doctor email is required")
            : schema
                  .matches(email, "Invalid email")
                  .required("Email is required");
    }),

    password: yup
        .string()
        .matches(
            password,
            "Password must have 6+ chars, 1 uppercase, 1 lowercase, 1 number & 1 special character"
        )
        .required("Password is required"),

    speciality: yup.string().when("role", {
        is: "doctor",
        then: (schema) =>
            schema.min(3).max(30).required("Speciality required"),
        otherwise: (schema) => schema.optional(),
    }),

    experience: yup.number().when("role", {
        is: "doctor",
        then: (schema) =>
            schema
                .typeError("Experience must be a number")
                .min(1)
                .max(100)
                .required("Experience is required"),
        otherwise: (schema) => schema.optional(),
    }),

    phone: yup.string().when("role", {
        is: "patient",
        then: (schema) =>
            schema
                .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
                .required("Phone is required"),
        otherwise: (schema) => schema.optional(),
    }),

    gender: yup.string().when("role", {
        is: "patient",
        then: (schema) =>
            schema
                .oneOf(["male", "female", "other"])
                .required("Gender is required"),
        otherwise: (schema) => schema.optional(),
    }),

    age: yup.number().when("role", {
        is: "patient",
        then: (schema) =>
            schema
                .typeError("Age must be a number")
                .min(1)
                .max(120)
                .required("Age is required"),
        otherwise: (schema) => schema.optional(),
    }),
});

export default registerValidation;
