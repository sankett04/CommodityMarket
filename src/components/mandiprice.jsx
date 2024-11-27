import React, { useState } from "react";
import Navbar from "./navbar";

const MandiPrices = () => {
  const commodities = [
    "Groundnut", "Wheat", "Bottle gourd", "Cauliflower", "Brinjal",
    "Bajra(Pearl Millet/Cumbu)", "Bitter gourd", "Green Chilli", "Pointed gourd (Parval)"
  ];
  const states = ["Gujarat", "Maharashtra", "Punjab", "Rajasthan", "Uttar Pradesh"];
  const markets = ["Bagasara", "Anand(Veg,Yard,Anand)", "Khambhat(Veg Yard Khambhat)", "Vadgam", "Ankleshwar"];

  const mandiData = [
    { commodity: "Groundnut", date: "22/10/2024", variety: "Balli/Habbu", state: "Gujarat", district: "Amreli", market: "Bagasara", minPrice: "Rs 3035 / Quintal", maxPrice: "Rs 4450 / Quintal", avgPrice: "Rs 3742 / Quintal" },
    { commodity: "Wheat", date: "22/10/2024", variety: "Lokwan Gujrat", state: "Gujarat", district: "Amreli", market: "Bagasara", minPrice: "Rs 2575 / Quintal", maxPrice: "Rs 3105 / Quintal", avgPrice: "Rs 2840 / Quintal" },
    { commodity: "Bottle gourd", date: "22/10/2024", variety: "Bottle Gourd", state: "Gujarat", district: "Anand", market: "Anand(Veg,Yard,Anand)", minPrice: "Rs 5000 / Quintal", maxPrice: "Rs 5650 / Quintal", avgPrice: "Rs 5500 / Quintal" },
    { commodity: "Cauliflower", date: "22/10/2024", variety: "Cauliflower", state: "Gujarat", district: "Anand", market: "Anand(Veg,Yard,Anand)", minPrice: "Rs 5600 / Quintal", maxPrice: "Rs 6500 / Quintal", avgPrice: "Rs 5800 / Quintal" },
    { commodity: "Bottle gourd", date: "22/10/2024", variety: "Bottle Gourd", state: "Gujarat", district: "Anand", market: "Khambhat(Veg Yard Khambhat)", minPrice: "Rs 2500 / Quintal", maxPrice: "Rs 3500 / Quintal", avgPrice: "Rs 3000 / Quintal" },
    { commodity: "Brinjal", date: "22/10/2024", variety: "Other", state: "Gujarat", district: "Anand", market: "Khambhat(Veg Yard Khambhat)", minPrice: "Rs 3000 / Quintal", maxPrice: "Rs 3500 / Quintal", avgPrice: "Rs 3250 / Quintal" },
    { commodity: "Bajra(Pearl Millet/Cumbu)", date: "22/10/2024", variety: "Other", state: "Gujarat", district: "Banaskanth", market: "Vadgam", minPrice: "Rs 2095 / Quintal", maxPrice: "Rs 2365 / Quintal", avgPrice: "Rs 2230 / Quintal" },
    { commodity: "Bitter gourd", date: "22/10/2024", variety: "Bitter Gourd", state: "Gujarat", district: "Bharuch", market: "Ankleshwar", minPrice: "Rs 2500 / Quintal", maxPrice: "Rs 3500 / Quintal", avgPrice: "Rs 3000 / Quintal" },
    { commodity: "Green Chilli", date: "22/10/2024", variety: "Green Chilly", state: "Gujarat", district: "Bharuch", market: "Ankleshwar", minPrice: "Rs 3000 / Quintal", maxPrice: "Rs 5500 / Quintal", avgPrice: "Rs 4500 / Quintal" },
    { commodity: "Pointed gourd (Parval)", date: "22/10/2024", variety: "Pointed gourd (Parval)", state: "Gujarat", district: "Bharuch", market: "Ankleshwar", minPrice: "Rs 3000 / Quintal", maxPrice: "Rs 5000 / Quintal", avgPrice: "Rs 4000 / Quintal" }
  ];

  // State variables for selected filters
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [filteredData, setFilteredData] = useState(mandiData);  

  // Filter function 
  const handleSearch = () => {
    const filtered = mandiData.filter(item => {
      return (
        (selectedCommodity === '' || item.commodity === selectedCommodity) &&
        (selectedState === '' || item.state === selectedState) &&
        (selectedMarket === '' || item.market === selectedMarket)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="container mx-auto">
      
      <div className="my-4">
        <img src="https://th.bing.com/th/id/OIP.H6xBrckupS5EXN8gKOkOVQHaDG?rs=1&pid=ImgDetMain" alt="Ad banner" className="w-full" />
      </div>
      <main className="px-8 ">
        <h1 className="text-2xl font-bold mb-4">Mandi Prices</h1>
        <div className="flex space-x-4 mb-4">
          <select
            className="border border-gray-300 p-2 rounded"
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
          >
            <option value="">Select Commodity</option>
            {commodities.map((commodity, index) => (
              <option key={index} value={commodity}>{commodity}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 p-2 rounded"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 p-2 rounded"
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
          >
            <option value="">Select Market</option>
            {markets.map((market, index) => (
              <option key={index} value={market}>{market}</option>
            ))}
          </select>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <p className="text-gray-500 mb-4">Price updated : 22 Oct '24, 3:00 pm</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Commodity</th>
                <th className="py-2 px-4 border-b">Arrival Date</th>
                <th className="py-2 px-4 border-b">Variety</th>
                <th className="py-2 px-4 border-b">State</th>
                <th className="py-2 px-4 border-b">District</th>
                <th className="py-2 px-4 border-b">Market</th>
                <th className="py-2 px-4 border-b">Min Price</th>
                <th className="py-2 px-4 border-b">Max Price</th>
                <th className="py-2 px-4 border-b">Avg price</th>
                <th className="py-2 px-4 border-b">Mobile App</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b text-blue-600">{item.commodity}</td>
                  <td className="py-2 px-4 border-b">{item.date}</td>
                  <td className="py-2 px-4 border-b">{item.variety}</td>
                  <td className="py-2 px-4 border-b">{item.state}</td>
                  <td className="py-2 px-4 border-b">{item.district}</td>
                  <td className="py-2 px-4 border-b text-blue-600">{item.market}</td>
                  <td className="py-2 px-4 border-b">{item.minPrice}</td>
                  <td className="py-2 px-4 border-b">{item.maxPrice}</td>
                  <td className="py-2 px-4 border-b">{item.avgPrice}</td>
                  <td className="py-2 px-4 border-b text-blue-600"><a href="#">Get Free Alert</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button className="bg-green-500 text-white p-2 rounded">View Previous Prices</button>
        </div>
      </main>
    
    </div>
  );
};

export default MandiPrices;
