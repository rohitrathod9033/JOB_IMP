import * as yup from "yup";

const emailRegex = /^[A-Za-z][A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const loginSchema = yup.object({
    email: yup
        .string()
        .matches(emailRegex, "Enter a valid email address")
        .required("Email is required"),

    password: yup
        .string()
        .matches(
            passwordRegex,
            "Password must contain 6+ chars with upper, lower, number & special char"
        )
        .required("Password is required"),
});

export default loginSchema;