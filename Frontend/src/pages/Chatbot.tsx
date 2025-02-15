import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

// Interface for a message object
interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState<string>("");

  // Fetch the backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL + "/llm";

  // Function to send message to the backend and update the chat
  const sendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(""); // Clear the input field

      try {
        // Send the user input to the backend
        const response = await axios.post(`${backendUrl}/chat`, {
          userID: localStorage.getItem("userID"), // Replace with actual userID
          workerID: localStorage.getItem("workerID"), // Replace with actual workerID
          user_input: input,
        });

        // Assuming the backend returns the response in a structure like { message: string }
        const botMessage: Message = {
          text: response.data.response,
          sender: "bot",
        };

        // Update the chat with the bot's response
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = {
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Chat with Our AI Bot</h1>
      <div className="flex flex-col flex-grow bg-white rounded-lg shadow-lg p-4 overflow-y-auto h-[60vh]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg ${
              msg.sender === "bot" ? "bg-blue-200 self-start" : "bg-green-200 self-end"
            }`}
          >
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
