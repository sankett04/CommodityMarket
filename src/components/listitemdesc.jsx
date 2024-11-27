import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import axios from 'axios';

function ListItemDesc() {

    const { state } = useLocation();
    const navigate = useNavigate();
    
    // Initialize formData with the data passed from Additem
    const [formData, setFormData] = useState(state?.formData || {});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Combine data from both forms
            const combinedFormData = {
                ...state.formData,  // Data from first form
                ...formData         // Data from second form
            };
    
            // Create FormData object for file upload
            const submitData = new FormData();
    
            // Add all fields to FormData
            Object.keys(combinedFormData).forEach(key => {
                if (key === 'imageUrl' && combinedFormData[key] instanceof File) {
                    submitData.append(key, combinedFormData[key]);
                } else if (combinedFormData[key] !== undefined && combinedFormData[key] !== null) {
                    submitData.append(key, combinedFormData[key]);
                }
            });
    
            // Send the request using Axios
            const response = await axios.post('http://localhost:5000/api/products', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // This ensures file upload is handled correctly
                },
            });
    
            if (response.status === 200) {
                console.log('Item added successfully!');
                navigate('/'); // Navigate to home page after successful submission
            } else {
                console.error('Error submitting data:', response.data);
                alert('Error submitting data. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data. Please try again.');
        }
    };
    
  
  return (
    <>
    <div>
      
      <main className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold text-green-600 flex items-center">
          <i className="fas fa-clipboard-list mr-2"></i>
          Required information
        </h1>
        <div className="flex flex-col items-center mt-4">
          <img
            alt="Cartoon potato character holding a money bag and financial growth symbols"
            className="mb-4"
            height="200"
            src="https://storage.googleapis.com/a1aa/image/ODqT8YJJ7npHJFOafAFXKNZXoNIrhzlYyujPit4YVeZ4UTpTA.jpg"
            width="200"
          />
          <p className="text-gray-600 text-center mb-8">
            Please select your requirement and fill in all the required fields to start selling or buying your agri commodities now!
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 w-1/2">
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Description (optional)
            </label>
             <textarea
                            name="description"
                            className="w-full border rounded p-2"
                            placeholder="Enter description"
                            onChange={handleChange}
                            value={formData.description || ''}
                        />
          </div>

          <div className="mb-4">
            <span className="block text-gray-700">Is organic or not</span>
            <div className="flex items-center mt-2">
            <input
                            type="radio"
                            name="isOrganic"
                            value="yes"
                            onChange={handleChange}
                            checked={formData.isOrganic === 'yes'}
                        /> Yes
                        <input
                            type="radio"
                            name="isOrganic"
                            value="no"
                            onChange={handleChange}
                            checked={formData.isOrganic === 'no'}
                        /> No
            </div>
          </div>


          <div className="mb-4">
            <span className="block text-gray-700">Selling Frequency</span>
            <div className="flex items-center mt-2">

             <input
                            type="radio"
                            name="sellingFrequency"
                            value="once"
                            onChange={handleChange}
                            checked={formData.sellingFrequency === 'once'}
                        />
              <label className="mr-4" htmlFor="selling-once">
                Once
              </label>

              <input
                            type="radio"
                            name="sellingFrequency"
                            value="daily"
                            onChange={handleChange}
                            checked={formData.sellingFrequency === 'daily'}
                        /> 
              <label className="mr-4" htmlFor="selling-daily">
                Daily
              </label>

              <input
                            type="radio"
                            name="sellingFrequency"
                            value="weekly"
                            onChange={handleChange}
                            checked={formData.sellingFrequency === 'weekly'}
                        /> 
              <label className="mr-4" htmlFor="selling-weekly">
                Weekly
              </label>
              <input
                            type="radio"
                            name="sellingFrequency"
                            value="monthly"
                            onChange={handleChange}
                            checked={formData.sellingFrequency === 'monthly'}
                        /> 
              <label htmlFor="selling-monthly">Monthly</label>
            </div>
          </div>
          <div className="mb-4">
            <span className="block text-gray-700">Location</span>
            <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="radio"
                            name="location"
                            value="local"
                            onChange={handleChange}
                            checked={formData.location === 'local'}
                        /> Local
                        <input
                            type="radio"
                            name="location"
                            value="anywhere"
                            onChange={handleChange}
                            checked={formData.location === 'anywhere'}
                        /> Anywhere in India
                        <input
                            type="radio"
                            name="location"
                            value="city"
                            onChange={handleChange}
                            checked={formData.location === 'city'}
                        /> City-based
                    </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="text-green-600">
              <span className="mr-2">1</span>
              <span className="mr-2">Step 2</span>
              <span>3</span>
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit and proceed</button>
          </div>
          </form>
        </div>
        
      </main>
      
      </div>
         <div>
      
      </div>
      
     </> 
  );
}

export default ListItemDesc;