import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // could return a spinner
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}
