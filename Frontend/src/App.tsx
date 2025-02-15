<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import PfpPage from './pages/Pfp';
import ChoicePage from './pages/Choice';
import NewPage1 from './pages/NewPage1';
import ChatbotPage from './pages/Chatbot';
import LeaderboardPage from './pages/Leaderboard';
import UserprofilePage from './pages/Userprofile';
import EmployerPage from './pages/Employer';
import NotFound from './pages/Not-Found';
=======
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import StartPage from "./pages/Start";
import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import PfpPage from "./pages/Pfp";
import NewPage1 from "./pages/NewPage1";
import ChatbotPage from "./pages/Chatbot";
import NotFound from "./pages/Not-Found";
import RecommendedCoursePage from "./pages/RecommendedJCourses";
import Leaderboard from "./pages/Leaderboard";
import SearchJobs from "./pages/SearchJobs";
import Profile from "./pages/Profile";
>>>>>>> 1f813bad60553cfe7f23f2507e13de255f25c44f

const AppRouter: React.FC = () => {
  const location = useLocation();

  // Define the paths where the Navbar should appear
  const showNavbarPaths = ["/", "/leaderboard", "/profile", "/chatbot", "/search-jobs"];

  // Check if the current path is in the showNavbarPaths array
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Pfp" element={<PfpPage />} />
        <Route path="/Choice" element={<ChoicePage />} />
        <Route path="/NewPage1" element={<NewPage1 />} />
        <Route path="/Chatbot" element={<ChatbotPage />} />
        <Route path="/Leaderboard" element={<LeaderboardPage />} />
        <Route path="/Userprofile" element={<UserprofilePage />} />
        <Route path="/Employer" element={<EmployerPage />} />
=======
        <Route path="/start" element={<StartPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pfp" element={<PfpPage />} />
        <Route path="/newPage1" element={<NewPage1 />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/recommended-courses" element={<RecommendedCoursePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/search-jobs" element={<NewPage1 />} />
        <Route path="/profile" element={<Profile />} />
>>>>>>> 1f813bad60553cfe7f23f2507e13de255f25c44f
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;