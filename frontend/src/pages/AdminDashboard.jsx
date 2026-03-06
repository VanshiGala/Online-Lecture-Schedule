import { useEffect, useState } from "react";
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
        api.get("/lectures/all"),
      ]);

      setCourses(courseRes.data || []);
      setInstructors(instructorRes.data || []);
      setSchedules(scheduleRes.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <button
            onClick={fetchData}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="admin" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-gray-600">
              Overview of courses, instructors & schedule
            </p>
          </div>

          <button
            onClick={fetchData}
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition shadow-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <StatCard
            title="Total Courses"
            value={courses.length}
            icon="📚"
            color="blue"
          />
          <StatCard
            title="Instructors"
            value={instructors.length}
            icon="👨‍🏫"
            color="indigo"
          />
          <StatCard
            title="Scheduled Sessions"
            value={schedules.length}
            icon="🗓️"
            color="green"
          />
        </div>

        {/* Two-column layout for smaller tables */}
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-8 mb-8">
          <DataSection title="Courses">
            <DataTable
              headers={["Course", "Description"]}
              rows={courses.map((course) => [
                <div className="flex items-center gap-3">
                  <img
                    src={
                      course.image ||
                      "https://via.placeholder.com/48?text=" + course.name?.[0]
                    }
                    alt={course.name}
                    className="w-10 h-10 rounded-md object-cover bg-gray-100"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/48?text=??")
                    }
                  />
                  <span className="font-medium text-gray-900">
                    {course.name || "Unnamed"}
                  </span>
                </div>,
                <p className="text-gray-600 line-clamp-2 text-sm">
                  {course.description || "No description"}
                </p>,
              ])}
            />
          </DataSection>

          <DataSection title="Instructors">
            <DataTable
              headers={["Name", "Email"]}
              rows={instructors.map((i) => [
                <span className="font-medium text-gray-900">
                  {i.name || "—"}
                </span>,
                <span className="text-gray-600">{i.email || "—"}</span>,
              ])}
            />
          </DataSection>
        </div>

        {/* Full-width Schedule */}
        <DataSection title="Lecture Schedule">
          <DataTable
            headers={["Course", "Instructor", "Date", "Batch"]}
            rows={schedules.map((s) => [
              <span className="font-medium">{s.course?.name || "—"}</span>,
              s.instructor?.name || "—",
              formatDate(s.date),
              s.batchName || "—",
            ])}
          />
        </DataSection>
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/*                   Sub-components                 */
/* ──────────────────────────────────────────────── */

function StatCard({ title, value, icon, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    green: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <div
      className={`bg-white border ${colors[color] || colors.blue} rounded-xl p-6 shadow-sm hover:shadow transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            {title}
          </p>
          <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

function DataSection({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/70">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function DataTable({ headers, rows }) {
  if (!rows?.length) {
    return (
      <div className="text-center py-12 text-gray-500">No records found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50/70 transition-colors">
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-5 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;