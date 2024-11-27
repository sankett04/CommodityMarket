const mongoose = require('mongoose');

const SellersSchema = new mongoose.Schema({
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

const Sellers = mongoose.model('Sellers', SellersSchema,'sellers');
module.exports = Sellers;