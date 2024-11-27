// LeadCard component to display each individual lead

const LeadCard = ({ transactionType,title, image, location, description, phoneNumber, isOrganic, sellingFrequency, variety, unit, quantity,price }) => {
  const countryCode = '91'; // Replace with the appropriate country code for your phone numbers

  // Clean the phone number to remove any non-numeric characters (although you said the number only contains digits)
  const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, ''); 

  // Create the WhatsApp link by concatenating the country code and phone number
  const whatsappLink = `https://wa.me/${countryCode}${cleanedPhoneNumber}`;

  
   
  return (
      <div className="bg-white p-4 rounded-lg shadow-md" >
        <img src={"image" || '/images/commodity.jpeg'} alt={title} className="h-48 w-full object-cover rounded-t-lg" />
        <div className="p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <span className={`text-sm font-medium px-2 py-1 rounded-full 
                            ${transactionType === 'Sell' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
            {transactionType}
          </span>
          <p className="text-green-600 font-bold mt-2"> ₹ {price} /- Kg  Qty: {quantity} {unit}</p> {/* Display the price */}
          <p className="text-gray-600 mt-2">Variety: {variety}</p>
          <p className="text-gray-600 mt-2">Description: {isOrganic ? 'Organic' : 'Non-Organic'} || {description}</p>
          <p className="text-gray-600 mt-2">Selling Frequency: {sellingFrequency}</p>
          <p className="text-gray-600 mt-2"><i className="fas fa-map-marker-alt"></i> {location}</p>
          <div className="mt-4">
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
          >
             <i className="fab fa-whatsapp"></i> Contact Seller
          </a>
        </div>
        </div>
      </div>
    );
  };
  
export default LeadCard;