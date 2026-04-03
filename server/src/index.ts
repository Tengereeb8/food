import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import userRouter from "./router/user.router";
import foodsRouter from "./router/foods.router";
import categoryRouter from "./router/category.router";
import orderRouter from "./router/order.router";

dotenv.config();

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(express.json());

app.use("/users", userRouter);
app.use("/foods", foodsRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

export default app;
