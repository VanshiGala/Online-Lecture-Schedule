import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET all instructors
export const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" });

    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE instructor
export const createInstructor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if instructor already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Instructor already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const instructor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "instructor",
    });

    res.status(201).json(instructor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};