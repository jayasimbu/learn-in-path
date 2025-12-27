import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = JSON.parse(localStorage.getItem('learnInPathUser'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate API call
    const user = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      enrolledCourses: ['ui-ux', 'web-dev'],
      progress: 65
    };
    localStorage.setItem('learnInPathUser', JSON.stringify(user));
    setCurrentUser(user);
    return { success: true, user };
  };

  const register = (userData) => {
    // Simulate API call
    const user = {
      id: '2',
      name: userData.name,
      email: userData.email,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      enrolledCourses: [],
      progress: 0
    };
    localStorage.setItem('learnInPathUser', JSON.stringify(user));
    setCurrentUser(user);
    return { success: true, user };
  };

  const logout = () => {
    localStorage.removeItem('learnInPathUser');
    setCurrentUser(null);
  };

  const enrollCourse = (courseId) => {
    if (!currentUser) return { success: false, message: 'Not authenticated' };
    const already = currentUser.enrolledCourses?.includes(courseId);
    const updated = {
      ...currentUser,
      enrolledCourses: already
        ? currentUser.enrolledCourses.filter((c) => c !== courseId)
        : [...(currentUser.enrolledCourses || []), courseId],
    };
    localStorage.setItem('learnInPathUser', JSON.stringify(updated));
    setCurrentUser(updated);
    return { success: true, enrolled: !already };
  };

  const unenrollCourse = (courseId) => {
    if (!currentUser) return { success: false, message: 'Not authenticated' };
    const updated = {
      ...currentUser,
      enrolledCourses: (currentUser.enrolledCourses || []).filter((c) => c !== courseId),
    };
    localStorage.setItem('learnInPathUser', JSON.stringify(updated));
    setCurrentUser(updated);
    return { success: true };
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    enrollCourse,
    unenrollCourse,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};