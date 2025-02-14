
const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-12">Select Language</h1>
        <div className="flex justify-center space-x-16 mb-12">
          <div className="w-48 h-50 flex flex-col border rounded-lg shadow bg-white overflow-hidden cursor-pointer items-center">
            <div className="flex flex-col items-center justify-center h-3/4">
              <span className="text-5xl font-bold text-gray-800">A</span>
            </div>
            <div className="w-full h-0.5 bg-gray-400"></div>
            <div className="flex items-center justify-center h-1/4">
              <span className="text-lg text-gray-600">English</span>
            </div>
          </div>
          <div className="w-48 h-50 flex flex-col border rounded-lg shadow bg-white overflow-hidden cursor-pointer items-center">
            <div className="flex flex-col items-center justify-center h-3/4">
              <span className="text-5xl font-bold text-gray-800">अ</span>
            </div>
            <div className="w-full h-0.5 bg-gray-400"></div>
            <div className="flex items-center justify-center h-1/4">
              <span className="text-lg text-gray-600">हिन्दी</span>
            </div>
          </div>
        </div>
        <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700">
          Select a Language
        </button>
      </div>
    </div>
  )
}

export default Home