let Joi = require("joi");

let registrationValidation = (req, res, next) => {
    let { name, email, password } = req.body;

    let schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate({ name, email, password });
    if (error) {
        return res.status(400).json({ messege: "Bad Request", error });
    }
    next();
};


// let loginValidation = (req, res, next) => {
//     let schema = Joi.object({
//         email: Joi.string().email({ tlds: { allow: false } }).required(),
//         password: Joi.string().min(6).max(100).required()
//     });

//     const { error } = schema.validate({ email, password });
//     if (error) {
//         return res.status(400).json({ messege: "Bad Request", error });
//     }
//     next();
// };

let loginValidation = (req, res, next) => {
    let { email, password } = req.body;

    let schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate({ email, password });
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
};


module.exports = {registrationValidation, loginValidation};