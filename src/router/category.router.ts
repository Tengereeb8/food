import express from "express";
import { getCategory } from "../controllers/categories/getCategory";
import { addCategory } from "../controllers/categories/addCategory";

const router = express();

router.post("/", addCategory);
router.get("/", getCategory);

export default router;
