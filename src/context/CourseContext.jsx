import React, { createContext, useState, useContext } from "react";
import { courses as sampleCourses, categories as sampleCategories } from "../utils/courseData";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses] = useState(sampleCourses);
  const [categories] = useState(sampleCategories || []);

  return (
    <CourseContext.Provider value={{ courses, categories }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
