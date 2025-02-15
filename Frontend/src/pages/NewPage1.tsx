import { useState } from "react"
import { Link } from "react-router-dom";
import defaultImg from "../assets/default.jpg";

const NewPage1 = () => {
  const [selectedTab, setSelectedTab] = useState("learn");
  const [showCourses, setShowCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const jobs = [
    { id: 1, name: "John Doe", job: "Plumbing", time: "5 hours", payment: "$100" },
    { id: 2, name: "Alice Smith", job: "House Cleaning", time: "3 hours", payment: "$50" },
    { id: 3, name: "Robert Brown", job: "Electrician Work", time: "4 hours", payment: "$120" },
    { id: 4, name: "Emily Johnson", job: "Carpentry", time: "6 hours", payment: "$150" },
    { id: 5, name: "David Wilson", job: "Gardening", time: "2 hours", payment: "$40" },
    { id: 6, name: "Sophia Martinez", job: "Babysitting", time: "8 hours", payment: "$80" }
  ];

  const courses = [
    { id: 1, name: "Basic Plumbing", duration: 7 },
    { id: 2, name: "Housekeeping Essentials", duration: 5 },
    { id: 3, name: "Electrical Maintenance", duration: 6 },
    { id: 4, name: "Woodworking Basics", duration: 7 },
    { id: 5, name: "Gardening & Landscaping", duration: 4 },
    { id: 6, name: "Child Care Training", duration: 10 }
  ];

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Choose Your Path</h1>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg ${selectedTab === "learn" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => { setSelectedTab("learn"); setShowCourses(false); setSelectedCourse(null); }}
        >
          Learn
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${selectedTab === "work" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedTab("work")}
        >
          Work
        </button>
      </div>

      {selectedTab === "learn" ? (
        <div className="text-center w-full h-full max-w-4xl">
          {!showCourses ? (
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Link to={"/pfp"}>Start a Course</Link>
            </button>
          ) : selectedCourse ? (
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">{selectedCourse.name}</h2>
              <p className="mb-4">Course Duration: {selectedCourse.duration} modules</p>
              <p className="font-semibold mb-2">Your Progress Streak: 0 days</p>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(selectedCourse.duration)].map((_, index) => (
                  <div key={index} className="p-6 border rounded-lg text-center bg-gray-200">
                    Module {index + 1}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
              <div className="grid grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg flex flex-col items-start">
                    <p className="font-semibold">{course.name}</p>
                    <p>Duration: {course.duration} modules</p>
                    <button
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Start Course
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-lg  bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 border rounded-lg flex items-center space-x-4 justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={defaultImg}
                    alt="Employer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{job.name}</p>
                    <p>Job: {job.job}</p>
                    <p>Time Required: {job.time}</p>
                    <p>Payment: {job.payment}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default NewPage1;
