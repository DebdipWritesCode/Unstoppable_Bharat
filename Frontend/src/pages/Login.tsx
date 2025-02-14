const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Sign In</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg" />
          <input type="date" placeholder="Date of Birth" className="w-full p-3 border rounded-lg" />
          <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Aadhar Number" className="w-full p-3 border rounded-lg" />
          <select className="w-full p-3 border rounded-lg">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="others">Others</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-lg" />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Sign In
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
    )
  }
  
  export default Login