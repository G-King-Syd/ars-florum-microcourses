import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CourseDetailPage.css";

function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setError("Failed to load course details.");
      });
  }, [id]);

  const handleEnrol = async () => {
    try {
      const response = await fetch(`http://localhost:5000/courses/${id}/enrol`, {
        method: "PUT"
      });

      const updatedCourse = await response.json();
      setCourse(updatedCourse);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setError("Failed to enrol in course.");
    }
  };

  if (error) {
    return <p className="detail-error">{error}</p>;
  }

  if (!course) {
    return <p className="detail-loading">Loading course details...</p>;
  }

  return (
    <div className="detail-page">
      <section className="detail-hero">
        <img
          src={course.image}
          alt={course.title}
          className="detail-hero-image"
        />
        <div className="detail-hero-overlay">
          <h1 className="detail-title">{course.title}</h1>
        </div>
      </section>

      <div className="detail-container">
        <Link to="/" className="back-link">
          ← Back to Courses
        </Link>

        <section className="detail-info-card">
          <div className="detail-meta">
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <p>
              <strong>Category:</strong> {course.category}
            </p>
            <p>
              <strong>Enrolments:</strong> {course.enrolments}
            </p>
          </div>

          <div className="detail-description">
            <h2>About this course</h2>
            <p>{course.description}</p>
          </div>
        </section>

        <section className="modules-section">
          <h2>Modules</h2>
          <ul className="modules-list">
            {course.modules.map((module, index) => (
              <li key={index}>{module}</li>
            ))}
          </ul>
        </section>

        <div className="enrol-section">
          <button className="enrol-button" onClick={handleEnrol}>
            Enrol Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
