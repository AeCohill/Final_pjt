import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import "./App.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CourseApp from "./pages/CourseApp"
import API from '/src/pages/API';
import Home from '/src/pages/Home';
import Login from '/src/pages/Login';
import NotFound from '/src/pages/NotFound.jsx';
import { RegistrationForm } from "./components/Register";  // Import RegistrationForm
import NavBar from "./components/NavBar"



export default function App() {
  return (     
    <BrowserRouter>
      <NavBar />
      <div className="container mt-5 pt-5">
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<Login />} />
        <Route path="/course" element={<CourseApp />} />
        <Route path="/api" element={<API />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
