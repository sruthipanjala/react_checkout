import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';  
import CheckoutPage from './CheckoutPage';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/checkout" element={<CheckoutPage />} />  
      </Routes>
    </Router>
  );
}

export default App;



