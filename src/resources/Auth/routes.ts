import express from "express"
import { registerUser, loginUser } from "../User/controller.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;