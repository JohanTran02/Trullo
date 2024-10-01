import express from "express"
import { registerUser, loginUser, forgotPassword, resetPassword } from "./controller.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgotPassword/:email", forgotPassword)
router.put("/resetPassword", resetPassword)

export default router;