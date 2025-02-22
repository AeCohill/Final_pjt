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
  const [loading, setLoading] = useState(false);  // Added loading state for form submission

  // Fetch the courses from the backend
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch courses from the backend
  const fetchCourses = async () => {
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/courses"); // Use your correct backend URL
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const coursesData = await response.json();
      setCourses(coursesData);
    } catch (error) {
      setError(error.message); // Set the error if the fetch fails
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add a new course by making a POST request to the backend
  const addCourse = async () => {
    if (!form.title || !form.number || !form.professor) return; // Basic validation

    setLoading(true); // Start loading state

    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        // Fetch the updated list of courses after adding
        fetchCourses();
        // Clear the form after adding
        setForm({ title: "", number: "", professor: "", info: "" });
        setError(null); // Clear error on successful submission
      } else {
        const errorData = await response.json();  // Get detailed error message from the server
        throw new Error(errorData.message || "Failed to add course.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <div className="nav-bar">
        <div className="nav-links">
          <Link to="/courselist" className="nav-button">
            Course List
          </Link>
          <Button className="nav-button">PlaceHolder</Button>
        </div>
        <div className="auth-buttons">
          <Button className="nav-button">Login / Logout</Button>
          <Link to="/register" className="nav-button">
            Register
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <Input
        className="search-input"
        placeholder="Search for Course"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Course Form */}
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

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Course List */}
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
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}

export default CourseApp;