import express from "express";
import { addUser, login } from "../controllers/users/adduser";
import { getUser } from "../controllers/users/getuser";

const router = express();

router.post("/", addUser);
router.get("/", getUser);
router.post("/login", login);

export default router;
