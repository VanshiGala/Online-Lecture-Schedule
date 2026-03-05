import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

import User from "./models/User.js"

dotenv.config()

const seedAdmin = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB Connected")

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" })

    if (existingAdmin) {
      console.log("Admin already exists")
      process.exit()
    }

    const hashedPassword = await bcrypt.hash("admin123", 10)

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    })

    console.log("Admin created successfully")
    console.log(admin)

    process.exit()

  } catch (error) {

    console.log(error)
    process.exit(1)

  }

}

seedAdmin()