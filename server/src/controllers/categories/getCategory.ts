import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.foodCategory.findMany({
      include: { foods: true },
      orderBy: { categoryName: "asc" },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
};
