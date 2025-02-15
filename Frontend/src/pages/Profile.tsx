const user = {
  name: "John Doe",
  profession: "Carpenter",
  skillset: ["Woodworking", "Furniture Repair", "Polishing"],
  currentStatus: "Available for Work",
  streak: 45,
  contact: "+1 234 567 890",
  experience: 15,
  location: "New York, USA",
  rating: 4.8,
  courses: [
    { name: "Carpentry Basics", progress: 50 },
    { name: "Advanced Carpentry", progress: 30 }
  ]
};

import { useState } from "react";

const Userprofile = () => {
  const [autoApply, setAutoApply] = useState(false);

  const handleToggle = () => {
    setAutoApply(prevState => !prevState);
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">User Profile</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
        <img
          src=""
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.profession}</p>
        <div className="mt-4">
          {user.courses.map((course, index) => (
            <span
              key={index}
              className="inline-block bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full m-1"
            >
              {course.name} - {course.progress}%
            </span>
          ))}
        </div>
        <div className="mt-4 text-left">
          <p><strong>Skillset:</strong> {user.skillset.join(", ")}</p>
          <p><strong>Current Status:</strong> {user.currentStatus}</p>
          <p><strong>Streak:</strong> {user.streak} days</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>Experience:</strong> Hired {user.experience} times</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Ratings:</strong> {user.rating} ⭐</p>
        </div>
        <div className="mt-6">
          <button
            onClick={handleToggle}
            className={`px-4 py-2 rounded-full ${autoApply ? 'bg-green-500' : 'bg-gray-500'} text-white`}
          >
            {autoApply ? 'Turn Off Auto Apply' : 'Turn On Auto Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;