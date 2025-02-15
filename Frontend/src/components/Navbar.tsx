import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu on mobile screens
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Logo or Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Unstoppable Bharat
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Right side: Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/leaderboard"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Leaderboard
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">🔥</span>
              <span className="text-gray-700 font-medium">1 Day Streak</span>
            </div>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Your Profile
            </Link>
            <Link
              to="/search-jobs"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Search Jobs
            </Link>
            <Link
              to="/chatbot"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Chatbot Support
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-md mt-2 absolute w-full left-0 top-16 px-4 py-2">
            <div className="flex flex-col items-center space-y-4">
              <Link
                to="/leaderboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={toggleMenu}
              >
                Leaderboard
              </Link>
              <div className="flex items-center space-x-2 text-gray-700 font-medium">
                <span>🔥</span>
                <span>1 Day Streak</span>
              </div>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={toggleMenu}
              >
                Your Profile
              </Link>
              <Link
                to="/chatbot"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={toggleMenu}
              >
                Chatbot Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
