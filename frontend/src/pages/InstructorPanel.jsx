import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function InstructorPanel() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    const res = await api.get("/lectures/my");
    setLectures(res.data);
  };

  return (
    <div>
      <Navbar role="instructor" />

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">My Lectures</h2>

        <div className="grid grid-cols-2 gap-6">
          {lectures.map((l) => (
            <div key={l._id} className="bg-white p-5 rounded shadow">
              <h3 className="font-semibold">{l.course.name}</h3>

              <p className="text-gray-500">{new Date(l.date).toDateString()}</p>
              <p>Batch: {l.batch}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InstructorPanel;
