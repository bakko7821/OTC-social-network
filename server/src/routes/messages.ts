import express from "express";
import { getMessages } from "../controllers/messagesController";

const router = express.Router();
router.get("/:roomId", getMessages);

export default router;
