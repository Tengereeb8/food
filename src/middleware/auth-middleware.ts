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
  const token = authHeader && authHeader.split(" ")[1]; // Extracts "TOKEN" from "Bearer TOKEN"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info (id, email) to the request object
    next(); // Move to the actual controller
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
