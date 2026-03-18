import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../../services/hash-service";
import { generateToken } from "../../services/jwt-service";

const SECRET = process.env.JWT_SECRET;

const prisma = new PrismaClient();

// 1. Register User
export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, phoneNumber, address } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user in Neon via Prisma
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phoneNumber,
        address,
      },
    });

    res.status(201).json({
      message: "User registered successfully!",
      userId: newUser.id,
    });
  } catch (err: any) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. Login User
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Compare hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT Token
    // Ensure your generateToken function accepts this payload shape
    const token = generateToken({
      id: String(user.id),
      email: user.email,
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
