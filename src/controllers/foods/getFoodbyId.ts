import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getFood = async (req: Request, res: Response) => {
  try {
    const food = await prisma.food.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food" });
  }
};
