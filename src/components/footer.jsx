import React from 'react';


export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 flex justify-between">
        {/* Useful Links Section */}
        <div>
          <h5 className="font-bold mb-2">Useful links</h5>
          <ul className="space-y-0">
            <li><a href="#" className="hover:underline"><i>Agri Updates</i></a></li>
            <li><a href="#" className="hover:underline"><i>Privacy Policy</i></a></li>
            <li><a href="#" className="hover:underline"><i>Terms and Conditions</i></a></li>
            <li><a href="#" className="hover:underline"><i>Contact Us</i></a></li>
          </ul>
        </div>

        {/* Experience App on Mobile Section */}
        <div className="text-center">
          <h3 className="font-bold mb-4">Experience App on Mobile</h3>
          <img src="/images/google.png" alt="Google Play Store" className="mx-auto" />
        </div>

        {/* Contact & Social Media Section */}
        <div className="text-right">
          <h3 className="font-bold mb-4">Email : help@shetkarimart.com</h3>
          <div className="flex space-x-4 justify-end">
            <a href="#" className="hover:text-green-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-green-600">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-green-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-green-600">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

