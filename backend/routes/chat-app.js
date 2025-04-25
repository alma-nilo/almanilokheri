import {Router } from "express";
import { askMistral } from "../controllers/chat-app.js";

const router  = Router();


router.post("/", askMistral);

export default router;