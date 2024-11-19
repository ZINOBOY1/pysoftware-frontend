import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AddressPage from './pages/Addresspage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/address" element={<AddressPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
