import express from "express";
import { initialPrompt } from "../controllers/ai.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

router.post('/initialprompt', upload.any(), initialPrompt);


export default router;