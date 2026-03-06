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
    image: "https://images.ctfassets.net/aq13lwl6616q/llkUpPk1NrKR5BMEcfyrc/42ebd1b27f3adb25c4a73fa6de52cd06/advanced_javascript_concepts_cover_photo_new.png",
  },
  {
    name: "Database Design and SQL",
    description:
      "Learn relational database modeling, normalization and SQL optimization.",
    level: "Intermediate",
    image: "https://digitwavemarketing.com/wp-content/uploads/2021/04/database_diagram-72psi-80-web60.jpg",
  },
  {
    name: "UI UX Design Fundamentals",
    description:
      "Learn wireframing, user research and modern interface design.",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },

  /* -------- Additional Courses -------- */

  {
    name: "React.js Mastery",
    description:
      "Hooks, state management, routing, API integration and performance optimization.",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  },
  {
    name: "Node.js Backend Development",
    description:
      "Build scalable backend APIs using Express and MongoDB.",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
  },
  {
    name: "Data Structures and Algorithms",
    description:
      "Learn arrays, linked lists, trees, graphs and problem solving techniques.",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    name: "Git and Version Control",
    description:
      "Master Git workflow, branching, merging and collaboration.",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498",
  },
  {
    name: "Cloud Computing Basics",
    description:
      "Introduction to AWS, deployment and cloud infrastructure.",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },

  {
    name: "TypeScript Fundamentals",
    description:
      "Strong typing, interfaces, generics and scalable JavaScript development.",
    level: "Intermediate",
    image: "https://m.media-amazon.com/images/I/610yfcywc3L._AC_UF1000,1000_QL80_.jpg",
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