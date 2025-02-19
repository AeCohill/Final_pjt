import "../styles.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import Input  from "../ui/Input";
import Button  from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { RegistrationForm } from "../components/Register";  // Import RegistrationForm

function CourseApp() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({ title: "", number: "", professor: "", info: "" });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const addCourse = () => {
      if (!form.title || !form.number || !form.professor) return;
      setCourses([...courses, { ...form, id: Date.now() }]);
      setForm({ title: "", number: "", professor: "", info: "" });
    };
  
    return (
      <div className="app-container">
        {/* Navigation */}
        <div className="nav-bar">
          <div className="nav-links">
            <Link to="/" className="nav-button">Course List</Link>
            <Button className="nav-button">PlaceHolder</Button>
          </div>
          <div className="auth-buttons">
            <Button className="nav-button">Login / Logout</Button>
            <Link to="/register" className="nav-button">Register</Link>
          </div>
        </div>
  
        {/* Search Bar */}
        <Input className="search-input" placeholder="Search for Course" value={search} onChange={(e) => setSearch(e.target.value)} />
  
        {/* Add Course Form */}
        <Card className="course-form">
          <h2 className="form-title">Add a Course</h2>
          <div className="form-group">
            <Input name="title" placeholder="Course Title" value={form.title} onChange={handleChange} />
            <Input name="number" placeholder="Course Number" value={form.number} onChange={handleChange} />
            <Input name="professor" placeholder="Teacher/Prof" value={form.professor} onChange={handleChange} />
            <Input name="info" placeholder="Course Info" value={form.info} onChange={handleChange} />
          </div>
          <Button className="form-button" onClick={addCourse}>Add Course</Button>
        </Card>
  
        {/* Course List */}
        <div className="course-list">
          {courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map((course) => (
            <Card key={course.id} className="course-card">
              <CardContent>
                <h3 className="course-title">{course.title} ({course.number})</h3>
                <p className="course-professor">Instructor: {course.professor}</p>
                <p className="course-info">{course.info}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

export default CourseApp;