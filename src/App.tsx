import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Creators from './pages/Creators';
import About from './pages/About';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
