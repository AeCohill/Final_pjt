import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Input from "../ui/Input";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
    fetchUserCourses();  // Fetch user's enrolled courses
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/courses");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const coursesData = await response.json();
      setCourses(coursesData);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUserCourses = async () => {
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/user/courses", {
        headers: { "x-auth": token },
      });
      if (!response.ok) throw new Error("Failed to fetch user courses");
      const data = await response.json();
      setEnrolledCourses(data.courses.map(course => course._id));
    } catch (error) {
      setError(error.message);
    }
  };

  const enrollInCourse = async (courseId) => {
    const updatedCourses = [...enrolledCourses, courseId];  // Add the new course

    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/user/courses", {
        method: "PUT",
        headers: {
          "x-auth": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedCourses: updatedCourses }),
      });
      if (!response.ok) throw new Error("Failed to enroll");
      alert("Successfully enrolled in the course");
      setEnrolledCourses(updatedCourses);  // Update local state
    } catch (error) {
      alert(error.message);
    }
  };

  const dropCourse = async (courseId) => {
    const updatedCourses = enrolledCourses.filter(id => id !== courseId);  // Remove the course

    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/user/courses", {
        method: "PUT",
        headers: {
          "x-auth": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedCourses: updatedCourses }),
      });
      if (!response.ok) throw new Error("Failed to drop course");
      alert("Successfully dropped the course");
      setEnrolledCourses(updatedCourses);  // Update local state
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h1>Courses List</h1>
        <Input
          className="search-input"
          placeholder="Search for Course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredCourses.length === 0 ? (
          <p>No courses found...</p>
        ) : (
          filteredCourses.map((course) => (
            <div className="col" key={course._id}>
              <div className="course-card">
                <div className="course-card-header">
                  <strong>{course.title}</strong> ({course.number})
                  <p className="course-professor">by {course.professor}</p>
                </div>
                <div className="course-info">
                  <p>{course.info}</p>
                </div>
                <div className="course-actions">
                  {enrolledCourses.includes(course._id) ? (
                    <button className="btn btn-danger" onClick={() => dropCourse(course._id)}>
                      Drop
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => enrollInCourse(course._id)}>
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .course-card {
          border: 1px solid #ddd;
          padding: 1rem;
          background-color: white;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .course-card-header {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .course-professor {
          font-size: 0.9rem;
          color: gray;
        }
        .course-info {
          margin-top: 10px;
        }
        .course-actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}

export default CourseList;
