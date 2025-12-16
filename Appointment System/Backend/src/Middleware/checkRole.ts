import { Request, Response, NextFunction } from "express";

const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.userRole !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied: Only ${role}s can access this route`,
      });
    }
    next();
  };
};

export default checkRole;
