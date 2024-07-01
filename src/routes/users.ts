// libraries
import { Router } from  "express";

// controllers
import { listUsers, retrieveUser, getMe, updateUserInfo, updateUserAvatar } from "../controllers/users";



const router = Router();

router.get("/", listUsers);
router.get("/:userId", retrieveUser);

router.get("/me", getMe);
router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

export default router;
