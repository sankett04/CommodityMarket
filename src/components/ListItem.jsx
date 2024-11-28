import React, { useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext'; 

// Commodity, variety, unit, and states with districts options
const commodityOptions = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    // Add more commodities as needed
];

const wheatVarieties = [
    { value: 'Hard-red', label: 'Hard Red' },
    { value: 'Soft-white', label: 'Soft White' },
    // Add more wheat varieties as needed
];

const riceVarieties = [
    { value: 'Basmati', label: 'Basmati' },
    { value: 'Non-Basmati', label: 'Non-Basmati' },
    // Add more rice varieties as needed
];


const unitOptions = [
    { value: 'Kg', label: 'Kilograms' },
    { value: 'Quintal', label: 'Quintal' },
    { value: 'Ton', label: 'Tons' },
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

function ListItem() {
    const { isAuthenticated, phoneNumber, login, logout } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        commodityName: '',
        variety: '',
        quantity: '',
        unit: '',
        price:'',
        state: '',
        district: '',
        imageUrl: '',
        transactionType: '',
        description: '',
        isOrganic: '',
        sellingFrequency: '',
        location: '',
    });

    // Handle state change for dynamic district population
    const [districts, setDistricts] = useState([]);
    const [varietyOptions, setVarietyOptions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'commodityName') {
            setFormData({ ...formData, commodityName: value, variety: '' }); // Reset variety when commodity changes

            if (value === 'wheat') {
                setVarietyOptions(wheatVarieties); // Set wheat varieties if "wheat" is selected
            } else if (value === 'rice') {
                setVarietyOptions(riceVarieties); // Set rice varieties if "rice" is selected
            } else {
                setVarietyOptions([]); // No varieties if no valid commodity is selected
            }
        }

        // If the state is changed, update districts dynamically
        if (name === 'state') {
            setDistricts(statesWithDistricts[value] || []);
        }
        if (name === 'imageUrl') {
            setFormData({
                ...formData,
                [name]: e.target.files[0], // Update with the selected file
            });
        } 
        if (name === 'price') {
            setFormData({
                ...formData,
                [name]: value ? parseFloat(value) : '',  // Ensure it's a number or empty
            });
            
        }else{
            setFormData({ ...formData, [name]: value });
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert('You must be logged in to submit an item!');
            return;
        }
        console.log('Phone number being sent:', phoneNumber);
        // Create a FormData object to handle file upload
        const formDataToSend = new FormData();
    
        // Append form data fields
        formDataToSend.append('commodityName', formData.commodityName);
        formDataToSend.append('variety', formData.variety);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('unit', formData.unit);
        formDataToSend.append('price',formData.price);
        formDataToSend.append('state', formData.state);
        formDataToSend.append('district', formData.district);
        formDataToSend.append('transactionType', formData.transactionType);
        formDataToSend.append('description', formData.description || ''); // Optional field
        formDataToSend.append('isOrganic', formData.isOrganic || 'no'); // Optional field
        formDataToSend.append('sellingFrequency', formData.sellingFrequency || 'once'); // Optional field
        formDataToSend.append('location', formData.location || 'local'); 
        formDataToSend.append('phoneNumber', phoneNumber);
        
// Optional field
    //Append the image file (if exists)
        if (formData.imageUrl) {
            formDataToSend.append('imageUrl', formData.imageUrl);
        }    
        try {
            const response = await axios.post('http://localhost:5000/api/commodities', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set header for file upload
                },
            });
    
            console.log('Item saved:', response.data);
            // Reset form or handle success
            setFormData({
                commodityName: '',
                variety: '',
                quantity: '',
                unit: '',
                price:'',
                state: '',
                district: '',
                imageUrl: '',
                transactionType: '',
                description: '',
                isOrganic: '',
                sellingFrequency: '',
                location: '',
                phoneNumber:''
                
            });

            alert('Product added successfully!');

        // Redirect to ListItemPay page
             navigate('/'); 

        } catch (error) {
            console.error('Error saving item:', error.response ? error.response.data : error);
        }
    };
    
    
    const [selectedAction, setSelectedAction] = useState('');
    const handleActionClick = (action) => {
        setSelectedAction(action);
        setFormData({ ...formData, transactionType: action });
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            
        <div className="bg-white shadow-md rounded-lg p-6 w-200">
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
                <div className="flex mb-4">
                <div className="w-1/2 ml-2">
                        <label className="block text-gray-700">Price per Kg</label>
                        <input
                            name="price"
                            type='number'
                            min="0"  // Ensure price is a positive number
                            step="0.01"  // Allow decimals
                            className="w-full border rounded p-2"
                            onChange={handleChange}
                            value={formData.price || ''}
                        >
                        </input>
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
                    <div className="flex mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Upload image of your commodity</label>
                        <input
                            type="file"
                            name="imageUrl"
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                </div>
                </div>

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
            <span className="block text-gray-700">Selling/Buying Frequency</span>
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

                {/* Step Indicator and Next Button */}
                <div className="flex justify-between items-center">
                    <div className="text-green-600">Step <span className="font-bold">1</span> 2 </div>
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
    );
}

export default ListItem;
