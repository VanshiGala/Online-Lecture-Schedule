import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/dbConfig.js"

import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import lectureRoutes from "./routes/lectureRoutes.js"
import userRoutes from "./routes/userRoutes.js";

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/lectures", lectureRoutes)
app.use("/api/users", userRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000")
})