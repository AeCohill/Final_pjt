import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useState, useEffect } from "react";
import Input from "../ui/Input";

function CourseList() {
  const [courses, setCourses] = useState([]); // Use 'courses' instead of 'songs'
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses(); // Fetch courses on component mount
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/courses");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const coursesData = await response.json();
      setCourses(coursesData); // Set the fetched courses
    } catch (error) {
      setError(error.message); // Set error message if any
    }
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* Search Bar and Course List Header */}
      <div className="mb-4">
        <h1>Courses List</h1>
        <Input
          className="search-input"
          placeholder="Search for Course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Error Message */}
      {error && <p>Error: {error}</p>} 

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
                
                {/* Display course info directly without expanding */}
                <div className="course-info">
                  <p>{course.info}</p>
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
          height: auto; /* Allow flexible height */
          width: 100%; /* Full width within column */
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

        /* Custom CSS for larger columns with min-width to prevent shrinking */
        @media (min-width: 768px) {
          .col {
            flex: 0 0 33%;  /* Set fixed width for medium and larger screens */
            max-width: 33%;  /* Ensure that cards don't shrink */
            min-width: 250px;  /* Prevent shrinking by setting a min-width */
          }
        }

        /* Smaller screens - ensure cards still look good */
        @media (max-width: 767px) {
          .col {
            flex: 0 0 100%; /* Take full width on smaller screens */
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default CourseList;