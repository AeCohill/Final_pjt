import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import "./App.css";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import CourseApp from "./pages/CourseApp";
import CourseList from './pages/CourseList';
import CourseEdit from './pages/CourseEdit';
import API from './pages/API';
import Login from './pages/Login';
import { RegistrationForm } from "./pages/Register";
import NavBar from "./components/NavBar";
import Home from './pages/Home';
import { Outlet } from 'react-router-dom';

export default function App() {

  // PrivateRoutes Component to handle both token and role-based access
  const PrivateRoutes = ({ requiredRole }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/" />;  // Redirect to home if the user doesn't have the required role
    }

    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<Home />} />

          {/* Protected Routes wrapped in PrivateRoutes */}
          <Route element={<PrivateRoutes requiredRole="Teacher" />}>
            {/* Routes that only a Teacher can access */}
            <Route path="/api" element={<API />} />
            <Route path="/courseedit/:courseId" element={<CourseEdit />} />
            <Route path="/course" element={<CourseApp />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            {/* Routes that both Teacher and Student can access */}
            <Route path="/home" element={<Home />} />
            <Route path="/courselist" element={<CourseList />} />
            
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Default Route (catch-all) */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
