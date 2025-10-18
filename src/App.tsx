import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Routes>
        <Route path="/" element={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Smart CRM
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
                AI-Powered Customer Relationship Management
              </p>
              <div className="mt-8">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
