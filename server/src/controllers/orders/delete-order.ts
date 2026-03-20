import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderId = Number(id);

  try {
    const [deletedItems, deletedOrder] = await prisma.$transaction([
      prisma.foodOrderItem.deleteMany({ where: { foodOrderId: orderId } }),
      prisma.foodOrder.delete({ where: { id: orderId } }),
    ]);

    res.status(200).json({
      message: "Order and items deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
