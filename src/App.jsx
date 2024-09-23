import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Ai from './pages/Ai';

// import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/ai-page" element={<Ai />} />


        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
