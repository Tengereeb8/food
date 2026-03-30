import express from "express";
import { addOrder } from "../controllers/orders/addorder";
import { deleteOrder } from "../controllers/orders/delete-order";
import { updateOrder } from "../controllers/orders/update-order";
import { login } from "../controllers/users/adduser";
import { getOrders, updateOrderStatus } from "../controllers/orders/controller";

const router = express();

router.get("/", getOrders);
router.patch("/:id", updateOrderStatus);

router.post("", addOrder);
router.delete("/:id", deleteOrder);
export default router;
