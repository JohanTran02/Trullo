import express from "express"
import { getUser, getUsers, updateUser, deleteUser, currentUser } from "./controller.ts";
import { auth, authCheck } from "../Auth/middleware.ts";

const router = express.Router();

router.use(auth)

router.get("/currentUser", currentUser)
router.get("", authCheck("read"), getUsers);
router.get("/:email", authCheck("read"), getUser);
router.delete("", authCheck("delete"), deleteUser);
router.put("/:email", authCheck("update"), updateUser);

export default router;