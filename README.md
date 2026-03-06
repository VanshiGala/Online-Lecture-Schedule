Online Lecture Scheduling System - Ideamagix Assessment

MERN Stack Internship Assessment | Ideamagix Internship Assessment

Live Demo:

Frontend:https://online-lecture-schedule.vercel.app/

Backend:https://online-lecture-schedule-ppbx.onrender.com

Test Credentials:

Admin Login:

Email: admin@gmail.com

Password: admin123
Instructor Login:

Email Format: name@ideamagix.in

Password Format: Name of instructor with first letter of instructor name in capital + @123
Features Implemented:

-Authentication Module:

Login page with responsive UI
Role-based authentication (Admin / Instructor)
MongoDB database authentication
JWT token-based session management
Logout functionality clears token storage
-JWT Authentication (Mandatory):

JSON Web Token generated after login
Token expiry configured (24 hours recommended)
Protected routes using auth middleware
Token stored in browser localStorage
-Admin Dashboard: Overview Statistics

Total Courses Count
Total Instructors Count
Total Scheduled Lectures Count
-Data Tables Included

Course List with Thumbnail Image
Instructor List
Lecture Scheduling Mapping
-Course Management

Add new courses
Course name
Course level (Beginner / Intermediate / Advanced)
Course description
Course cover image
-Lecture Scheduling Module

Admin can schedule lectures by assigning:

Course
Instructor
Batch name
Lecture date
-Conflict Prevention Rule

System prevents:

Same instructor being assigned multiple lectures on the same date.
Backend validation implemented.

-Instructor Panel

Instructor can:

View assigned lectures
Check schedule details
-Lecture information includes:

Course name
Course image
Batch information
Lecture date
Data Search & Display
Implemented structured data retrieval.

Supported Features:

MongoDB query filtering
Population of relational references
Optional chaining rendering safety
Technology Stack
Layer	Technology
Frontend	React.js (Vite), Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Authentication	JWT, bcryptjs
Media Storage	Cloudinary
HTTP Client	Axios
Notifications	React Hot Toast
Deployment	Vercel + Render
📂 Project Structure

online-lecture-scheduling/
│
├── backend/
│
│   ├── config/
│   │   └── dbConfig.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── lectureController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Course.js
│   │   ├── Lecture.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── lectureRoutes.js
│   │   └── userRoutes.js
│   │
│   └── app.js
│
├── frontend/
│
│   ├── src/
│   │
│   ├── api/
│   │   └── axios.jsx
│   │
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── InstructorPanel.jsx
│   │   ├── ScheduleLecture.jsx
│   │   ├── AddInstructor.jsx
│   │   └── Courses.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md

#Local Setup Instructions

Prerequisites:

Node.js v18+
MongoDB Atlas account
Cloudinary account
#Backend Setup

cd backend npm install

Create .env file:

MONGO_URI=your_mongodb_uri JWT_SECRET=your_secret_key PORT=8000 CLIENT_URL=http://localhost:5173

Start backend: npm run dev

Backend URL: http://localhost:8000

#Frontend Setup

cd frontend npm install

Create .env file:

BASE_URL=http://localhost:8000/api

Start frontend:

npm run dev

Frontend URL: http://localhost:5173

-Deployment

Service	Platform
Frontend	Vercel
Backend	Render
Database	MongoDB Atlas
Images	Disk
Important Notes

Backend may take 30–60 seconds to wake up (Render free tier cold start).
JWT authentication is used for security.
CORS policy configured for frontend domain.
The application is designed as a desktop dashboard system and is less optimized for mobile responsiveness.
-Submitted By

Vanshi Gala Ideamagix Internship Assessment Project