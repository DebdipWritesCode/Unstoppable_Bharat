import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Choice from "../components/Choice";

// Define types for form data
interface SignupFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  choice: "worker" | "provider";
  gender: string;
  aadharNumber: string; // Stored but not sent in API request
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    choice: "worker",
    gender: "",
    aadharNumber: "",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showChoice, setShowChoice] = useState<boolean>(true);

  // Handle input changes for both input and select elements
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle choice selection
  const handleChoiceSelect = (choice: "worker" | "provider") => {
    setFormData({ ...formData, choice });
    setShowChoice(false); // Hide choice and show form
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.choice) {
      setError("Please select your role before signing up.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { firstName, lastName, phoneNumber, password, choice, gender } = formData;
      const response = await axios.post(
        `${BACKEND_URL}/auth/register`,
        {
          first_name: firstName,
          last_name: lastName,
          phone: phoneNumber,
          password,
          role: choice,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      localStorage.setItem("userID", response.data.user._id); // Store user ID
      setSuccess(response.data.message || "Signup successful!");
      navigate("/pfp"); // Redirect user after successful signup
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return showChoice ? (
    <Choice onSelect={handleChoiceSelect} />
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 border rounded-lg"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 border rounded-lg"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
          {/* Aadhar Number (Stored but not sent) */}
          <input
            type="text"
            name="aadharNumber"
            placeholder="Aadhar Number"
            className="w-full p-3 border rounded-lg"
            value={formData.aadharNumber}
            onChange={handleChange}
          />

          {/* Gender Selection */}
          <select
            name="gender"
            className="w-full p-3 border rounded-lg"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="others">Others</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>

          <p className="text-center font-semibold">Role: {formData.choice.toUpperCase()}</p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
