import React, { useState, useEffect } from 'react';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/Courses/CourseCard';
import SearchBar from '../components/Common/SearchBar';
import '../styles/Courses.css';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

const CoursesPage = () => {
  const { courses, categories } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    let result = courses;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term)
      );
    }

    // Filter by category (sidebar)
    if (selectedCategory !== 'All') {
      result = result.filter(course => course.category === selectedCategory);
    }

    // Apply filters from search bar (categories, levels, durations)
    if (appliedFilters && appliedFilters.length > 0) {
      // categories
      const cats = appliedFilters.filter(f => !['Beginner','Intermediate','Advanced','Under 4 weeks','4-8 weeks','8+ weeks'].includes(f) && f !== 'All Categories');
      if (cats.length > 0) {
        result = result.filter(course => cats.includes(course.category));
      }
      // levels
      const levels = appliedFilters.filter(f => ['Beginner','Intermediate','Advanced'].includes(f));
      if (levels.length > 0) {
        result = result.filter(course => levels.includes(course.level));
      }
      // durations
      const durations = appliedFilters.filter(f => ['Under 4 weeks','4-8 weeks','8+ weeks'].includes(f));
      if (durations.length > 0) {
        result = result.filter(course => {
          // try parse weeks from course.duration (e.g. '12 weeks')
          const match = String(course.duration || '').match(/(\d+)/);
          const weeks = match ? parseInt(match[1], 10) : 0;
          // check any duration bucket matches
          return durations.some(d => {
            if (d === 'Under 4 weeks') return weeks > 0 && weeks < 4;
            if (d === '4-8 weeks') return weeks >=4 && weeks <=8;
            if (d === '8+ weeks') return weeks > 8;
            return false;
          });
        });
      }
    }

    // Sort courses
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.enrolled - a.enrolled);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'duration':
        result.sort((a, b) => {
          const aDuration = parseInt(a.duration);
          const bDuration = parseInt(b.duration);
          return aDuration - bDuration;
        });
        break;
      default:
        break;
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, sortBy, courses]);

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <h1>Explore Our Courses</h1>
        <p>Master new skills with expert-led courses in various domains</p>
        <SearchBar 
          placeholder="Search for courses (e.g., 'computer programming', 'web development')"
          onSearch={setSearchTerm}
          onApplyFilters={setAppliedFilters}
          onCancelFilters={() => setAppliedFilters([])}
          showFilters={true}
        />
      </div>

      <div className="courses-container">
        <div className="courses-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Difficulty</h3>
            <div className="difficulty-list">
              <button className="difficulty-btn">Beginner</button>
              <button className="difficulty-btn">Intermediate</button>
              <button className="difficulty-btn">Advanced</button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Duration</h3>
            <div className="duration-list">
              <button className="duration-btn">Under 4 weeks</button>
              <button className="duration-btn">4-8 weeks</button>
              <button className="duration-btn">8+ weeks</button>
            </div>
          </div>
        </div>

        <div className="courses-main">
          <div className="courses-header">
            <h2>{filteredCourses.length} Courses Found</h2>
            <div className="sort-options">
              <FaSortAmountDown />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>
          </div>

          <div className="courses-grid">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isEnrolled={course.enrolled}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="no-results">
              <h3>No courses found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      <div className="featured-instructors">
        <h2>Featured Instructors</h2>
        <div className="instructors-grid">
          <div className="instructor-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Instructor" />
            <h4>John Smith</h4>
            <p>Senior Web Developer</p>
            <div className="instructor-stats">
              <span>4.9 ★</span>
              <span>12K Students</span>
            </div>
          </div>
          {/* Add more instructor cards */}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;