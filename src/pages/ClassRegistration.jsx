import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

function ClassRegistration() {
  const [courses, setCourses] = useState([]); // All courses from the API
  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]); // Courses the user has selected
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all courses from the API
  const fetchCourses = async () => {
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses.");
      }
      const coursesData = await response.json();
      setCourses(coursesData);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch the current user's selected courses
  const fetchUserCourses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/user/courses", {
        headers: { "X-Auth": token },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user courses.");
      }

      const data = await response.json();
      setSelectedCourses(data.courses); // Set selected courses in the state
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle course selection (add or remove)
  const handleCourseSelection = (course) => {
    if (selectedCourses.some((selectedCourse) => selectedCourse._id === course._id)) {
      setSelectedCourses(selectedCourses.filter((item) => item._id !== course._id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRegisterCourses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to register for courses.");
      return;
    }

    try {
      const coursesToRegister = selectedCourses.length > 0 
        ? selectedCourses.map((course) => course._id) // Send course IDs
        : []; // Empty array if no courses are selected

      const response = await fetch("https://equinox-backend.glitch.me/api/user/courses", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": token,
        },
        body: JSON.stringify({
          selectedCourses: coursesToRegister, // Send the updated course list (or empty array)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register for courses.");
      }

      setMessage(selectedCourses.length === 0 ? "Courses cleared successfully!" : "Courses registered successfully!");

      // Clear the selected courses array after registering or clearing
      setSelectedCourses([]);

      // After successful registration, fetch the updated courses for the user
      fetchUserCourses(); // Refresh the selected courses state

    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch all available courses
    fetchUserCourses(); // Fetch the current user's registered courses
  }, []);

  // Filter out selected courses from the courses list by comparing their IDs
  const availableCourses = courses.filter(
    (course) => !selectedCourses.some((selectedCourse) => selectedCourse._id === course._id)
  );

  return (
    <div className="container">
      <div className="row">
        {/* Courses List */}
        <div className="col-md-6">
          <h1>Courses List</h1>
          <Input
            className="search-input"
            placeholder="Search for Course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="row" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {availableCourses.length === 0 ? (
              <p>No courses available...</p>
            ) : (
              availableCourses
                .filter((course) =>
                  course.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((course) => (
                  <div className="row course-card align-items-center py-2 border-bottom" key={course._id}>
                    <div className="col">
                      <strong>{course.title}</strong> ({course.number})
                      <p className="course-professor">by {course.professor}</p>
                    </div>
                    <div className="col col-lg-3 text-end">
                      <Button className="btn btn-success btn-sm" onClick={() => handleCourseSelection(course)}>
                        Add Course
                      </Button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Selected Courses Section */}
        <div className="col-md-6">
          <h1>Courses Selected</h1>
          <h5>Selected Courses:</h5>
          <div className="selected-courses">
            {selectedCourses.length === 0 ? (
              <p>No courses selected.</p>
            ) : (
              selectedCourses.map((course) => (
                <div className="row course-card align-items-center py-2 border-bottom" key={course._id}>
                  <div className="col">
                    <strong>{course.title}</strong> ({course.number})
                    <p className="course-professor">by {course.professor}</p>
                  </div>
                  <div className="col col-lg-3 text-end">
                    <Button className="btn btn-danger btn-sm" onClick={() => handleCourseSelection(course)}>
                      Remove Course
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <Button onClick={handleRegisterCourses} className="btn btn-primary mt-3">
            {selectedCourses.length === 0 ? "Clear All Courses" : "Register Selected Courses"}
          </Button>

          {error && <p className="error text-danger mt-2">{error}</p>}
          {message && <p className="message text-success mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ClassRegistration;
