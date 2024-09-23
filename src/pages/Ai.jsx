import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaRobot } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';

// GoogleGenerativeAI API
const apiKey = 'AIzaSyDloEAUKKKka2C5Vc6FGK8aG0ocJwQQaus'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const AiChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Welcome to Talent Engaged Classes! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  // Google Generative AI API config
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { sender: 'User', text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');

      try {
        const chatSession = model.startChat({ generationConfig, history: [] });
        const result = await chatSession.sendMessage(input);

        if (result && result.response && result.response.text) {
          // Add AI's response to the chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'AI', text: result.response.text },
          ]);
        } else {
          console.error('No response generated.');
        }
      } catch (error) {
        console.error('Error generating AI response:', error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between border-r-2 border-purple-500 fixed h-screen">
        <div>
          <div className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Talent Engaged
          </div>
          <ul className="space-y-6">
            <li className="flex items-center space-x-3 hover:text-purple-400">
              <FaRobot className="text-2xl text-purple-500" />
              <span className="text-lg">AI Chat</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-purple-400">
              <FaUser className="text-2xl text-purple-500" />
              <span className="text-lg">Profile</span>
            </li>
          </ul>
        </div>
        <div>
          <button className="w-full bg-purple-700 text-white py-3 px-4 rounded-md hover:bg-purple-500 neon-glow mt-6">
            Upgrade Plan
          </button>
          <p className="text-sm text-gray-400 mt-4 text-center">Access premium features</p>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <main className="ml-64 flex-1 flex flex-col">
        {/* Chat Messages Section */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4 pb-20">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-center space-x-2 max-w-md`}>
                {message.sender === 'AI' && <FaRobot className="text-2xl text-purple-500" />}
                <div
                  className={`p-4 rounded-lg shadow-lg ${
                    message.sender === 'User'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                {message.sender === 'User' && <FaUser className="text-2xl text-blue-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Section Fixed to Bottom */}
        <div className="fixed bottom-0 left-64 right-0 bg-gray-800 p-4 border-t-2 border-purple-500 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 neon-glow"
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default AiChatPage;
