import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "./models/Course.js";

dotenv.config();

/* Sample Course Dataset */

const courses = [
  {
    name: "Full Stack Web Development",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and build production ready web applications.",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    name: "Introduction to Programming",
    description: "Basic programming concepts using Python.",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    name: "Advanced JavaScript",
    description:
      "Closures, async programming, event loop and modern JS features.",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c4a67",
  },
  {
    name: "Database Design and SQL",
    description:
      "Learn relational database modeling, normalization and SQL optimization.",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
  },
  {
    name: "UI UX Design Fundamentals",
    description:
      "Learn wireframing, user research and modern interface design.",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
];

/* MongoDB Seeder Function */

const seedCourse = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Clear old data (optional)
    await Course.deleteMany();

    // Insert sample courses
    await Course.insertMany(courses);

    console.log("Course Seed Successful");

    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedCourse();