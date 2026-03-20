import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await prisma.foodOrder.update({
      where: { id: Number(req.params.id) },
      data: { status: req.body.status },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};
