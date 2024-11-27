import React, { useState, useEffect , useContext} from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Import AuthContext

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const { login } = useContext(AuthContext);  // Get login function from AuthContext
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formattedNumber = `+91${phoneNumber.replace(/\D/g, '')}`;
      
      // Make the request to your backend to send OTP
      const response = await fetch('http://localhost:5000/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      // Store the verification SID (confirmationResult) here
      setConfirmationResult(data.verificationSid); // You need to handle this in your backend

      setShowOtp(true);
      setError('');
    } catch (error) {
      console.error('Send OTP error:', error);
      setError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      const formattedNumber = `+91${phoneNumber.replace(/\D/g, '')}`;

      // Send the OTP code and the verification SID (confirmationResult) to the backend for verification
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedNumber,
          code: otp,
          verificationSid: confirmationResult, // This is crucial
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      // Handle successful verification here
      console.log('Successfully verified:', data);
      // On successful login, store token and update auth state
      login(data.token);  // Assuming backend returns a JWT token
      // Redirect or update UI as needed
      navigate('/'); // Assuming you want to navigate to a dashboard
    } catch (error) {
      console.error('Verify OTP error:', error);
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-400">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 m-4">
          <div className="text-center mb-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {!showOtp ? 'Login for better experience!' : 'Verify OTP'}
            </h2>
            <p className="text-gray-500 mt-2">
              {!showOtp
                ? 'Connect with genuine Agri sellers and buyers across India.'
                : 'Enter the verification code we sent to your phone'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {!showOtp ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <span className="px-3 py-2 bg-gray-50 text-gray-500 border-r">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2 outline-none"
                    placeholder="Enter your mobile number"
                    maxLength={10}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={!showOtp ? handleSendOtp : handleVerifyOtp}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'Please wait...' : showOtp ? 'Verify OTP' : 'Send OTP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-sm text-gray-500 text-center">
                By continuing you agree to Agrimart's{' '}
                <a href="#" className="text-green-600 hover:underline">Terms of Use</a> and{' '}
                <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Login;
