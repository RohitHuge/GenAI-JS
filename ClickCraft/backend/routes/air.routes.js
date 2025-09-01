import express from "express";
import { initialPrompt } from "../controllers/ai.controller.js";
import { initialPromptMock } from "../controllers/dummy.js";
import { generateThumbnails } from "../controllers/generateThunmbnail.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

router.post('/initialprompt', upload.any(), initialPrompt);
router.post('/initialprompt-mock', upload.any(), initialPromptMock);
router.post('/generate-thumbnails', generateThumbnails);


export default router;