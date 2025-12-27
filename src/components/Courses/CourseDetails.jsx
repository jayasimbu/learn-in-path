import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";

export default function CourseDetails() {
  const { id } = useParams();
  const { courses } = useContext(CourseContext);
  const course = courses.find((c) => String(c.id) === String(id));

  if (!course) return <p>Course not found</p>;

  return (
    <div className="course-details">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
    </div>
  );
}
