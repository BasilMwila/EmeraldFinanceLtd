import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all components
import EmeraldFinanceHomepage from './Home_Page';
import AirtelComponent from './Airtel';
import MTNComponent from './MTN';
import TeamComponent from './Team';
import ContactComponent from './Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page - contains Home, About Us, and Services sections */}
          <Route path="/" element={<EmeraldFinanceHomepage />} />
          
          {/* Separate pages for How-To guides */}
          <Route path="/airtel" element={<AirtelComponent />} />
          <Route path="/mtn" element={<MTNComponent />} />
          
          {/* Separate pages for Team and Contact */}
          <Route path="/team" element={<TeamComponent />} />
          <Route path="/contact" element={<ContactComponent />} />
          
          {/* Fallback route - redirect to home */}
          <Route path="*" element={<EmeraldFinanceHomepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;