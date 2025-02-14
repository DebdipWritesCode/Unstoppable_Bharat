import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I am here to help!", sender: "bot" }]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Chat with Our AI Bot</h1>
      <div className="flex flex-col flex-grow bg-white rounded-lg shadow-lg p-4 overflow-y-auto h-[60vh]">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-3 rounded-lg ${msg.sender === "bot" ? "bg-blue-200 self-start" : "bg-green-200 self-end"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow p-3 border rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700"
          onClick={sendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
