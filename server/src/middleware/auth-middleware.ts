import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt-service";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("No Authorization header found"); // Debugging
    return res.status(401).json({ message: "No header provided" });
  }

  // Handle both "Bearer <token>" and just "<token>"
  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : parts[0];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
