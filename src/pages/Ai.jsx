import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaRobot, FaHome } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const apiKey = 'AIzaSyADYYtnPDxaa_vRhFxp0w2Ww7STtjZvrmc'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const StudyMaterialPage = () => {
  const [noteInput, setNoteInput] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState(
    'Welcome to Talent Engaged AI! Start typing to generate study notes.'
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigation

  const generateAINotes = async () => {
    setLoading(true); // Show the loader
    try {
      const chatSession = model.startChat({ generationConfig, history: [] });
      const result = await chatSession.sendMessage(noteInput || 'Generate notes for study material.');

      if (result && result.response && result.response.text) {
        setGeneratedNotes(result.response.text);
      } else {
        console.error('No notes generated.');
      }
    } catch (error) {
      console.error('Error generating notes:', error);
    }
    setLoading(false); // Hide the loader when done
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-900 via-indigo-700 to-blue-600 text-white font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between border-r-2 border-purple-500 fixed h-screen rounded-br-xl">
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
            {/* Back to Home Page Button */}
            <li className="flex items-center space-x-3 hover:text-purple-400 cursor-pointer" onClick={() => navigate('/')}>
              <FaHome className="text-2xl text-purple-500" />
              <span className="text-lg">Back to Home</span>
            </li>
          </ul>
        </div>
        <button className="w-full bg-purple-700 text-white py-3 px-4 rounded-xl hover:bg-purple-500 neon-glow mt-6">
          Upgrade Plan
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col p-8">
        {/* Scrollable Generated Notes Section */}
        <div className="flex-1 overflow-hidden bg-gray-800 bg-opacity-80 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Generated Notes</h3>

          {/* Loader while generating notes */}
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400 border-opacity-75"></div>
            </div>
          ) : (
            <div className="h-full p-4 bg-gray-700 rounded-xl overflow-y-auto">
              <ReactMarkdown className="prose prose-invert">{generatedNotes}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Fixed Input Section */}
        <div className="bg-gray-900 p-4 border-t-2 border-purple-500 fixed bottom-0 left-64 right-0 flex items-center">
          <textarea
            placeholder="Enter your topic here..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            className="flex-1 bg-gray-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 h-20"
          />
          <button
            onClick={generateAINotes}
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-500 neon-glow"
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default StudyMaterialPage;
