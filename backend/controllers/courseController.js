import Course from "../models/Course.js";

export const addCourse = async (req, res) => {
//   try {
//     const course = await Course.create(req.body);
//     res.json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
try {

    const { name, level, description, image } = req.body;

    const course = await Course.create({
      name,
      level,
      description,
      image
    });

    res.json(course);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};