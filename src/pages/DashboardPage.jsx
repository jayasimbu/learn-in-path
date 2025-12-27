import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import ProfileCard from '../components/Dashboard/ProfileCard';
import StatsCard from '../components/Dashboard/StatsCard';
import CourseCard from '../components/Courses/CourseCard';
import SearchBar from '../components/Common/SearchBar';
import '../styles/Dashboard.css';
import { 
  FaChartLine, 
  FaClock, 
  FaCertificate, 
  FaTrophy,
  FaFire,
  FaBook,
  FaStar
} from 'react-icons/fa';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { courses } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter enrolled courses
  const enrolledCourses = courses.filter(course => 
    currentUser?.enrolledCourses?.includes(course.id)
  );

  // Filter suggested courses
  const suggestedCourses = courses.filter(course => 
    !currentUser?.enrolledCourses?.includes(course.id)
  ).slice(0, 3);

  const stats = [
    { icon: <FaBook />, label: 'Enrolled Courses', value: enrolledCourses.length, color: '#4f46e5' },
    { icon: <FaClock />, label: 'Learning Hours', value: '48.5', color: '#10b981' },
    { icon: <FaCertificate />, label: 'Certificates', value: '2', color: '#f59e0b' },
    { icon: <FaTrophy />, label: 'Achievements', value: '7', color: '#ef4444' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {currentUser?.name}!</h1>
          <p className="dashboard-subtitle">Continue your learning journey</p>
        </div>
        <SearchBar 
          placeholder="Search courses, topics, or instructors..." 
          onSearch={setSearchTerm}
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-left">
          <ProfileCard user={currentUser} />
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="trending-section">
            <div className="section-header">
              <FaFire className="trending-icon" />
              <h3>Trending Now</h3>
            </div>
            <div className="trending-list">
              <div className="trending-item">
                <div className="trending-number">1</div>
                <div>
                  <h4>AI/ML Fundamentals</h4>
                  <p>+1,234 learners this week</p>
                </div>
                <FaStar className="star-icon" />
              </div>
              <div className="trending-item">
                <div className="trending-number">2</div>
                <div>
                  <h4>Web Development Bootcamp</h4>
                  <p>+892 learners this week</p>
                </div>
                <FaStar className="star-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          <div className="courses-section">
            <div className="section-header">
              <h2>Your Learning Path</h2>
              <Link to="/courses" className="view-all-btn">View All</Link>
            </div>
            
            <div className="enrolled-courses">
              {enrolledCourses.map(course => (
                <CourseCard key={course.id} course={course} isEnrolled={true} />
              ))}
            </div>
          </div>

          <div className="courses-section">
            <div className="section-header">
              <h2>Suggested For You</h2>
            </div>
            
            <div className="suggested-courses">
              {suggestedCourses.map(course => (
                <CourseCard key={course.id} course={course} isEnrolled={false} />
              ))}
            </div>
          </div>

          <div className="progress-section">
            <h3>Your Progress</h3>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${currentUser?.progress || 0}%` }}
                ></div>
              </div>
              <span className="progress-text">{currentUser?.progress || 0}% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;