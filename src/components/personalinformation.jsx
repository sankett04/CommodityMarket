import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { useContext } from "react";
import { AuthContext } from './AuthContext';
// Assuming you're using axios for API calls

const PersonalInformation = () => {
  const { phoneNumber } = useContext(AuthContext);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [email, setEmail] = useState("email@example.com");
  const { login } = useContext(AuthContext);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [alternateEmail, setAlternateEmail] = useState("");
  const [businessType, setBusinessType] = useState("Retailer");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // To track if the form has been submitted

  const navigate = useNavigate();
  
  const handleEmailEdit = () => {
    setIsEmailEditable(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSave = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setIsEmailEditable(false);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare form data
    const formData = {
      firstName,
      lastName,
      gender,
      address,
      country,
      state,
      district,
      city,
      phoneNumber,
      alternateEmail,
      businessType,
      email,
    };

    try {
      // Call API to save the data (replace with your backend API endpoint)
      const response = await axios.post("https://localhost:5000/api/users", formData);

      if (response.status === 200) {
        // Set form as submitted and disable editing
        setIsFormSubmitted(true);
        alert("Data saved successfully!");
      } else {
        alert("Error saving data, please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data, please try again.");
    }
  };

  const handleMyStuffClick = () => {
    navigate("/ListItem");  // Redirect to the My Stuff component
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
      {/* Header/Navbar (If present) */}
      <header className=" text-green p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl">Personal Information</h1>
        </div>
      </header>

      <div className="container mx-auto mt-8 flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white p-4 rounded shadow">
          <div className="mb-4">
            <p className="text-gray-600">Hello,</p>
            <p className="font-bold">Sanket</p>
          </div>
          <nav className="space-y-2">
            <a href="#" className="block text-gray-600">Personal Information</a>
            <a href="#" className="block text-gray-600">KYC</a>
            <a href="#" className="block text-gray-600">GST</a>
            <button onClick={handleMyStuffClick} className="block text-gray-600 w-full text-left">
              Add commodities
            </button>  
            <a href="#" className="block text-gray-600">Logout</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 ml-8">
          {/* Personal Information Section */}
          <section className="bg-white p-6 rounded shadow mb-8">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            {/* Form details here */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-600 mb-2">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={isFormSubmitted}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={isFormSubmitted}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Your Gender</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={isFormSubmitted}
                    /> Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={isFormSubmitted}
                    /> Female
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === "Other"}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={isFormSubmitted}
                    /> Other
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isFormSubmitted}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-600 mb-2">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={isFormSubmitted}
                  >
                    <option value="">Select</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={isFormSubmitted}
                  >
                    <option value="">Select</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="California">California</option>
                    <option value="London">London</option>
                  </select>
                </div>
              </div>

              {/* More fields for district, city, telephone, alternate email, etc. */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  disabled={isFormSubmitted}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Email & Mobile Section */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Email & Mobile</h2>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Email address 
                {isEmailEditable ? (
                  <button onClick={handleEmailSave} className="text-green-600 ml-2">Save</button>
                ) : (
                  <button onClick={handleEmailEdit} className="text-green-600 ml-2">Edit</button>
                )}
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={handleEmailChange} 
                className="w-full p-2 border rounded" 
                disabled={!isEmailEditable || isFormSubmitted}
              />
            </div>
            {/* Add mobile section as well */}
            <div className="mb-7">
              <label className="block text-gray-600 mb-2">Mobile <a href="#" className="text-green-600"></a></label>
              <div className="flex items-center">
                <img src="https://placehold.co/20x20" alt="Country Flag" className="mr-2" />
                <input type="text" value={"+91 - ${phoneNumber}"} className="w-full p-2 border rounded" disabled />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PersonalInformation;
