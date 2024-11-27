import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null); // New state to hold the phone number

  // Check if the user is authenticated (token and phoneNumber exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    
    if (token && storedPhoneNumber) {
      setIsAuthenticated(true);
      setPhoneNumber(storedPhoneNumber); // Retrieve phone number from localStorage
    } else {
      setIsAuthenticated(false);
      setPhoneNumber(null); // Clear phone number if not authenticated
    }
  }, []);

  // Function to handle login, now also stores the phone number
  const login = (token, phoneNumber) => {
    localStorage.setItem("token", token);  // Store token in localStorage
    localStorage.setItem("phoneNumber", phoneNumber); // Store phone number in localStorage
    setIsAuthenticated(true);
    setPhoneNumber(phoneNumber); // Store phone number in state
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    localStorage.removeItem("phoneNumber"); // Remove phone number from localStorage
    setIsAuthenticated(false);
    setPhoneNumber(null); // Clear phone number from state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, phoneNumber,setPhoneNumber, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
