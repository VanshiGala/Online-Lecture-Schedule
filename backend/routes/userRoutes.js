import express from "express";
import { getInstructors, createInstructor } from "../controllers/userController.js";

const router = express.Router();

router.get("/instructors", getInstructors);
router.post("/instructors", createInstructor);

export default router;