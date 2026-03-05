import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Calendar, LogOut } from "lucide-react";

function Navbar({ role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Lecture Scheduler</h1>

      <div className="flex gap-6 items-center text-gray-700">
        {role === "admin" && (
          <>
            <Link
              to="/admin"
              className="flex gap-2 items-center hover:text-blue-600"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link
              to="/admin/courses"
              className="flex gap-2 items-center hover:text-blue-600"
            >
              <BookOpen size={18} /> Courses
            </Link>

            <Link
              to="/admin/add-instructor"
              className="flex gap-2 items-center hover:text-blue-600"
            >
              Add Instructor
            </Link>
            
            <Link
              to="/admin/schedule"
              className="flex gap-2 items-center hover:text-blue-600"
            >
              <Calendar size={18} /> Schedule
            </Link>
          </>
        )}

        {role === "instructor" && (
          <Link
            to="/instructor"
            className="flex gap-2 items-center hover:text-blue-600"
          >
            <LayoutDashboard size={18} /> My Lectures
          </Link>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
