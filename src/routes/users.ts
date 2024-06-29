// libraries
import { Router } from  "express";

// controllers
import { listUsers, retrieveUser, createUser, updateUserInfo, updateUserAvatar } from "../controllers/users";



const router = Router();

router.get("/", listUsers);
router.get("/:userId", retrieveUser);
router.post("/", createUser);

router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

export default router;
