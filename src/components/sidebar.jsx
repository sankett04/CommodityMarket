import React, { useState } from "react";
import { FaTimes, FaChevronRight, FaUserCircle, FaChartLine, FaHeadset, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaAndroid } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();  // Initialize navigate
  const [showProfileOptions, setShowProfileOptions] = useState(false); // State to toggle profile options

  const handleClose = () => {
    setIsOpen(false); // Close the sidebar
  };

  const handleProfileClick = () => {
    setShowProfileOptions(prevState => !prevState);  // Toggle the visibility of the profile options
  };

  const handleProfileOptionClick = (route) => {
    navigate(route);  // Navigate to the selected route
    setIsOpen(false);  // Close the sidebar after navigation
    setShowProfileOptions(false);  // Close the profile options menu
  };

  const handleStatsClick = () => {
    console.log("Navigating to Stats...");
    // Add navigation logic here if needed
  };

  const handleSupportClick = () => {
    console.log("Navigating to Support...");
    // Add navigation logic here if needed
  };

  const handleContactClick = () => {
    console.log("Navigating to Contact...");
    // Add navigation logic here if needed
  };

  if (!isOpen) return null;  // Return null if the sidebar is closed

  return (
    <div className={`sidebar fixed inset-0 bg-gray-800 bg-opacity-50 z-50`}>
      <div className="w-64 h-full bg-white shadow-lg fixed left-0 top-0 p-4">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span>Hi, Sanket Talele</span>
          <button onClick={handleClose} aria-label="Close Sidebar">
            <FaTimes />
          </button>
        </div>
        
        <ul className="mt-4 space-y-2">
          {/* My Profile button with submenu toggle */}
          <li>
            <button
              onClick={handleProfileClick}
              className="flex items-center p-4 w-full text-left border-b border-gray-200 bg-transparent hover:bg-gray-100 rounded"
            >
              <FaUserCircle className="mr-4" />
              <span>My Profile</span>
              <FaChevronRight className="ml-auto" />
            </button>
            
            {/* Conditionally render profile options */}
            {showProfileOptions && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => handleProfileOptionClick('/personalinformation')}
                    className="flex items-center p-4 w-full text-left border-b border-gray-200 bg-transparent hover:bg-gray-100 rounded"
                  >
                    <span>Personal Information</span>
                    <FaChevronRight className="ml-auto" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleProfileOptionClick('/ListItem')}
                    className="flex items-center p-4 w-full text-left border-b border-gray-200 bg-transparent hover:bg-gray-100 rounded"
                  >
                    <span>Add Commodities</span>
                    <FaChevronRight className="ml-auto" />
                  </button>
                </li>
              </ul>
            )}
          </li>
          
          {/* Other sidebar menu items */}
          <li>
            <button
              onClick={handleStatsClick}
              className="flex items-center p-4 w-full text-left border-b border-gray-200 bg-transparent hover:bg-gray-100 rounded"
            >
              <FaChartLine className="mr-4" />
              <span>Stats</span>
              <FaChevronRight className="ml-auto" />
            </button>
          </li>
          <li>
            <button
              onClick={handleSupportClick}
              className="flex items-center p-4 w-full text-left border-b border-gray-200 bg-transparent hover:bg-gray-100 rounded"
            >
              <FaHeadset className="mr-4" />
              <span>Support</span>
              <FaChevronRight className="ml-auto" />
            </button>
          </li>
          <li>
            <button
              onClick={handleContactClick}
              className="flex items-center p-4 w-full text-left border-b border-gray-200 bg-transparent hover:bg-gray-100 rounded"
            >
              <FaPhoneAlt className="mr-4" />
              <span>Contact</span>
              <FaChevronRight className="ml-auto" />
            </button>
          </li>
        </ul>

        <div className="mt-6">
          <ul className="flex justify-around">
            <li><FaFacebookF /></li>
            <li><FaInstagram /></li>
            <li><FaTwitter /></li>
            <li><FaLinkedinIn /></li>
            <li><FaAndroid /></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
