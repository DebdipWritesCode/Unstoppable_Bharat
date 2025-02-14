
const Pfp = () => {
    return (
      
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold mb-6">You have successfully logged in!</h1>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-6xl">
          📷
        </div>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Insert Profile Picture
        </button>
      </div>
      
      <div className="mb-6 text-left">
        <label className="block mb-2 font-semibold">Highest Education:</label>
        <select className="w-full p-3 border rounded-lg">
          <option value="8th">8th</option>
          <option value="10th">10th</option>
          <option value="12th">12th</option>
          <option value="undergrad">Undergraduate</option>
          <option value="postgrad">Postgraduate</option>
          <option value="doctorate">Doctorate</option>
        </select>
      </div>
      
      <div className="mb-6 text-left">
        <label className="block mb-2 font-semibold">Choose Your Profession:</label>
        <select className="w-full p-3 border rounded-lg">
          <option value="construction_worker">Construction Worker</option>
          <option value="electrician">Electrician</option>
          <option value="plumber">Plumber</option>
          <option value="carpenter">Carpenter</option>
          <option value="welder">Welder</option>
          <option value="mechanic">Mechanic</option>
          <option value="painter">Painter</option>
          <option value="driver">Driver</option>
          <option value="factory_worker">Factory Worker</option>
          <option value="security_guard">Security Guard</option>
          <option value="gardener">Gardener</option>
          <option value="mason">Mason</option>
          <option value="tailor">Tailor</option>
          <option value="chef">Chef</option>
          <option value="housekeeper">Housekeeper</option>
          <option value="barber">Barber</option>
          <option value="porter">Porter</option>
          <option value="agricultural_worker">Agricultural Worker</option>
          <option value="blacksmith">Blacksmith</option>
          <option value="baker">Baker</option>
          <option value="butcher">Butcher</option>
          <option value="fisherman">Fisherman</option>
          <option value="laundry_worker">Laundry Worker</option>
          <option value="rickshaw_driver">Rickshaw Driver</option>
          <option value="cleaner">Cleaner</option>
          <option value="cobbler">Cobbler</option>
          <option value="dairy_farm_worker">Dairy Farm Worker</option>
          <option value="goldsmith">Goldsmith</option>
          <option value="handicraft_worker">Handicraft Worker</option>
          <option value="janitor">Janitor</option>
          <option value="miner">Miner</option>
          <option value="packaging_worker">Packaging Worker</option>
          <option value="street_vendor">Street Vendor</option>
          <option value="textile_worker">Textile Worker</option>
        </select>
      </div>

      <div className="mb-6 text-left">
        <label className="block mb-2 font-semibold">Your Skillset:</label>
        <input type="text" placeholder="Enter your skills" className="w-full p-3 border rounded-lg" />
      </div>

      <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
        Submit
      </button>
    </div>
  </div>
    )
  }
  
  export default Pfp