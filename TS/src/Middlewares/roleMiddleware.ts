import { Request, Response, NextFunction } from "express";
import { userRequest } from "../Types/type.js";

const authorizeRole = (...role: string[]) => {
  return (req: Request & userRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied :: Admins can access only",
        success: false,
      });
    }
    next();
  };
};

export default authorizeRole;
