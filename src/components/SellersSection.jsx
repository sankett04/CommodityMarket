import React from 'react';
import LeadsListSellers from './LeadsListSellers';
const SellersSection = () => { 
  
    return (
      <div className="bg-gray-100 min-h-screen">
        <main className="container mx-auto px-12 py-8">
          <LeadsListSellers />  {/* Insert the LeadsList component here to display the data */}
        </main>
      </div>
    );
  };
  
  export default SellersSection;