import React, { useState, useEffect } from "react";
import { Calendar, FileText, Folder, Home, Users } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import Home_Page from "./Home_Page";


function App() {
  return (
    <Router>
      <div className="md:flex h-screen">
        {/* Main content changes based on route */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={< Home_Page/>} />
      
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;