import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import PricingPage from './components/pricingsec/PricingPage';
import Dashboard from './components/Dashboard'; // Import Dashboard
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Optional navigation for ease of switching between routes */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/Dashboard">Dashboard</Link> {/* Dashboard link */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<RegisterForm />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/Dashboard" element={<Dashboard />} /> {/* Dashboard route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
