// libraries
import { Router } from  "express";

// controllers
import { listUsers, retrieveUser, updateUserInfo, updateUserAvatar } from "../controllers/users";



const router = Router();

router.get("/", listUsers);
router.get("/:userId", retrieveUser);

router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

export default router;
