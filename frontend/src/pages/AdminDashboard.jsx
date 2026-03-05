import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios.js";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [courseRes, instructorRes, scheduleRes] = await Promise.all([
        api.get("/courses"),
        api.get("/users/instructors"),
        api.get("/lectures"),
      ]);

      setCourses(courseRes.data);
      setInstructors(instructorRes.data);
      setSchedules(scheduleRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-8">Loading dashboard data...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-500">{error}</p>;
  }

return (
  <div className="min-h-screen bg-gray-100">
    <Navbar role="admin" />

    <div className="p-6 lg:p-10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        <button
          onClick={fetchData}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh Data
        </button>
      </div>

      {/* Statistics Overview Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Courses" value={courses.length} />
        <StatCard title="Total Instructors" value={instructors.length} />
        <StatCard title="Scheduled Lectures" value={schedules.length} />
      </div>

      {/* Tables Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Section title="Courses List">
          <Table
            headers={["Course Name", "Description"]}
            data={courses.map((c) => [c.name, c.description || "-"])}
          />
        </Section>

        <Section title="Instructor List">
          <Table
            headers={["Instructor Name", "Email"]}
            data={instructors.map((i) => [i.name, i.email])}
          />
        </Section>
      </div>

      {/* Schedule Mapping Full Width */}
      <Section title="Lecture Schedule">
        <Table
          headers={["Course", "Instructor", "Date", "Batch"]}
          data={schedules.map((s) => [
            s.course?.name || "-",
            s.instructor?.name || "-",
            formatDate(s.date),
            s.batchName || "-",
          ])}
        />
      </Section>
    </div>
  </div>
);

/* ---------- Components ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="text-gray-500 text-sm uppercase tracking-wide">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-semibold border-b pb-3 text-gray-700">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Table({ headers, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h, idx) => (
              <th
                key={idx}
                className="p-3 text-left text-sm font-semibold text-gray-600 border-b"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition border-b last:border-none"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 text-sm text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}}
export default AdminDashboard