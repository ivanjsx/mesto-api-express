// libraries
import { Router } from  "express";

// request body validators
import createCardValidator from "../validators/request-body/create-card";

// request params validators
import cardIdParamValidator from "../validators/request-params/card-id";

// controllers
import {
  dislikeCard,
  createCard,
  removeCard,
  listCards,
  likeCard
} from "../controllers/cards";



const router = Router();

router.get("/", listCards);
router.post("/", createCardValidator, createCard);

router.use(cardIdParamValidator);

router.delete("/:cardId", removeCard);

router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

export default router;
