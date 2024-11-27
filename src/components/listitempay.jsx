import React, { useState } from 'react';


const Listitempay = () => {
  // State to track the selected plan and the price
  const [selectedPlan, setSelectedPlan] = useState('oneMonth');
  const [price, setPrice] = useState(2000);  // Default price for the "One Month" plan

  // Handler to update the selected plan and price based on the selection
  const handlePlanChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPlan(selectedValue);

    // Update the price based on the selected plan
    if (selectedValue === 'oneMonth') {
      setPrice(2000);
    } else if (selectedValue === 'sixMonths') {
      setPrice(6000);
    } else if (selectedValue === 'oneYear') {
      setPrice(10000);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://your-background-image-url.jpg)' }} // Add your background image URL here
    >
    

      <main className="container mx-auto px-4 py-10">
        <div className="flex">
          <div className="w-2/3 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <i className="fas fa-info-circle text-green-600 text-3xl"></i>
              <h1 className="text-2xl font-bold text-green-600 ml-2">Required information</h1>
            </div>
            <img
              src="https://placehold.co/400x300"
              alt="Cartoon character holding a money bag with financial growth symbols"
              className="mb-4"
            />
            <p className="text-gray-600 text-center">
              Please select your requirement and fill in all the required fields to start selling or buying your agri commodities now!
            </p>
          </div>

          <div className="w-1/3 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Want best deals?</h2>
            <p className="text-gray-600 mb-4">Upgrade your post to get the best deals for your Wheat.</p>
            <div className="flex justify-between mb-4">
              <button className="text-green-600 font-bold">Boost Post</button>
              <button className="text-green-600 font-bold">Upgrade to Trusted Seller</button>
            </div>

            <h3 className="text-gray-700 font-bold mb-2">Benefits of becoming a Trusted Seller</h3>
            <ul className="text-gray-600 mb-4">
              <li>Verified seller badge by commodityonline.</li>
              <li>Contact details shared directly with all potential buyers via WhatsApp.</li>
              <li>Access to up to 500 buyers (based on plan).</li>
              <li>Promotion across our media channels.</li>
              <li>24/7 support assistance.</li>
            </ul>

            <div className="mb-4">
              {/* Radio buttons for plans */}
              <div className="border border-green-600 rounded-lg p-4 mb-2">
                <input
                  type="radio"
                  id="oneMonth"
                  name="plan"
                  value="oneMonth"
                  checked={selectedPlan === 'oneMonth'}
                  onChange={handlePlanChange}
                  className="mr-2"
                />
                <label htmlFor="oneMonth" className="text-gray-700 font-bold">One Month</label>
                <p className="text-gray-600">Validity 1 month</p>
                <p className="text-gray-700 font-bold">₹ 2000</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-4 mb-2">
                <input
                  type="radio"
                  id="sixMonths"
                  name="plan"
                  value="sixMonths"
                  checked={selectedPlan === 'sixMonths'}
                  onChange={handlePlanChange}
                  className="mr-2"
                />
                <label htmlFor="sixMonths" className="text-gray-700 font-bold">Six Months</label>
                <p className="text-gray-600">Validity 6 months</p>
                <p className="text-gray-700 font-bold">₹ 6000</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <input
                  type="radio"
                  id="oneYear"
                  name="plan"
                  value="oneYear"
                  checked={selectedPlan === 'oneYear'}
                  onChange={handlePlanChange}
                  className="mr-2"
                />
                <label htmlFor="oneYear" className="text-gray-700 font-bold">One Year</label>
                <p className="text-gray-600">Validity 12 months</p>
                <p className="text-gray-700 font-bold">₹ 10000</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-gray-600">1 2 <span className="text-green-600 font-bold">step 3</span></div>
              <div className="flex items-center">
                <button className="text-gray-600 mr-4">Skip & Save</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">PAY ₹ {price}</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Listitempay;
