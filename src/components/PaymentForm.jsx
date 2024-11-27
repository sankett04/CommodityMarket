import React, { useState } from 'react';

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Call your server to create a Razorpay order and get the order_id
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 2000, // amount in the smallest currency unit (e.g., paise for INR)
      }),
    });
    const orderData = await response.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay public key
      amount: orderData.amount, // Amount in smallest currency unit (e.g., paise)
      currency: 'INR',
      name: 'Your Company',
      description: 'Payment for Wheat Sale',
      order_id: orderData.id,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9123456789',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    setIsProcessing(false);
  };

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentForm;
