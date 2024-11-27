import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const sellers = [
  { id: 1, name: "Rupender", location: "Baghpat, Uttar Pradesh", description: "Selling American Cotton" },
  { id: 2, name: "Pushpraj", location: "Durg, Chhattisgarh", description: "Selling Dried Soyabean" },
  { id: 3, name: "Makhan", location: "Bhiwani, Haryana", description: "Selling American Cotton" },
  { id: 4, name: "Krishna", location: "Palakkad, Kerala", description: "Selling Large Coconut" },
];


export default function SellerListPage() {
  return (
    <div>
        
        <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Sellers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <Link to={`/sellers/${seller.id}`}>
                <h3 className="text-xl font-semibold">{seller.name}</h3>
                <p className="text-gray-600">{seller.location}</p>
                <p className="text-gray-500 mt-2">{seller.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
