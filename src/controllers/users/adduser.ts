import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber } = req.body;
    const user = await prisma.user.create({
      data: { email, password, phoneNumber },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("❌ /users error:", error);

    res.status(500).json({ error: "Failed to create user" });
  }
};
