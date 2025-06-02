import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import CourseRegistration from './pages/CourseRegistration';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';
import Chatbot from './pages/Chatbot';
import Counseling from './pages/Counseling';
import FacultyGradeEntry from './pages/FacultyGradeEntry';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="course-registration" element={<CourseRegistration />} />
          <Route path="grades" element={<Grades />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="counseling" element={<Counseling />} />
          <Route path="faculty/grades" element={<FacultyGradeEntry />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;