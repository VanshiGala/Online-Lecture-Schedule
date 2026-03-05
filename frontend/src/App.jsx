import {  Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import InstructorPanel from "./pages/InstructorPanel.jsx";
import AddInstructor from "./pages/AddInstructor";
import AddCourse from "./pages/Courses.jsx";
import ScheduleLecture from "./pages/ScheduleLecture.jsx";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add-instructor" element={<AddInstructor />} />
      <Route path="/admin/courses" element={<AddCourse />} />
      <Route path="/admin/schedule" element={<ScheduleLecture />} />

      {/* Instructor */}
      <Route path="/instructor" element={<InstructorPanel />} />
    </Routes>
  );
}

export default App;
