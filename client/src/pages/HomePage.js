import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses.");
      });
  }, []);

  return (
    <div className="homepage">
      
<section
  className="hero"
  style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
>
  <div className="hero-overlay">
    <h1 className="hero-title">Ars Florum</h1>
  </div>
</section>


      <section className="intro-section">
        <div className="intro-left">
          <h2>Courses</h2>
        </div>
        <div className="intro-right">
          <p>Learn how to make the world more beautiful</p>
        </div>
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="courses-section">
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>

                <p className="course-description">
                  {course.description.substring(0, 110)}...
                </p>

                <p className="course-duration">
                  <strong>Duration:</strong> {course.duration}
                </p>

                <Link to={`/courses/${course._id}`} className="details-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

