const express = require('express');
const Razorpay = require('razorpay');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const Item = require('./models/Item');
const twilioService = require('./services/twilioService');
const Product = require('./models/Product');
const Buyers = require('./models/Buyers');
const Sellers = require('./models/Sellers');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
  });

  
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Directory where the files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
    },
});

// Create the multer instance for file uploads
const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (to serve images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Endpoint to save user data
app.post('/api/items', async (req, res) => {
    const item = new Item(req.body);
    try {
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// API route to handle product submission with image upload
app.post('/api/commodities', upload.single('imageUrl'), async (req, res) => {
    try {
        const { commodityName, variety, quantity, unit, price,state, district, transactionType, description, isOrganic, sellingFrequency, location, phoneNumber } = req.body;

        // Ensure phoneNumber exists in the request body
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number is required.' });
        }
        if (!price || isNaN(price)) {
            return res.status(400).json({ error: 'Price must be a valid number' });
          }
        // Create a new product object with the data
        const newProduct = new Product({
            commodityName,
            variety,
            quantity,
            unit,
            price,
            state,
            district,
            transactionType,
            description,
            isOrganic,
            sellingFrequency,
            location,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '', // Store the image path in the database
            phoneNumber
         
        })

        // Save the product to the database
        await newProduct.save();

        res.status(200).json({ message: 'Product saved successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving product', error: error.message });
    }
});

// API route to get all products
app.get('/api/commodities', async (req, res) => {
    const data = await Product.find();
    res.json(data);
});

app.get('/api/Buyers', async (req, res) => {
    const data = await Buyers.find();
    res.json(data);
});

app.get('/api/Sellers', async (req, res) => {
  const data = await Sellers.find();
  res.json(data);
});

// API route to get all items
app.get('/api/items', async (req, res) => {
    const data = await Item.find();
    res.json(data);
});

// Twilio SMS verification endpoints
app.post('/api/auth/send-verification', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const verification = await twilioService.sendVerificationToken(phoneNumber);
        res.status(200).json(verification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/auth/verify-otp', async (req, res) => {
    try {
        const { phoneNumber, code } = req.body;
        const verificationCheck = await twilioService.verifyToken(phoneNumber, code);
        res.status(200).json(verificationCheck);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/create-order', async (req, res) => {
    const { amount } = req.body;
  
    // Create Razorpay order
    try {
      const order = await razorpay.orders.create({
        amount: amount * 100, // amount in paise (smallest currency unit)
        currency: 'INR',
        receipt: 'order_receipt_' + new Date().getTime(),
      });
      res.json({
        id: order.id,
        amount: order.amount,
      });
    } catch (error) {
      res.status(500).send('Error creating order');
    }
  });

  app.post('/api/verify-payment', async (req, res) => {
    const { paymentId, orderId, signature } = req.body;  // Razorpay sends these after payment
    
    const crypto = require('crypto');
    
    // Verify the payment by checking the signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    hmac.update(orderId + '|' + paymentId);
    const generatedSignature = hmac.digest('hex');
  
    if (generatedSignature === signature) {
      // The payment is successful
      res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      // Signature mismatch (fraudulent payment attempt)
      res.status(400).json({ message: 'Payment verification failed' });
    }
  });

  app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const body = req.body;
    const signature = req.headers['x-razorpay-signature'];
  
    // Verify the webhook signature
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(body);
    const generatedSignature = hmac.digest('hex');
  
    if (generatedSignature === signature) {
      // Payment verified
      console.log('Webhook received:', body);
      // Handle the webhook event (e.g., mark the order as paid)
      res.status(200).send('OK');
    } else {
      res.status(400).send('Signature mismatch');
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
