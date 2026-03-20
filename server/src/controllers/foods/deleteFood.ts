import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const food = await prisma.food.delete({
      where: { id: Number(req.params.id) },
    });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete food" });
  }
};
