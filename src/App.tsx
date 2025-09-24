import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Creators from './pages/Creators';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Creators />} />
          <Route path="/creators" element={<Creators />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
