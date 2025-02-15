import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RecommendedCourses = () => {
  const { state } = useLocation();
  const { courses } = state || {}; // Get the selected courses from the state
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0); // Track the current course
  const [videoLinks, setVideoLinks] = useState<
    { title: string; url: string }[]
  >([]); // Store video titles and URLs
  const [loading, setLoading] = useState(false); // Loading state for video fetch

  // Fetch the backend URL from the environment variables
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  // Fetch YouTube video recommendations for the course
  const fetchVideoRecommendations = async (course: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/llm/create-module`, {
        title: course,
      });

      console.log(response.data.response);
      // Assuming the response returns an array of objects with title and url
      setVideoLinks(response.data.response.videos);
    } catch (error: any) {
      console.error(
        "Error fetching video links:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle the reveal of course content
  const handleReveal = async (course: string) => {
    await fetchVideoRecommendations(course);
  };

  // Move to the next course
  const handleNextCourse = () => {
    if (currentCourseIndex < courses.length - 1) {
      setCurrentCourseIndex(currentCourseIndex + 1);
      setVideoLinks([]); // Reset video links when moving to the next course
    }
  };

  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }

  const currentCourse = courses[currentCourseIndex];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md text-center space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Recommended Course: {currentCourse}
        </h2>

        {/* Course Card */}
        <div className="relative bg-gradient-to-r from-teal-400 via-teal-300 to-green-200 rounded-lg p-6 shadow-lg">
          <div className="flex justify-center items-center">
            {!loading ? (
              videoLinks.length === 0 ? (
                <div className="text-gray-800">
                  <p className="text-lg">
                    Click on "Reveal" to see video recommendations
                  </p>
                  <button
                    onClick={() => handleReveal(currentCourse)}
                    className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-full text-lg hover:bg-teal-600 transition-all duration-300"
                  >
                    Reveal
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-gray-800">
                  <h3 className="text-xl font-semibold">Recommended Videos:</h3>
                  {videoLinks.map((video, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
                    >
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline transition-all duration-300"
                      >
                        {video.title}
                      </a>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <p className="text-gray-700 text-lg">Loading videos...</p>
            )}
          </div>
        </div>

        {/* Quizzes and Activities */}
        <div className="mt-6 font-bold text-lg text-gray-700">
          Quizzes and Activities Coming Soon
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentCourseIndex < courses.length - 1 && (
            <button
              onClick={handleNextCourse}
              className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition-all duration-300"
            >
              Next Course
            </button>
          )}
        </div>
        <button className=" py-2 px-4 font-semibold cursor-pointer bg-blue-600 text-white rounded-xl mt-4 hover:bg-blue-800">
          <Link to="/">Back to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default RecommendedCourses;
