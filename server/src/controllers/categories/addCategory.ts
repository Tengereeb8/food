import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.foodCategory.create({
      data: { categoryName: req.body.categoryName },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};
