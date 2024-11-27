// src/App.jsx
import React from 'react';

const Mandipricealert = () => {
  return (
    <div>
     

      <main className="container mx-auto px-4 py-16">
        <div className="flex justify-center mb-8">
          <button className="bg-green-600 text-white px-4 py-2 rounded-l-full">Mandi Prices</button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-full">Trusted Seller</button>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">Want mandi price alerts and more?</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6 text-center">
            <h2 className="text-3xl font-bold mb-4">₹599</h2>
            <p className="text-lg font-medium mb-4">Mandi pro for 6 months</p>
            <ul className="text-left mb-6 space-y-2">
              <li><i className="fas fa-check text-green-600"></i> Detailed historical data of mandi prices</li>
              <li><i className="fas fa-check text-green-600"></i> Regular mandi price alerts</li>
              <li><i className="fas fa-check text-green-600"></i> Wide coverage on all Indian mandis</li>
              <li><i className="fas fa-check text-green-600"></i> Detailed charts on mandi price trends</li>
            </ul>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full">Choose This Plan</button>
          </div>

          <div className="border rounded-lg p-6 text-center">
            <h2 className="text-3xl font-bold mb-4">₹999</h2>
            <p className="text-lg font-medium mb-4">Mandi pro for 12 months</p>
            <ul className="text-left mb-6 space-y-2">
              <li><i className="fas fa-check text-green-600"></i> Detailed historical data of mandi prices</li>
              <li><i className="fas fa-check text-green-600"></i> Regular mandi price alerts</li>
              <li><i className="fas fa-check text-green-600"></i> Wide coverage on all Indian mandis</li>
              <li><i className="fas fa-check text-green-600"></i> Detailed charts on mandi price trends</li>
            </ul>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full">Choose This Plan</button>
          </div>

          <div className="border rounded-lg p-6 text-center">
            <h2 className="text-3xl font-bold mb-4">₹1999</h2>
            <p className="text-lg font-medium mb-4">Mandi pro for 12 months + Unlimited historical data download</p>
            <ul className="text-left mb-6 space-y-2">
              <li><i className="fas fa-check text-green-600"></i> Unlimited download option for next one year</li>
              <li><i className="fas fa-check text-green-600"></i> Detailed historical data of all commodities</li>
              <li><i className="fas fa-check text-green-600"></i> Historical price variations, trends through charts</li>
              <li><i className="fas fa-check text-green-600"></i> Regular mandi price alerts</li>
            </ul>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full">Choose This Plan</button>
          </div>
        </div>

        <div className="border rounded-lg p-6 text-center mt-8">
          <h2 className="text-3xl font-bold mb-4">₹99</h2>
          <p className="text-lg font-medium mb-4">Mandi pro for 1 month</p>
          <ul className="text-left mb-6 space-y-2">
            <li><i className="fas fa-check text-green-600"></i> Detailed historical data of mandi prices</li>
            <li><i className="fas fa-check text-green-600"></i> Regular mandi price alerts</li>
            <li><i className="fas fa-check text-green-600"></i> Wide coverage on all Indian mandis</li>
            <li><i className="fas fa-check text-green-600"></i> Detailed charts on mandi price trends</li>
          </ul>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full">Choose This Plan</button>
        </div>
      </main>

      
    </div>
  );
};

export default Mandipricealert;
