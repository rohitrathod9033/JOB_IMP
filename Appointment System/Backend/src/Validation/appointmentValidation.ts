import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const appointmentSchema = Joi.object({
  doctorId: Joi.string().required(),
  date: Joi.date().required(),

  startTime: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .optional(),

  endTime: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .optional(),

  approved: Joi.boolean().optional().default(false),
  cancelled: Joi.boolean().optional().default(false),
});

export const appointmentValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = appointmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};
