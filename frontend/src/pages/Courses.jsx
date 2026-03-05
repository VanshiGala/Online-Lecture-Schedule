// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";

// function Courses() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     const res = await axios.get("/courses");
//     setCourses(res.data);
//   };

//   return (
//     <div>
//       <Navbar role="admin" />

//       <div className="p-8">
//         <h2 className="text-2xl font-bold mb-6">Courses</h2>

//         <div className="grid grid-cols-3 gap-6">
//           {courses.map((c) => (
//             <div key={c._id} className="bg-white p-4 rounded shadow">
//               <h3 className="font-semibold text-lg">{c.name}</h3>

//               <p className="text-gray-500">Level: {c.level}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Courses;

import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function AddCourse() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const submit = async () => {
    if (!name || !level) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      await api.post("/courses", {
        name,
        level,
        description,
        image,
      });

      toast.success("Course added successfully");

      setName("");
      setLevel("");
      setDescription("");
      setImage("");

      fetchCourses(); // refresh list
    } catch {
      toast.error("Error adding course");
    }
  };

  //return (
   return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    <Navbar role="admin" />

    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
  

      {/* Add Course Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add New Course
        </h2>

        <div className="space-y-4">
          <input
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
            placeholder="Level (Beginner / Intermediate / Advanced)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />

          <textarea
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition h-32 resize-none"
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg"
        >
          Add Course
        </button>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          Courses
        </h3>

        {courses.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No courses added yet
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition bg-white"
              >
                {course.image && (
                  <img
                    src={course.image}
                    alt="course"
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-4 space-y-2">
                  <p className="font-semibold text-lg text-gray-800 truncate">
                    {course.name}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>
                  <span className="inline-block text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);}
export default AddCourse;