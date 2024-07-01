// libraries
import { Router } from  "express";

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
router.post("/", createCard);
router.delete("/:cardId", removeCard);

router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

export default router;
