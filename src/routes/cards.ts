// libraries
import { Router } from  "express";

// request body validators
import createCardValidator from "../validators/request-body/create-card";

// request params validators
import cardIdValidator from "../validators/request-params/card-id";

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

router.delete("/:cardId", cardIdValidator, removeCard);

router.put("/:cardId/likes", cardIdValidator, likeCard);
router.delete("/:cardId/likes", cardIdValidator, dislikeCard);

export default router;
