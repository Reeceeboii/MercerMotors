const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    _id: Schema.ObjectId, owner: String, make: String,
    model: String, release_date: Date, price: Number,
    type: String, gearbox: String, sold: Boolean
});
carSchema.index({make: 'text', model: 'text', type: 'text', gearbox: 'text'});


// returns all cars that haven't already been bought, according to a user's search query
carSchema.statics.getAllForSale = function(query, cb) {
    return this.find({ $text: {$search: query}, sold: false }, cb);
};


// return a car by its ID
carSchema.statics.findByID = function(id, cb) {
    return this.findOne({ _id: id }, cb);
};

// return all cars for sale that are owned by a certain user (sold or not sold)
carSchema.statics.ownedBy = function(username, cb) {
    return this.find({ owner: username }, cb);
};

// return cars that have been recently sold
carSchema.statics.findRecentlySold = function(cb) {
  return this.find({ sold: true }, cb);
};


module.exports = mongoose.model('Car', carSchema);
