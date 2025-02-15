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