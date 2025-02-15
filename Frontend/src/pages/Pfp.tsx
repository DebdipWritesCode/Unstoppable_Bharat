import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pfp = () => {
  const [formData, setFormData] = useState({
    highestEducation: "8th",
    profession: "construction_worker",
    otherSkills: "",
    profilePicture: null as File | null, // State to hold the profile picture file
  });

  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<any>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]); // State to hold selected courses
  const [knownSkills, setKnownSkills] = useState<string[]>([]); // State to hold known skills
  const [profileCompleted, setProfileCompleted] = useState(false); // State to track if profile is completed
  const [loading, setLoading] = useState(false); // Loading state
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL + "/llm" || "http://localhost:3000";

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file change for profile picture
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userID = localStorage.getItem("userID"); // Assuming userID is stored after login
      if (!userID) {
        alert("User not logged in!");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("user_id", userID);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("highest_education", formData.highestEducation);
      formDataToSend.append("other_skills", formData.otherSkills);

      if (formData.profilePicture) {
        formDataToSend.append("profile_picture", formData.profilePicture); // Append profile picture
      }

      // Call save-worker API
      const response = await axios.post(
        `${BACKEND_URL}/save-worker`,
        formDataToSend
      );
      console.log("Save Worker Response:", response.data); // Log the response
      const workerID = response.data.worker._id;
      localStorage.setItem("workerID", workerID);

      // Call recommendations API
      fetchRecommendations(workerID);

      setProfileCompleted(true); // Mark profile as completed
    } catch (error: any) {
      console.error(
        "Error saving worker:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false); // Set loading to false once the process is finished
    }
  };

  // Fetch recommendations and format them
  const fetchRecommendations = async (workerID: string) => {
    setLoading(true); // Start loading when fetching recommendations
    try {
      const response = await axios.post(`${BACKEND_URL}/recommendations`, {
        userID: localStorage.getItem("userID"),
        soft_skills: "",
      });
      console.log("Recommendations Response:", response.data); // Log the response
      const formattedRecommendations = transformRecommendations(response.data);
      setRecommendations(formattedRecommendations); // Set formatted recommendations
    } catch (error: any) {
      console.error(
        "Error fetching recommendations:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false); // Set loading to false after recommendations are fetched
    }
  };

  // Transform response data to be formatted
  const transformRecommendations = (data: any) => {
    return {
      upskilling_suggestions: data.upskilling_suggestions
        ? data.upskilling_suggestions.split("\n")
        : [],
      top_soft_skills: data.top_soft_skills
        ? data.top_soft_skills.flatMap((skills: string) => skills.split("\n")[1])
        : [],
    };
  };

  // Handle course selection or known skill
  const handleCourseSelection = (course: string) => {
    setSelectedCourses((prev) => {
      if (prev.includes(course)) {
        return prev.filter((item) => item !== course);
      } else {
        return [...prev, course];
      }
    });
  };

  // Mark skill as "I Already Know This"
  const handleKnownSkill = (skill: string) => {
    setKnownSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((item) => item !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  // Handle final submit
  const handleFinalSubmit = async () => {
    try {
      const userID = localStorage.getItem("userID");
      if (!userID) {
        alert("User not logged in!");
        return;
      }

      const softSkills = knownSkills.join(", "); // Join all the known skills into a string

      console.log("Known Skills:", softSkills);

      if(selectedCourses.length >= 2) {
        navigate("/recommended-courses", { state: { courses: selectedCourses } });
      }
      const response = await axios.post(`${BACKEND_URL}/recommendations`, {
        userID,
        soft_skills: softSkills,
      });

      console.log("Recommendations Response:", response.data); // Log the response
      setRecommendations(transformRecommendations(response.data)); // Set all data in a single state
    } catch (error: any) {
      console.error(
        "Error fetching recommendations:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false); // Set loading to false after recommendations are fetched
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
        {loading ? (
          // Show loading state
          <div>Loading...</div>
        ) : profileCompleted ? (
          // Recommendations section
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Recommended Courses
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {recommendations && // Check if recommendations is not null/undefined
                [
                  ...(recommendations.upskilling_suggestions || []),
                  ...(recommendations.top_soft_skills || []),
                ]
                  .slice(0, 4) // Display a maximum of 4 items
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 border rounded-lg ${
                        selectedCourses.includes(item)
                          ? "bg-blue-100 border-blue-500" // Blue background for selected courses
                          : knownSkills.includes(item)
                          ? "bg-gray-100 border-gray-500" // Grey background for known skills
                          : ""
                      }`}>
                      <span>{item}</span>
                      <div>
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => handleCourseSelection(item)}>
                          Select
                        </button>
                        <button
                          className="ml-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          onClick={() => handleKnownSkill(item)}>
                          I Already Know This
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
            <button
              className="mt-6 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
              onClick={handleFinalSubmit}>
              Submit Known Skills
            </button>
          </>
        ) : (
          // Profile form
          <>
            <h1 className="text-4xl font-bold mb-6">Complete Your Profile</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label className="block mb-2 font-semibold">
                  Highest Education:
                </label>
                <select
                  name="highestEducation"
                  value={formData.highestEducation}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg">
                  <option value="8th">8th</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="undergrad">Undergraduate</option>
                  <option value="postgrad">Postgraduate</option>
                  <option value="doctorate">Doctorate</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block mb-2 font-semibold">
                  Choose Your Profession:
                </label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg">
                  <option value="construction_worker">
                    Construction Worker
                  </option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="welder">Welder</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="painter">Painter</option>
                  <option value="driver">Driver</option>
                  <option value="factory_worker">Factory Worker</option>
                  <option value="security_guard">Security Guard</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block mb-2 font-semibold">
                  Your Skillset:
                </label>
                <input
                  type="text"
                  name="otherSkills"
                  value={formData.otherSkills}
                  onChange={handleChange}
                  placeholder="Enter your skills"
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="text-left">
                <label className="block mb-2 font-semibold">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Pfp;
