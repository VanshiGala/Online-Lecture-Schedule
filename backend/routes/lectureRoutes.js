// routes/lectureRoutes.js

import express from "express";
import { scheduleLecture,getMyLectures } from "../controllers/lectureController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/schedule", protect,scheduleLecture);
router.get("/", protect, getMyLectures);

export default router;