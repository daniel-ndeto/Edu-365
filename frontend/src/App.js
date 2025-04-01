import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit button clicked");
    console.log("currentRole", currentRole);
    
    // Define registration data (example values)
    const name = "John Doe";
    const email = "john@example.com";
    const password = "password123";

    axios.defaults.withCredentials = true;
    axios.post("https://edu-365-back.vercel.app/api/auth/register", { name, email, password })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <Router>
      {currentRole === null &&
        <>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

            <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
            <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
            <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

            <Route path="/Adminregister" element={<AdminRegisterPage />} />

            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <form onSubmit={handleSubmit}>
              <button type="submit">Test Registration</button>
            </form>
          </div>
        </>
      }

      {currentRole === "Admin" && <AdminDashboard />}
      {currentRole === "Student" && <StudentDashboard />}
      {currentRole === "Teacher" && <TeacherDashboard />}
    </Router>
  );
}

export default App;
