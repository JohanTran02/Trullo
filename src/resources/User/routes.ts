import express from "express"
import { getUser, getUsers, updateUser, deleteUser } from "./controller.ts";
import { auth } from "../Auth/middleware.ts";
import authRoutes from "../Auth/routes.ts"

const router = express.Router();

router.use(authRoutes);
router.use(auth)

router.get("", getUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);

router.delete("", deleteUser);

export default router;