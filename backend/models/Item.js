const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    // First form fields
    transactionType: String,
    commodityName: String,
    variety: String,
    quantity: Number,
    unit: String,
    state: String,
    district: String,
    imageUrl: String,
    
    // Second form fields
    description: String,
    isOrganic: String,
    sellingFrequency: String,
    location: String
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;