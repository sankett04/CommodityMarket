const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
    isOrganic: { type: String, default: 'no' },
    sellingFrequency: { type: String, default: 'once' },
    location: String,
    phoneNumber: String
    
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;