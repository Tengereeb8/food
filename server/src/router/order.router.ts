import express from "express";
import { getOrder } from "../controllers/orders/getorder";
import { addOrder } from "../controllers/orders/addorder";
import { deleteOrder } from "../controllers/orders/delete-order";
import { updateOrder } from "../controllers/orders/update-order";
import { login } from "../controllers/users/adduser";

const router = express();

router.get("", getOrder);
router.post("", addOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);
export default router;
