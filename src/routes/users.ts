// libraries
import { Router } from  "express";

// controllers
import {
  updateUserAvatar,
  updateUserInfo,
  retrieveUser,
  listUsers,
  getMe
} from "../controllers/users";



const router = Router();

router.get("/me", getMe);
router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

router.get("/", listUsers);
router.get("/:userId", retrieveUser);

export default router;
