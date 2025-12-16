import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const registrationValidation = (req: Request, res: Response, next: NextFunction) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email({tlds: {allow: false}}).required(),
        password: Joi.string().min(6).max(100).required(),
        role: Joi.string().valid("admin", "member").required(),
    });

    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
};

const loginValidation = (req: Request, res: Response, next: NextFunction) => {

    const schema = Joi.object({
        email: Joi.string().email({tlds: {allow: false}}).required(),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
};


export { registrationValidation, loginValidation };