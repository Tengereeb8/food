import express from "express";
import { getFood } from "../controllers/foods/getFoodbyId";
import { addFood } from "../controllers/foods/addFood";
import { deleteFood } from "../controllers/foods/deleteFood";
import { updateFood } from "../controllers/foods/updateFood";

const router = express();

router.get("", getFood);
router.post("", addFood);
router.delete("/:id", deleteFood);
router.put("/:id", updateFood);

export default router;
