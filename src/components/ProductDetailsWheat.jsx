// src/App.jsx
import { useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';

const ProductDetailsWheat = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search Commodities"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <i className="fas fa-search absolute right-3 top-3 text-gray-500"></i>
      </div>
      <div className="bg-white mt-4 p-4 rounded shadow">
        <div className="flex">
          <div className="w-1/3">
            <img src="https://placehold.co/300x300" alt="B Grade Quality Wheat" className="w-full rounded" />
            <div className="flex space-x-2 mt-2">
              <img src="https://placehold.co/50x50" alt="Wheat Image 1" className="w-12 h-12 rounded" />
              <img src="https://placehold.co/50x50" alt="Wheat Image 2" className="w-12 h-12 rounded" />
            </div>
          </div>
          <div className="w-2/3 pl-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Posting date 22 October 24</span>
              <i className="fas fa-share-alt text-gray-500"></i>
            </div>
            <h1 className="text-2xl font-bold mt-2">B Grade Quality Wheat for sale in Katni</h1>
            <p className="text-xl text-green-600 font-bold mt-2">Price : ₹ 28 /- Kg</p>
            <p className="mt-2">Quantity : <span className="font-bold">1200 Ton</span></p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Ask Best Price</button>
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="w-2/3">
            <div className="border-b-2 border-green-600 pb-2">
              <button className="text-green-600 font-bold">Product Details</button>
              <button className="ml-4 text-gray-500">Seller Details</button>
            </div>
            <div className="border border-green-600 rounded p-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>Product name: <span className="font-bold">Wheat, Grains</span></p>
                  <p>Location: <span className="font-bold">Katni</span></p>
                </div>
                <div>
                  <p>Variety: <span className="font-bold">B Grade Quality</span></p>
                  <p>Unit: <span className="font-bold">Ton</span></p>
                  <p>Selling: <span className="font-bold">once</span></p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-bold">Product Description</h2>
              <p className="mt-2">I would like to sell 1200 Ton B Grade Quality Wheat from Katni at Rs.28.00 per Kg. For further discussions any interested buyers please contact.</p>
            </div>
          </div>
          <div className="w-1/3 pl-4">
            <div className="border border-gray-300 rounded p-4">
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/50x50" alt="Seller Profile" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold">Sachin</p>
                  <p className="text-gray-500">Madhya Pradesh</p>
                </div>
              </div>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full">Call Seller</button>
            </div>
            <div className="mt-4">
              <img src="https://placehold.co/300x250" alt="Advertisement" className="w-full rounded" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetailsWheat;
