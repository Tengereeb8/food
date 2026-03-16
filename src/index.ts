import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.foodCategory.findMany({
      include: { foods: true },
      orderBy: { categoryName: "asc" },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post("/categories", async (req, res) => {
  try {
    const category = await prisma.foodCategory.create({
      data: { categoryName: req.body.categoryName },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
    console.log({ categoryName: req.body.categoryName });
  }
});

app.post("/foods", async (req, res) => {
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
});

app.put("/foods/:id", async (req, res) => {
  try {
    const food = await prisma.food.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: "Failed to update food" });
  }
});
app.get("/foods/:id", async (req, res) => {
  try {
    const food = await prisma.food.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food" });
  }
});

app.delete("/foods/:id", async (req, res) => {
  try {
    await prisma.food.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete food" });
  }
});

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
    const { userId, totalPrice, status, items } = req.body;

    const order = await prisma.foodOrder.create({
      data: {
        userId,
        totalPrice: totalPrice,
        status,
        foodOrderItems: {
          create: items,
        },
      },
      include: { foodOrderItems: true },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("❌ /orders error:", error);
    res.status(500).json({ error: "Failed to create order" });
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

app.post("/users", async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    const user = await prisma.user.create({
      data: { email, password, phoneNumber },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("❌ /users error:", error);

    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: { orders: true },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
