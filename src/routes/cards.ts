// libraries
import { Router } from  "express";

// controllers
import { listCards, createCard, removeCard, likeCard, dislikeCard } from "../controllers/cards";



const router = Router();

router.get("/", listCards);
router.post("/", createCard);
router.delete("/:cardId", removeCard);

router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

export default router;
