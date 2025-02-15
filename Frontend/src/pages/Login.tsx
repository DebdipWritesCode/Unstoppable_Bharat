import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        {
          phone: formData.phoneNumber,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      localStorage.setItem("userID", response.data.user._id); // Store JWT token

      setSuccess("Login successful!");
      localStorage.setItem("token", response.data.token); // Store JWT token
      navigate("/pfp"); // Redirect user after successful login
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Log In</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
