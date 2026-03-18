import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRouter from "./router/user.router";
import foodsRouter from "./router/foods.router";
import categoryRouter from "./router/category.router";
import orderRouter from "./router/order.router";
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/foods", foodsRouter);
app.use("/categories", categoryRouter);
app.use("/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
