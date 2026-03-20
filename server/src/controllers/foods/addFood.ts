import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, foodCategoryId } = req.body;

    const food = await prisma.food.create({
      data: {
        foodName: foodName,
        price: parseFloat(price),
        image,
        ingredients,
        foodCategoryId: Number(foodCategoryId),
      },
    });

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Check if foodCategoryId exists in the database." });
  }
};
