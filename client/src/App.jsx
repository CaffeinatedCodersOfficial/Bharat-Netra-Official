import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import ProtectedRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const location = useLocation();
  const {userData} = useContext(AppContext);
  
  const hideNavbarRoutes = ["/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer className="bg-transparent" />
     {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
