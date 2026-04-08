import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../../services/hash-service";
import { generateToken } from "../../services/jwt-service";
import { AuthRequest } from "../../middleware/auth-middleware";

const SECRET = process.env.JWT_SECRET;

const prisma = new PrismaClient();

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, phoneNumber, address } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    const hashedPassword = await hashPassword(password);

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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({
      id: String(user.id),
      email: user.email,
      role: user.role,
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
export const profile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
      select: { id: true, email: true, address: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
