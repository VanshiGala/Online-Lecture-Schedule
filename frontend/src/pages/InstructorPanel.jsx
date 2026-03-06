import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function InstructorPanel() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await api.get("/lectures");
      setLectures(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="instructor" />

      <div className="max-w-6xl mx-auto p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Lectures</h1>
          <p className="text-gray-500 mt-1">Your scheduled teaching sessions</p>
        </div>

        {/* Lecture List */}
        <div className="space-y-4">
          {lectures.map((l) => (
            <div
              key={l._id}
              className="flex items-center gap-6 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              {/* Thumbnail */}
              <img
                src={l.course?.image || "https://via.placeholder.com/120"}
                alt={l.course?.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/120";
                }}
              />

              {/* Lecture Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-black truncate">
                  {l.course?.name || "Course"}
                </h3>

                <p className="text-sm text-black">
                  Date: {new Date(l.date).toDateString()}
                </p>

                <span className="inline-block mt-2 text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  Batch: {l.batchName || "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InstructorPanel;
