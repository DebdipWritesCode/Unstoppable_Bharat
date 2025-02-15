import React from "react";
import Navbar from "../components/Navbar"; // Import the Navbar component

import trans from "../assets/trans.jpg";
import women from "../assets/women.jpg";
import laborers from "../assets/day labor.jpg";

const Home = () => {
  return (
    <div>
      {/* Include the Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-16">
        {" "}
        {/* Add padding-top to avoid content overlap with the fixed Navbar */}
        <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-blue-600 leading-tight">
              Welcome to{" "}
              <span className="text-indigo-600 mb-6">Unstoppable Bharat</span>!
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Start your learning journey today and unlock new opportunities
              with a community that pushes the limits of what’s possible. Let's
              grow together.
            </p>
          </div>
        </div>
        {/* Welfare Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-0">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Welfare for...
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Card 1: Underprivileged Women */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={women}
                alt="Underprivileged Women"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Underprivileged Women
                </h3>
                <p className="mt-2 text-gray-600">
                  Empowering women in need through education and skill
                  development.
                </p>
              </div>
            </div>

            {/* Card 2: Day Pay Laborers */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={laborers}
                alt="Day Pay Laborers"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Day Pay Laborers
                </h3>
                <p className="mt-2 text-gray-600">
                  Providing support for laborers in need of financial stability
                  and growth.
                </p>
              </div>
            </div>

            {/* Card 3: Transgender People */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={trans}
                alt="Transgender People"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Transgender People
                </h3>
                <p className="mt-2 text-gray-600">
                  Fostering a safe and inclusive space for transgender
                  individuals to thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
