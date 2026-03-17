import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

type FoodOrder = {
  foodId: number;
  quantity: number;
};

type Body = {
  food: FoodOrder[];
};

app.get("/orders", async (req, res) => {
  try {
    const orders = await prisma.foodOrder.findMany({
      include: {
        user: true,
        foodOrderItems: { include: { food: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const { userId, status } = req.body;
    const { food }: { food: { foodId: number; quantity: number }[] } = req.body;

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
});

// app.delete("/orders/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleteOrder = await prisma.foodOrder.delete({
//       where: { id: Number(id) },
//     });
//     res
//       .status(200)
//       .json({ message: "Order deleted successfully", order: deleteOrder });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json(error);
//   }
// });

app.delete("/orders/:id", async (req, res) => {
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
});

app.patch("/orders/:id", async (req, res) => {
  try {
    const order = await prisma.foodOrder.update({
      where: { id: Number(req.params.id) },
      data: { status: req.body.status },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
