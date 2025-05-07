import express from 'express';
const router = express.Router();

import { getMessages, createMessage, deleteMessages } from "../controller/messagesController.js";

router.get("/", getMessages);
router.post("/", createMessage);
router.delete("/", deleteMessages);



export default router;