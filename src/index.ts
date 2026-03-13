import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app.post("/foods", async (req, res) => {
//   try {
//     const { name, calories, category } = req.body;
//     const food = await prisma.food.create({
//       data: { name, calories, category },
//     });
//     res.status(201).json(food);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to create food entry" });
//   }
// });

// app.get("/foods", async (req, res) => {
//   try {
//     const foods = await prisma.food.findMany({
//       orderBy: { createdAt: "desc" },
//     });
//     res.json(foods);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch foods" });
//   }
// });

// app.get("/foods/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const food = await prisma.food.findUnique({ where: { id } });
//     if (!food) return res.status(404).json({ error: "Food not found" });
//     res.json(food);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching food" });
//   }
// });

// app.put("/foods/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, calories, category } = req.body;
//     const updatedFood = await prisma.food.update({
//       where: { id },
//       data: { name, calories, category },
//     });
//     res.json(updatedFood);
//   } catch (error) {
//     res.status(400).json({ error: "Update failed. Check if ID exists." });
//   }
// });

// app.delete("/foods/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.food.delete({ where: { id } });
//     res.status(204).send();
//   } catch (error) {
//     res.status(400).json({ error: "Delete failed. Check if ID exists." });
//   }
// });

app.get("/categories", async (req, res) => {
  try {
    const category = await prisma.foodCategory.findMany({
      include: { foods: true },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch foods" });
  }
});

app.listen(PORT, () => {
  console.log(`Food API running on http://localhost:${PORT}`);
});
app.post("/foods", async (req, res) => {
  try {
    const { foodname, price, image, ingredients, foodCategoryId } = req.body;

    const categoryExists = await prisma.foodCategory.findUnique({
      where: { id: Number(foodCategoryId) },
    });

    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    const newFood = await prisma.food.create({
      data: {
        foodname,
        price: parseFloat(price),
        image,
        ingredients,
        foodCategoryId: Number(foodCategoryId),
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(newFood);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create food item" });
  }
});

app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.foodCategory.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Failed to create category" });
  }
});
