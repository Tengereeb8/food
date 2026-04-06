import express from "express";
import { addUser, login, profile } from "../controllers/users/adduser";
import { getUser } from "../controllers/users/getuser";
import { authenticateToken } from "../middleware/auth-middleware";
const router = express();

router.post("/", addUser);
// router.get("/", getUser);
router.post("/login", login);
router.get("/profile", authenticateToken, profile);

export default router;
