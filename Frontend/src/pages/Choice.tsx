const Choice = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>

                <div className="flex flex-col items-center mb-6">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Admin Icon"
                        className="w-32 h-32 mb-4"
                    />
                    <p className="text-lg font-semibold">Are you a Worker or an Employer?</p>
                </div>

                <div className="space-y-4">
                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                        Worker
                    </button>
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
                        Employer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Choice