import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import '../styles/Learning.css';
import { 
  FaPlay, 
  FaBook, 
  FaFileAlt, 
  FaQuestionCircle,
  FaClock,
  FaDownload,
  FaShareSquare
} from 'react-icons/fa';

const LearningPage = () => {
  const { courseId } = useParams();
  const { courses } = useCourses();
  const [currentVideo, setCurrentVideo] = useState(0);
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return <div>Course not found</div>;
  }

  const modules = [
    {
      id: 1,
      title: 'Introduction to UI/UX Design',
      duration: '45 min',
      type: 'video',
      completed: true
    },
    {
      id: 2,
      title: 'Design Principles and Patterns',
      duration: '60 min',
      type: 'video',
      completed: true
    },
    {
      id: 3,
      title: 'Wireframing and Prototyping',
      duration: '75 min',
      type: 'video',
      completed: false
    },
    {
      id: 4,
      title: 'User Research Methods',
      duration: '50 min',
      type: 'reading',
      completed: false
    },
    {
      id: 5,
      title: 'Quiz: Design Fundamentals',
      duration: '30 min',
      type: 'quiz',
      completed: false
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="learning-container">
      <div className="learning-header">
        <div className="left-header">
          <button className="btn btn-back" onClick={() => navigate('/dashboard')}>&larr; Back</button>
          <h1>{course.title}</h1>
        </div>
        <div className="course-actions">
          <button className="btn btn-outline">
            <FaDownload /> Download Resources
          </button>
          <button className="btn btn-outline">
            <FaShareSquare /> Share Course
          </button>
        </div>
      </div>

      <div className="learning-content">
        <div className="video-section">
          <div className="video-player">
            <iframe
              src={course.youtubeLinks[currentVideo]}
              title={course.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-info">
            <h2>Video {currentVideo + 1}: {modules[currentVideo]?.title}</h2>
            <div className="video-meta">
              <span><FaClock /> {modules[currentVideo]?.duration}</span>
              <span>Lesson {currentVideo + 1} of {modules.length}</span>
            </div>
            
            <div className="video-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentVideo(prev => Math.max(0, prev - 1))}
                disabled={currentVideo === 0}
              >
                Previous
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentVideo(prev => Math.min(modules.length - 1, prev + 1))}
                disabled={currentVideo === modules.length - 1}
              >
                Next Lesson
              </button>
            </div>
          </div>
        </div>

        <aside className="learning-sidebar">
          <div className="modules-section">
            <h3>Course Modules</h3>
            <div className="modules-list">
              {modules.map((module, index) => (
                <div 
                  key={module.id}
                  className={`module-item ${currentVideo === index ? 'active' : ''} ${module.completed ? 'completed' : ''}`}
                  onClick={() => setCurrentVideo(index)}
                >
                  <div className="module-icon">
                    {module.type === 'video' ? <FaPlay /> : 
                     module.type === 'reading' ? <FaBook /> : 
                     <FaQuestionCircle />}
                  </div>
                  <div className="module-content">
                    <h4>{module.title}</h4>
                    <p>{module.duration} • {module.type}</p>
                  </div>
                  {module.completed && <span className="completed-badge">✓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="resources-section">
            <h3>Resources</h3>
            <div className="resource-list">
              <a href="#" className="resource-item">
                <FaFileAlt />
                <span>Course Syllabus PDF</span>
              </a>
              <a href="#" className="resource-item">
                <FaFileAlt />
                <span>Design Templates</span>
              </a>
              <a href="#" className="resource-item">
                <FaFileAlt />
                <span>Reading Materials</span>
              </a>
            </div>
          </div>

          <div className="progress-section">
            <h3>Your Progress</h3>
            <div className="progress-circle">
              <div className="circle" style={{ '--progress': '65' }}>
                <span>65%</span>
              </div>
            </div>
            <p>Complete all modules to get certificate</p>
          </div>
        </aside>
      </div>

      <div className="discussion-section">
        <h3>Discussion Forum</h3>
        <div className="discussion-input">
          <input type="text" placeholder="Ask a question or share your thoughts..." />
          <button className="btn btn-primary">Post</button>
        </div>
        <div className="discussion-posts">
          {/* Discussion posts would go here */}
        </div>
      </div>
    </div>
  );
};

export default LearningPage;