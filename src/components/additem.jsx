import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import Navbar from './navbar';
import Footer from './footer';
import ListItem from './ListItem';

// Commodity, variety, unit, and states with districts options
const commodityOptions = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    // Add more commodities as needed
];

const varietyOptions = [
    { value: 'Hard-red', label: 'Hard Red' },
    { value: 'soft_white', label: 'Soft White' },
    // Add more varieties as needed
];

const unitOptions = [
    { value: 'kg', label: 'Kilograms' },
    { value: 'ton', label: 'Tons' },
    // Add more units as needed
];

const statesWithDistricts = {
    "Andhra Pradesh": ["Visakhapatnam", "Guntur", "Vijayawada", "Tirupati"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Nagaon"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Munger"],
    // Add other states and districts here
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
};


function Additem() {
    const [formData, setFormData] = useState({
        transactionType:'',
        commodityName: '',
        variety: '',
        quantity: '',
        unit: '',
        state: '',
        district: '',
        imageUrl: '',
        description: '',
    isOrganic: '',
    sellingFrequency: '',
    location: ''

    });

    // Handle state change for dynamic district population
    const [districts, setDistricts] = useState([]);

    // State to track selected action (Buy/Sell)
     const [selectedAction, setSelectedAction] = useState('');


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the state is changed, update districts dynamically
        if (name === 'state') {
            setDistricts(statesWithDistricts[value] || []);
        }

        if (name === 'imageUrl') {
            setFormData({
                ...formData,
                [name]: e.target.files[0], // Update with the selected file
            });
        } else{
            setFormData({ ...formData, [name]: value });
        }

       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/items', formData);
            console.log('Item saved:', response.data);
            // Reset form or handle success
            setFormData({
                transactionType:'',
                commodityName: '',
                variety: '',
                quantity: '',
                unit: '',
                state: '',
                district: '',
                imageUrl: '',
            });
        } catch (error) {
            console.error('Error saving item:', error);
        } 
        // Validate required fields
        if (!formData.transactionType || !formData.commodityName || !formData.variety || !formData.quantity || !formData.unit || !formData.state || !formData.district) {
            alert('Please fill in all required fields');
            return;
        }
        // Navigate to next page with form data
        navigate("/listitemdesc", { state: { formData } });
    };

    const handleActionClick = (action) => {
        setSelectedAction(action);
        setFormData({ ...formData, transactionType: action });
    };

    const handleitemdesc = () => {
        navigate("/listitemdesc");  // Redirect to the My Stuff component
      };

    return (
        <>
        <div><ListItem/></div>
        <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
            {/* Sell/Buy toggle buttons */}
            <div className="flex justify-between mb-4">
                    <button
                        className={`py-2 px-4 rounded-l-lg ${selectedAction === 'sell' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleActionClick('sell')}
                    >
                        Sell
                    </button>
                    <button
                        className={`py-2 px-4 rounded-r-lg ${selectedAction === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleActionClick('buy')}
                    >
                        Buy
                    </button>
                </div>

            <form onSubmit={handleSubmit}>
                {/* Commodity Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Commodity Name *</label>
                    <select
                        name="commodityName"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                        value={formData.commodityName}
                    >
                        <option value="">Select Commodity</option>
                        {commodityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Variety/Type */}
                <div className="mb-4">
                    <label className="block text-gray-700">Variety/Type *</label>
                    <select
                        name="variety"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                        value={formData.variety}
                    >
                        <option value="">Select Variety</option>
                        {varietyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity and Unit */}
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label className="block text-gray-700">Quantity *</label>
                        <input
                            type="text"
                            name="quantity"
                            className="w-full border rounded p-2"
                            placeholder="Enter quantity"
                            onChange={handleChange}
                            value={formData.quantity}
                        />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label className="block text-gray-700">Unit *</label>
                        <select
                            name="unit"
                            className="w-full border rounded p-2"
                            onChange={handleChange}
                            value={formData.unit}
                        >
                            <option value="">Select Unit</option>
                            {unitOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* State and District */}
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label className="block text-gray-700">State *</label>
                        <select
                            name="state"
                            className="w-full border rounded p-2"
                            onChange={handleChange}
                            value={formData.state}
                        >
                            <option value="">Select State</option>
                            {Object.keys(statesWithDistricts).map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2 ml-2">
                        <label className="block text-gray-700">District *</label>
                        <select
                            name="district"
                            className="w-full border rounded p-2"
                            onChange={handleChange}
                            value={formData.district}
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Image Upload */}
                {/* Image Upload */}
                <div className="mb-4">
                        <label className="block text-gray-700">Upload image of your commodity</label>
                        <input
                            type="file"
                            name="imageUrl"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                </div>

                {/* Step Indicator and Next Button */}
                <div className="flex justify-between items-center">
                    <div className="text-green-600">Step <span className="font-bold">1</span> 2 3</div>
                    <button
                        type='submit'
                        className="bg-green-600 text-white py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
        </div>

        
        
        </>
    );
}

export default Additem;