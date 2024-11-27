import React, { useState, useContext } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";
import Sidebar from './sidebar';  // Import the Sidebar Component
import { AuthContext } from './AuthContext'; // Import AuthContext

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const { isAuthenticated, logout } = useContext(AuthContext); // Use AuthContext for authentication status
  const navigate = useNavigate();

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev); // Toggle the sidebar visibility
  };

  // Handle Logout
  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header className="flex justify-between items-center p-10 border-b bg-lightblue bg-centre">
      <div className="flex items-center">
        {isAuthenticated && (
          <button
            onClick={toggleSidebar}  // Toggle sidebar on button click
            className="text-gray-700 text-xl p-2"
          >
            <RiMenuFill size={25} />  {/* Hamburger Button */}
          </button>
        )}

        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/images/favicon.ico"
            alt="Logo"
            className="mr-2"
          />
          <span className="text-xl font-bold">FMart</span>
        </div>

        <nav className="flex space-x-4 ml-4">
          <a href="/SellersSection" className="text-gray-700">Sellers</a>
          <a href="BuyersSection" className="text-gray-700">Buyers</a>
          <Link to="/mandiprice" className="text-gray-700">Mandi price</Link>
          <a href="/pricing" className="text-gray-700">Pricing</a>
        </nav>
      </div>

      {/* Sidebar and User Section */}
      {isAuthenticated ? (
        <div className="flex items-center">
          <FaUserCircle
            className="text-2xl ml-4 cursor-pointer"
            onClick={() => navigate("/profile")}
          />

          {/* Logout button */}
          <button onClick={handleLogout} className="text-gray-700 ml-4">Logout</button>
        </div>
      ) : (
        <Link to="/login" className="text-gray-700">Login</Link>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </header>
  );
}
