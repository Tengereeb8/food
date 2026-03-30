import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.foodOrder.findMany({
      include: {
        user: true,
        foodOrderItems: {
          include: { food: true },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
