import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateFood = async (req: Request, res: Response) => {
  try {
    const food = await prisma.food.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: "Failed to update food" });
  }
};
