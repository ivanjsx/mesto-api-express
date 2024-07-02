// libraries
import { Router } from  "express";

// controllers
import {
  retrieveUser,
  updateAvatar,
  updateInfo,
  listUsers,
  getMe
} from "../controllers/users";



const router = Router();

router.get("/me", getMe);
router.patch("/me", updateInfo);
router.patch("/me/avatar", updateAvatar);

router.get("/", listUsers);
router.get("/:userId", retrieveUser);

export default router;
