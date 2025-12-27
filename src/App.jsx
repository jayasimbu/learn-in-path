import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import LearningPage from './pages/LearningPage';
import PrivateRoute from './components/Auth/PrivateRoute';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } />
                <Route path="/courses" element={
                  <PrivateRoute>
                    <CoursesPage />
                  </PrivateRoute>
                } />
                <Route path="/learn/:courseId" element={
                  <PrivateRoute>
                    <LearningPage />
                  </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;