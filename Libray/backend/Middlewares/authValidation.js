import Joi from "joi";

const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[A-Za-z][A-Za-z0-9]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

let registrationValidation = (req, res, next) => {
    let schema = Joi.object({
        name: Joi.string()
            .pattern(nameRegex)
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .pattern(emailRegex)
            .required(),

        password: Joi.string()
            .pattern(passwordRegex)
            .min(6)
            .max(100)
            .required(),

        role: Joi.string()
            .valid("admin", "member")
            .default("member")
            .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Wrong Registration Validation",
            error: error.details[0].message
        });
    }
    next();
};

let loginValidation = (req, res, next) => {
    let schema = Joi.object({
        email: Joi.string()
            .pattern(emailRegex)
            .required(),

        password: Joi.string()
            .pattern(passwordRegex)
            .min(6)
            .max(100)
            .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Wrong Login Validation",
            error: error.details[0].message
        });
    }
    next();
};

export { registrationValidation, loginValidation };
