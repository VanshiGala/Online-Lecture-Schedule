import express from "express";
import { scheduleLecture,getMyLectures,getAllLectures } from "../controllers/lectureController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/schedule", protect,scheduleLecture);
router.get("/", protect, getMyLectures);
router.get("/all", protect, getAllLectures);

export default router;