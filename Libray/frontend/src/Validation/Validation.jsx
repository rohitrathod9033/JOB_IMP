import * as Yup from 'yup';

const name = /^[A-Za-z ]+$/;
const email = /^[A-Za-z][A-Za-z0-9._]*@(gmail|yahoo|hotmail)\.[A-Za-z]{2,4}$/;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const registerValidation = Yup.object({
    name: Yup.string().trim()
        .matches(name, "Name must contain only letters and spaces")
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name is too long")
        .required("Name is required"),

    email: Yup.string().trim()
        .matches(email, "Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .matches(password, "Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character")
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password is too long")
        .required("Password is required"),

    role: Yup.string()
        .oneOf(["admin", "member"], "Role must be either admin or member")
        .required("Role is required")
});

const loginValidation = Yup.object({
    email: Yup.string().trim()
        .matches(email, "Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .matches(password, "Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character")
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password is too long")
        .required("Password is required"),
});

const bookValidation = Yup.object({
    title: Yup.string()
        .matches(/^[A-Za-z0-9][A-Za-z0-9 ]*$/, "Invalid title format")
        .min(2, "Title must be at least 2 characters")
        .max(100, "Title is too long")
        .required("Title is required"),

    author: Yup.string()
        .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Author must contain only letters")
        .min(2, "Author name is too short")
        .max(50, "Author name is too long")
        .required("Author is required"),

    category: Yup.string()
        .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Category must contain only letters")
        .min(3, "Category is too short")
        .max(30, "Category is too long")
        .required("Category is required"),

    publicationYear: Yup.number()
        .min(1950, "Year cannot be less than 1950")
        .max(new Date().getFullYear(), `Year cannot be greater than ${new Date().getFullYear()}`)
        .required("Publication year is required"),

    totalCopies: Yup.number()
        .integer("Total copies must be an integer")
        .min(1, "Total copies must be at least 1")
        .required("Total copies are required"),

    availableCopies: Yup.number()
        .integer("Available copies must be an integer")
        .min(0, "Available copies cannot be negative")
        .max(Yup.ref("totalCopies"), "Available copies cannot exceed total copies")
        .required("Available copies are required"),

    status: Yup.string()
        .oneOf(["available", "unavailable"], "Status must be available or unavailable")
        .required("Status is required"),

    thumbnail: Yup.mixed()
        .required("Thumbnail is required")
});

export { registerValidation, loginValidation, bookValidation };
