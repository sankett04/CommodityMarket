import React from 'react';
import LeadsList from './LeadsList';
import { FaUserSecret , FaWhatsapp, FaArchive, FaCartPlus, FaPlug} from "react-icons/fa";

const LeadCard = ({ imageUrl,isOrganic, sellingFrequency,transactionType,description, quantity,unit,variety, title, price, location, featured, verified }) => (
  <div className="bg-white p-4 rounded-lg shadow">
      <img src={imageUrl} alt={title} className="rounded-t-lg"/>
      <div className="p-4">
          {featured && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Featured</span>}
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
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
          >
             <i className="fab fa-whatsapp"></i> Contact Seller
          </a>
        </div>
          {verified && <p className="text-gray-600 mt-2"><i className="fas fa-check-circle text-green-500"></i> KYC + GST Verified</p>}
      </div>
  </div>
);


const LeadsSection = () => (
  <section>
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Latest Commodities</h2>
          <a href="#" className="text-green-600">View All <i className="fas fa-arrow-right"></i></a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LeadCard 
              imageUrl="/images/cotton.jpeg" 
              transactionType='sell'
              quantity='10'
              title="American Cotton for sale in Baghpat" 
              price="75" 
              unit='ton'
              phoneNumber=''
              variety='Cotton'
              description='High quality cotton seeds for sale'
              isOrganic={true}
              sellingFrequency='Daily'
              location="Baghpat, Uttar Pradesh" 
              featured={true} 
          />
          <LeadCard 
              imageUrl="/images/coconut.jpeg" 
              transactionType='sell'
              quantity='1200'
             title="Coconut"
              price="51" 
              unit='Kg'
              phoneNumber=''
              variety='Coconut'
              description='High quality cotton seeds for sale'
              isOrganic={true}
              sellingFrequency='Daily'
              location="Palakkad, Kerala" 
              featured={true} 
              verified={true}
          />
        
          <LeadCard 
              imageUrl="/images/rice.jpeg" 
              transactionType='sell'
              quantity='1200'
             title="Basmati Rice"
              price="70" 
              unit='Kg'
              phoneNumber=''
              variety='Basmati'
              description='High quality basmati rice for sale'
              isOrganic={true}
              sellingFrequency='Daily'
              location="Palakkad, Kerala" 
              featured={true} 
          />
          <LeadCard 
              imageUrl="/images/soya.jpeg" 
              transactionType='sell'
              quantity='1200'
             title="Soyabean"
              price="20" 
              unit='Kg'
              phoneNumber=''
              variety='Soyabean'
              description='High quality dried soyabean for sale'
              isOrganic={true}
              sellingFrequency='Daily'
              location="Pune, Maharashtra" 
              featured={true} 
              verified={true}
          />
          
      </div>
  </section>
);
const Stats = ({ stats }) => (
  <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center mb-8">
    {stats.map((stat, index) => (
       <div key={index} className="flex items-center">
       <div className="h-12 w-12 flex items-center justify-center bg-green-200 rounded-full">
       {stat.icon}
      </div>
        <div className="ml-2">
          <p className="text-green-600 font-bold text-lg">{stat.value}</p>
          <p className="text-gray-600">{stat.title}</p>
        </div>
      </div>
    ))}
  </div>
);

const App = () => {

  // State for storing the leads data


  // Stats for the site (You can update this with real-time data later)
  const stats = [
    { title: 'Registered users', value: '1K+', icon: <FaUserSecret size={30} /> },  // Font Awesome icon for users
    { title: 'Sell Requirements', value: '7K+', icon: <FaArchive size={30} /> },
    { title: 'Buy Requirements', value: '4K+', icon: <FaCartPlus size={30} /> },
    { title: 'Connected users', value: '250K+', icon: <FaPlug size={30} /> }
  ];


  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-12 py-8">
        <Stats stats={stats} />
        <LeadsSection/>
        <LeadsList />  {/* Insert the LeadsList component here to display the data */}
      </main>
    </div>
  );
};

export default App;
