import React, { useEffect, useState } from 'react';
import LeadCard from './LeadCard';  // Import the updated LeadCard component

const LeadsListBuyers = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Buyers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        
        const formattedLeads = result.map(item => ({
          transactionType:item.transactionType,
          title: item.commodityName,
          image: 'http://localhost:5000${item.imageUrl}',
          location: `${item.state}, ${item.district}`,
          description: item.description,
          phoneNumber: item.phoneNumber,
          isOrganic: item.isOrganic === 'yes',
          sellingFrequency: item.sellingFrequency === 'once' ? 'Once' : 'Multiple Times',
          price :item.price,
          // Add new fields here
          variety: item.variety,  // Assuming `variety` is in the response
          unit: item.unit,        // Assuming `unit` is in the response
          quantity: item.quantity // Assuming `quantity` is in the response
        }));

        setLeads(formattedLeads);
      } catch (error) {
        setError('Failed to fetch leads. Please try again later.');
      }
    };

    fetchLeads();
  }, []); // This runs once when the component is mounted

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Leads</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leads.map((lead, index) => (
          <LeadCard key={index} {...lead} />
        ))}
      </div>
    </div>
  );
};

export default LeadsListBuyers;
