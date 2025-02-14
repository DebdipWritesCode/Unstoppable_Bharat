import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import PfpPage from './pages/Pfp';
import ChoicePage from './pages/Choice';
import NewPage1 from './pages/NewPage1';
import ChatbotPage from './pages/Chatbot';
import NotFound from './pages/Not-Found';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Pfp" element={<PfpPage />} />
        <Route path="/Choice" element={<ChoicePage />} />
        <Route path="/NewPage1" element={<NewPage1 />} />
        <Route path="/Chatbot" element={<ChatbotPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
