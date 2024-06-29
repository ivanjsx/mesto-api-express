// libraries
import { Router } from  "express";

// controllers
import { listCards, createCard, removeCard } from "../controllers/cards";



const router = Router();

router.get("/", listCards);
router.post("/", createCard);
router.delete("/:cardId", removeCard);

export default router;
