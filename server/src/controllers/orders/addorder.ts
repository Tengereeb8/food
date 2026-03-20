import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type FoodOrder = {
  foodId: number;
  quantity: number;
};

type Body = {
  food: FoodOrder[];
};
export const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;
    const { food }: Body = req.body;

    const foodItemsFromDb = await prisma.food.findMany({
      where: {
        id: { in: food.map((item) => item.foodId) },
      },
    });

    const totalPrice = food.reduce((acc, item) => {
      const foodDetails = foodItemsFromDb.find((f) => f.id === item.foodId);
      if (!foodDetails) throw new Error(`Food item ${item.foodId} not found`);

      return acc + foodDetails.price * item.quantity;
    }, 0);
    const order = await prisma.foodOrder.create({
      data: {
        userId,
        totalPrice: totalPrice,
        foodOrderItems: {
          create: food.map((item) => ({
            foodId: item.foodId,
            quantity: item.quantity,
          })),
        },
      },
      include: { foodOrderItems: true },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
