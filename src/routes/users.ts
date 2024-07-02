// libraries
import { Router } from  "express";

// request body validators
import updateInfoValidator from "../validators/request-body/update-info";
import updateAvatarValidator from "../validators/request-body/update-avatar";

// request params validators
import userIdParamValidator from "../validators/request-params/user-id";

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
router.patch("/me", updateInfoValidator, updateInfo);
router.patch("/me/avatar", updateAvatarValidator, updateAvatar);

router.get("/", listUsers);

router.use(userIdParamValidator);

router.get("/:userId", retrieveUser);

export default router;
