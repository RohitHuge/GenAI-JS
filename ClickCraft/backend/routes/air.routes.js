import express from "express";
import { initialPrompt } from "../controllers/ai.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer();

router.post('/initialprompt', upload.any(), initialPrompt);


export default router;