import "../styles.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Card, CardContent } from "../ui/Card";

function CourseApp() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", number: "", professor: "", info: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/courses");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const coursesData = await response.json();
      setCourses(coursesData);
    } catch (error) {
      setError(error.message); 
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const addCourse = async () => {
    if (!form.title || !form.number || !form.professor) return; // Basic validation

    setLoading(true); 

    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchCourses();
        setForm({ title: "", number: "", professor: "", info: "" });
        setError(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add course.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  
  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`https://equinox-backend.glitch.me/api/courses/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCourses();
      } else {
        throw new Error("Failed to delete course.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app-container">
      
      <Input
        className="search-input"
        placeholder="Search for Course"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      
      <Card className="course-form">
        <h2 className="form-title">Add a Course</h2>
        <div className="form-group">
          <Input
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            name="number"
            placeholder="Course Number"
            value={form.number}
            onChange={handleChange}
          />
          <Input
            name="professor"
            placeholder="Teacher/Prof"
            value={form.professor}
            onChange={handleChange}
          />
          <Input
            name="info"
            placeholder="Course Info"
            value={form.info}
            onChange={handleChange}
          />
        </div>
        <Button className="form-button" onClick={addCourse} disabled={loading}>
          {loading ? "Adding Course..." : "Add Course"}
        </Button>
      </Card>

      
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      
      <div className="course-list">
        {courses.length === 0 ? (
          <p>No courses available. Please add some courses.</p>
        ) : (
          courses
            .filter((course) => course.title.toLowerCase().includes(search.toLowerCase()))
            .map((course) => (
              <Card key={course._id} className="course-card">
                <CardContent>
                  <h3 className="course-title">
                    {course.title} ({course.number})
                  </h3>
                  <p className="course-professor">Instructor: {course.professor}</p>
                  <p className="course-info">{course.info}</p>
                  <Link to={`/courseedit/${course._id}`} className="nav-button">Edit</Link>
                  <button
                    className="nav-button bg-red-500 text-white"
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </button>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}

export default CourseApp;