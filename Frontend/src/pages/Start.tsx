import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Start: React.FC = () => {
  // const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: string) => {
    // i18n.changeLanguage(lang);
    // localStorage.setItem("language", lang); // Persist language choice
    navigate("/login"); // Redirect to the next page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-12">Select Language</h1>
        <div className="flex justify-center space-x-16 mb-12">
          {/* English Card */}
          <div
            className="w-48 h-50 flex flex-col border rounded-lg shadow bg-white overflow-hidden cursor-pointer items-center hover:shadow-lg transition"
            onClick={() => handleLanguageChange("en")}>
            <div className="flex flex-col items-center justify-center h-3/4">
              <span className="text-5xl font-bold text-gray-800">A</span>
            </div>
            <div className="w-full h-0.5 bg-gray-400"></div>
            <div className="flex items-center justify-center h-1/4">
              <span className="text-lg text-gray-600">English</span>
            </div>
          </div>

          {/* Hindi Card */}
          <div
            className="w-48 h-50 flex flex-col border rounded-lg shadow bg-white overflow-hidden cursor-pointer items-center hover:shadow-lg transition"
            onClick={() => handleLanguageChange("hi")}>
            <div className="flex flex-col items-center justify-center h-3/4">
              <span className="text-5xl font-bold text-gray-800">अ</span>
            </div>
            <div className="w-full h-0.5 bg-gray-400"></div>
            <div className="flex items-center justify-center h-1/4">
              <span className="text-lg text-gray-600">हिन्दी</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
