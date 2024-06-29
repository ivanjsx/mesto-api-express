// libraries
import { Router } from  "express";

// controllers
import { listUsers, retrieveUser, createUser } from "../controllers/users";



const router = Router();

router.get("/", listUsers);
router.get("/:userId", retrieveUser);

router.post("/", createUser);



export default router;
