import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navigate, Routes, Route, HashRouter } from 'react-router-dom'; // Use HashRouter instead of BrowserRouter
import { useState, useEffect } from 'react';
import CourseApp from './pages/CourseApp';
import CourseList from './pages/CourseList';
import CourseEdit from './pages/CourseEdit';
import API from './pages/API';
import Login from './pages/Login';
import { RegistrationForm } from './pages/Register';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Outlet } from 'react-router-dom';
import ClassRegistration from './pages/ClassRegistration';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);  // If token exists, user is logged in
  }, []);

  const PrivateRoutes = ({ requiredRole }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && role.toLowerCase() !== requiredRole.toLowerCase()) {
      return <Navigate to="/home" />;  // Redirect to home if role doesn't match
    }

    return <Outlet />;
  };

  return (
    <HashRouter>  {/* Switch BrowserRouter to HashRouter */}
      <NavBar isLoggedIn={isLoggedIn} /> {/* Pass isLoggedIn as a prop */}
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          
          {/* Protected Routes for Teacher */}
          <Route element={<PrivateRoutes requiredRole="Teacher" />}>
            <Route path="/api" element={<API />} />
            <Route path="/courseedit/:courseId" element={<CourseEdit />} />
            <Route path="/course" element={<CourseApp />} />
          </Route>

          {/* Protected Routes for both Teacher and Student */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/courselist" element={<CourseList />} />
          </Route>

          {/* Protected Route for Student Only */}
          <Route element={<PrivateRoutes requiredRole="Student" />}>
            <Route path="/registration" element={<ClassRegistration />} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Default Route (catch-all) */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
