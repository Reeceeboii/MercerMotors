const mongoose = require('mongoose');
const bson=require("bson")
const Schema = mongoose.Schema;

const carSchema = new Schema({
    _id: Schema.ObjectId, owner_id: mongoose.Schema.ObjectId, make: String,
    model: String, year: Date, price: bson.Decimal128,
    type: String, gearbox_type: String
});

module.exports = mongoose.model('Car', carSchema);