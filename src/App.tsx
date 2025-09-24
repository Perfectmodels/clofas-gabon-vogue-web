import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Creators from './pages/Creators';
import About from './pages/About';
import Edition from './pages/Edition';
import News from './pages/News';
import Tickets from './pages/Tickets';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import StylistProfile from './pages/StylistProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/edition" element={<Edition />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/stylist/:stylistName" element={<StylistProfile />} />
          <Route path="/news" element={<News />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
