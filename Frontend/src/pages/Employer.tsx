import { useState } from "react"

const Employer = () => {
    const [jobDetails, setJobDetails] = useState({
        location: "",
        jobRequired: "",
        timings: "",
        payment: "",
        jobDescription: "",
        jobCreated: false
      });
    
      const jobOptions = [
        "Carpenter", "Electrician", "Plumber", "Painter", "Mason", "Welder", "Mechanic", "Driver", "Security Guard", "Gardener"
      ];
    
      const workers = {
        "Carpenter": [
          { name: "Sunil Verma", profession: "Carpenter", payment: "₹600/hr", profilePic: "https://via.placeholder.com/50", streak: 30 },
          { name: "Raj Malhotra", profession: "Carpenter", payment: "₹550/hr", profilePic: "https://via.placeholder.com/50", streak: 25 }
        ],
        "Electrician": [
          { name: "Rahul Sharma", profession: "Electrician", payment: "₹500/hr", profilePic: "https://via.placeholder.com/50", streak: 28 },
          { name: "Manoj Pandey", profession: "Electrician", payment: "₹450/hr", profilePic: "https://via.placeholder.com/50", streak: 20 }
        ],
        "Plumber": [
          { name: "Vikram Singh", profession: "Plumber", payment: "₹550/hr", profilePic: "https://via.placeholder.com/50", streak: 22 },
          { name: "Amit Kumar", profession: "Plumber", payment: "₹520/hr", profilePic: "https://via.placeholder.com/50", streak: 18 }
        ]
      };
    
      const handleChange = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = () => {
        setJobDetails({ ...jobDetails, jobCreated: true });
      };
    
      return (
        <div className="flex flex-col items-center h-screen bg-gray-100 p-6">
          <h1 className="text-4xl font-bold mb-6">LIST OF SUITABLE CANDIDATES</h1>
          {!jobDetails.jobCreated ? (
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block font-semibold">Location:</label>
                <input type="text" name="location" value={jobDetails.location} onChange={handleChange} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Job Required:</label>
                <select name="jobRequired" value={jobDetails.jobRequired} onChange={handleChange} className="w-full p-2 border rounded-lg">
                  <option value="">Select a job</option>
                  {jobOptions.map((job, index) => (
                    <option key={index} value={job}>{job}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Timings:</label>
                <input type="time" name="timings" value={jobDetails.timings} onChange={handleChange} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Payment:</label>
                <input type="number" name="payment" value={jobDetails.payment} onChange={handleChange} inputMode="numeric" pattern="[0-9]*" className="w-full p-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Job Description:</label>
                <textarea name="jobDescription" value={jobDetails.jobDescription} onChange={handleChange} className="w-full p-2 border rounded-lg h-24 resize-none" />
              </div>
              <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Create Job</button>
            </div>
          ) : (
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
              {workers[jobDetails.jobRequired]?.map((worker, index) => (
                <div key={index} className="p-4 border-b flex items-center gap-4">
                  <img src={worker.profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
                  <div>
                    <p><strong>Name:</strong> {worker.name}</p>
                    <p><strong>Profession:</strong> {worker.profession}</p>
                    <p><strong>Payment:</strong> {worker.payment}</p>
                    <p><strong>Streak:</strong> {worker.streak} days</p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2">Hire</button>
                  </div>
                </div>
              ))}
              <h2 className="text-2xl font-semibold mt-6 mb-4">Applications</h2>
              {workers[jobDetails.jobRequired]?.map((worker, index) => (
                <div key={index} className="p-4 border-b flex items-center gap-4">
                  <img src={worker.profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
                  <div>
                    <p><strong>Name:</strong> {worker.name}</p>
                    <p><strong>Profession:</strong> {worker.profession}</p>
                    <p><strong>Payment:</strong> {worker.payment}</p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2">Hire</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };
export default Employer;