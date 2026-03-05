import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function AddInstructor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await api.post("/users/instructors", {
        name,
        email,
        password,
      });
navigate("/admin", { state: { refresh: true } });
      toast.success("Instructor added");

      setName("");
      setEmail("");
      setPassword("");
    } catch {
      toast.error("Error adding instructor");
    }
  };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar role="admin" />

//       <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-bold mb-6">Add Instructor</h2>

//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-4 rounded"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={submit}
//           className="w-full bg-blue-500 text-white py-2 rounded"
//         >
//           Add Instructor
//         </button>
//       </div>
//     </div>
//   );
// }

return (
  <div className="min-h-screen bg-gray-100">
    <Navbar role="admin" />

   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
  <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-8">
    
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">Add Instructor</h2>
      <p className="text-sm text-gray-500">
        Create a new instructor account
      </p>
    </div>

    <div className="space-y-4">
      <input
        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button
      onClick={submit}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg"
    >
      Add Instructor
    </button>

  </div>
</div>
</div>
)}
export default AddInstructor;

