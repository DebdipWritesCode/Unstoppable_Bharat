
const workers = [
    { name: "John Doe", profession: "Electrician", streak: 120 },
    { name: "Alice Smith", profession: "Plumber", streak: 110 },
    { name: "Robert Brown", profession: "Carpenter", streak: 100 },
    { name: "Emily Johnson", profession: "Painter", streak: 95 },
    { name: "David Wilson", profession: "Mechanic", streak: 90 },
    { name: "Sophia Martinez", profession: "Welder", streak: 85 },
    { name: "James Anderson", profession: "Gardener", streak: 80 },
    { name: "Michael Lee", profession: "Mason", streak: 75 },
    { name: "Sarah Kim", profession: "Blacksmith", streak: 70 },
    { name: "William Clark", profession: "Tailor", streak: 65 }
  ];
  
  const Leaderboard = () => {
    return (
      <div className="flex flex-col items-center h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-6">Top Workers Leaderboard</h1>
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Profession</th>
                <th className="p-3 text-left">Streak</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">#{index + 1}</td>
                  <td className="p-3">{worker.name}</td>
                  <td className="p-3">{worker.profession}</td>
                  <td className="p-3">{worker.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Leaderboard;
  