import React, { useContext } from "react";
import CourseCard from "./CourseCard";
import { CourseContext } from "../../context/CourseContext";

export default function CourseList() {
  const { courses } = useContext(CourseContext);

  return (
    <section className="course-list">
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </section>
  );
}
