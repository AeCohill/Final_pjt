import "../styles.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams to get courseId, useNavigate for redirecting
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Card } from "../ui/Card";

function CourseEdit() {
  const { courseId } = useParams(); // Get the courseId from the URL params
  const [form, setForm] = useState({ title: "", number: "", professor: "", info: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to redirect after successful update

  useEffect(() => {
    fetchCourse();
  }, [courseId]); // Re-fetch when courseId changes

  const fetchCourse = async () => {
    try {
      const response = await fetch(`https://equinox-backend.glitch.me/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch course with ID: ${courseId}`);
      }
      const courseData = await response.json();
      setForm(courseData); // Pre-fill the form with fetched course data
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const updateCourse = async () => {
    if (!form.title || !form.number || !form.professor) return;

    setLoading(true);

    try {
      const response = await fetch(`https://equinox-backend.glitch.me/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        navigate("/courselist"); // Redirect to course list after successful update
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update course.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2 className="form-title">Edit Course</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Card className="course-form">
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
        <Button className="form-button" onClick={updateCourse} disabled={loading}>
          {loading ? "Updating Course..." : "Update Course"}
        </Button>
      </Card>
    </div>
  );
}

export default CourseEdit;
