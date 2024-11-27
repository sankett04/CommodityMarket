const mongoose = require('mongoose');

const BuyersSchema = new mongoose.Schema({
    // First form fields
    transactionType: String,
    commodityName: String,
    variety: String,
    quantity: Number,
    unit: String,
    price:  Number,
    state: String,
    district: String,
    imageUrl:String,
    // Second form fields
    description: String,
    isOrganic: String,
    sellingFrequency:  String,
    location: String,
    phoneNumber: String
    
});

const Buyers = mongoose.model('Buyers', BuyersSchema, 'buyers');
module.exports = Buyers;