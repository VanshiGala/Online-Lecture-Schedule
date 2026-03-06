import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function ScheduleLecture() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [date, setDate] = useState("");
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const c = await api.get("/courses");
    const i = await api.get("/users/instructors");

    setCourses(c.data);
    setInstructors(i.data);
  };

  const schedule = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await api.post("/lectures/schedule", { courseId, instructorId, date,batch });
      toast.success("Lecture Scheduled");
    } catch(err) {
      console.log(err.response.data)
      toast.error(err.response?.data?.message || "Instructor unavailable");
    }
    setLoading(false);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    <Navbar role="admin" />

    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">
            Schedule Lecture
          </h2>
          <p className="text-gray-500">Assign instructor, course and batch</p>
        </div>

        <div className="space-y-5">
          <select
            value={courseId}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select Course</option>

            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={instructorId}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
            onChange={(e) => setInstructorId(e.target.value)}
          >
            <option value="">Select Instructor</option>

            {instructors.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Batch Name"
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
            onChange={(e) => setBatch(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          onClick={schedule}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loading ? "Scheduling..." : "Schedule Lecture"}
        </button>
      </div>
    </div>
  </div>
);
}
export default ScheduleLecture;
