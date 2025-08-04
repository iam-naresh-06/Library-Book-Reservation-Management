// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <Link to="/" className="text-lg font-medium text-gray-900 hover:text-blue-600">
            Library System
          </Link>
          {user && (
            <>
              <Link to="/books" className="text-gray-600 hover:text-blue-600">
                Books
              </Link>
              <Link to="/borrowers" className="text-gray-600 hover:text-blue-600">
                Borrowers
              </Link>
              <Link to="/reports" className="text-gray-600 hover:text-blue-600">
                Reports
              </Link>
            </>
          )}
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="btn-secondary py-1 px-3 text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary py-1 px-3 text-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;