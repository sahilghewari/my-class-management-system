import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaRobot, FaHome, FaQuoteLeft, FaComment, FaBars, FaTimes } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const apiKey = 'AIzaSyADYYtnPDxaa_vRhFxp0w2Ww7STtjZvrmc'; 
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
  const [generatedNotes, setGeneratedNotes] = useState('Welcome to Talent Engaged AI! Start typing to generate study notes.');
  const [loading, setLoading] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
  const navigate = useNavigate();

  const generateAINotes = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    setShowFeedbackForm(false);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  const closeSidebar = () => {
    setSidebarVisible(false); // Close the sidebar
  };

  const handleMenuClick = (action) => {
    closeSidebar(); // Close the sidebar on menu item click
    if (action === 'testimonials') {
      setShowTestimonials(!showTestimonials);
    } else if (action === 'feedback') {
      setShowFeedbackForm(!showFeedbackForm);
    } else if (action === 'home') {
      navigate('/');
    } else if (action === 'ai-page') {
      navigate('/ai-page');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 to-white text-white font-poppins">
      {/* Button to Toggle Sidebar */}
      <button onClick={toggleSidebar} className="lg:hidden p-4 text-indigo-500">
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <aside className={`lg:w-64 bg-gray-900 p-6 flex flex-col justify-between border-r-2 border-indigo-500 lg:fixed h-screen rounded-br-xl shadow-lg lg:overflow-y-auto ${sidebarVisible ? 'block' : 'hidden lg:block'}`}>
        <div>
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Talent Engaged
          </h1>
          <nav>
            <ul className="space-y-6">
              <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer" onClick={() => handleMenuClick('ai-page')}>
                <FaRobot className="text-2xl text-indigo-500" />
                <span className="text-lg">AI Chat</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer" onClick={() => handleMenuClick('home')}>
                <FaHome className="text-2xl text-indigo-500" />
                <span className="text-lg">Back to Home</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer" onClick={() => handleMenuClick('testimonials')}>
                <FaQuoteLeft className="text-2xl text-indigo-500" />
                <span className="text-lg">User Testimonials</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-indigo-400 cursor-pointer" onClick={() => handleMenuClick('feedback')}>
                <FaComment className="text-2xl text-indigo-500" />
                <span className="text-lg">Feedback</span>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 lg:ml-64 lg:pl-6">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Study Material Generator</h2>
        </header>

        {/* Feature Highlights */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Interactive Note Generation</h3>
            <p className="text-sm">Easily generate notes based on your input topics.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">User-Friendly Interface</h3>
            <p className="text-sm">An intuitive design for a seamless experience.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">24/7 Access</h3>
            <p className="text-sm">Generate study material anytime, anywhere.</p>
          </div>
        </section>

        {/* Scrollable Generated Notes Section */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-opacity-80 rounded-xl shadow-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-4 text-indigo-200">Generated Notes</h3>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-400 border-opacity-75"></div>
            </div>
          ) : (
            <div className="h-full p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl overflow-y-auto">
              <ReactMarkdown className="prose prose-invert">{generatedNotes}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-gray-900 p-4 border-t-2 border-indigo-500 flex flex-col lg:flex-row items-center rounded-xl shadow-lg">
          <textarea
            placeholder="Enter your topic here..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            className="flex-1 bg-gray-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20"
          />
          <button
            onClick={generateAINotes}
            className="mt-4 lg:mt-0 lg:ml-4 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-500 neon-glow"
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>

        {/* User Testimonials Section */}
        {showTestimonials && (
          <section className="mt-6 p-4 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-200">User Testimonials</h3>
            <button onClick={() => setShowTestimonials(false)} className="absolute top-4 right-4 text-gray-400 hover:text-indigo-300">
              <FaTimes />
            </button>
            <blockquote className="text-sm italic text-gray-300">
              "This AI tool has completely transformed my study habits!" - User A
            </blockquote>
            <blockquote className="text-sm italic text-gray-300 mt-2">
              "The notes generated are accurate and easy to understand." - User B
            </blockquote>
            <blockquote className="text-sm italic text-gray-300 mt-2">
              "I love the convenience of generating notes anytime." - User C
            </blockquote>
          </section>
        )}

        {/* Feedback Form Section */}
        {showFeedbackForm && (
          <section className="mt-6 p-4 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-200">Submit Feedback</h3>
            <button onClick={() => setShowFeedbackForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-indigo-300">
              <FaTimes />
            </button>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                placeholder="Your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full h-20 p-2 rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-500 neon-glow"
              >
                Submit Feedback
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default StudyMaterialPage;
