import React from 'react';
import LeadsListBuyers from './LeadsListBuyers';
const BuyersSection = () => { 
  
    return (
      <div className="bg-gray-100 min-h-screen">
        <main className="container mx-auto px-12 py-8">
          <LeadsListBuyers />  {/* Insert the LeadsList component here to display the data */}
        </main>
      </div>
    );
  };
  
  export default BuyersSection;
  