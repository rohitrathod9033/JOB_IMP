import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userRequest } from "../Types/Types";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY || "";

if (!SECRET_KEY) {
  console.warn("Secreat Key is missing");
}

let Token = (
  req: Request & userRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const bearerToken = req.headers["authorization"];

  // If no token provided
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token Not Found || Require Token for Authorization",
      success: false,
    });
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Wrong Token Entered", success: false });
  }

  try {
    // Decode Token
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload & {
      id: string;
      name?: string;
      email?: string;
      role: "doctor" | "patient" | "admin";
    };

    req.user = decoded;

    req.userId = decoded.id;
    req.userRole = decoded.role;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Token Entered", success: false });
  }
};

export default Token;
