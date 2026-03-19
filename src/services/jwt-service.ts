import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// Define payload type
interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

// Generate JWT token
export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: "3h",
  };

  return jwt.sign(payload, secret, options);
};

// Verify JWT token
export const verifyToken = (token: string): JwtPayload | TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.verify(token, secret) as JwtPayload | TokenPayload;
};
