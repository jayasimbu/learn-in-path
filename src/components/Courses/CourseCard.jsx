import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Courses.css';
import { 
  FaPlayCircle, 
  FaClock, 
  FaUserGraduate, 
  FaStar,
  FaBookmark,
  FaShareAlt
} from 'react-icons/fa';

const CourseCard = ({ course, isEnrolled }) => {
  const navigate = useNavigate();
  const { currentUser, enrollCourse, unenrollCourse } = useAuth();

  const enrolled = Boolean(
    isEnrolled || currentUser?.enrolledCourses?.includes(course.id)
  );

  const handleEnroll = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const res = enrollCourse(course.id);
    if (res.success) {
      alert(res.enrolled ? `Enrolled in ${course.title}` : `Enrollment updated`);
    }
  };

  const handleUnenroll = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const res = unenrollCourse(course.id);
    if (res.success) {
      alert(`Unenrolled from ${course.title}`);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.origin + `/learn/${course.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: course.title, url: shareUrl }); }
      catch (e) { /* ignore */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Course link copied to clipboard');
      } catch (e) {
        prompt('Copy this link', shareUrl);
      }
    }
  };

  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <div className="course-category">{course.category}</div>
        <button className="bookmark-btn">
          <FaBookmark />
        </button>
      </div>

      <div className="course-content">
        <div className="course-header">
          <h3>{course.title}</h3>
          <div className="course-rating">
            <FaStar />
            <span>4.8</span>
          </div>
        </div>

        <p className="course-description">{course.description}</p>

        <div className="course-meta">
          <div className="meta-item">
            <FaClock />
            <span>{course.duration}</span>
          </div>
          <div className="meta-item">
            <FaUserGraduate />
            <span>{course.level}</span>
          </div>
        </div>

        <div className="course-footer">
          {enrolled ? (
            <div style={{display:'flex', gap:8}}>
              <Link to={`/learn/${course.id}`} className="btn btn-primary">
                <FaPlayCircle /> Continue Learning
              </Link>
              <button onClick={handleUnenroll} className="btn btn-outline">Unenroll</button>
            </div>
          ) : (
            <button onClick={handleEnroll} className="btn btn-enroll">
              Enroll Now
            </button>
          )}
          
          <button className="btn btn-outline">
            <FaShareAlt /> Share
          </button>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: '65%' }}></div>
          </div>
          <span className="progress-text">0% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;