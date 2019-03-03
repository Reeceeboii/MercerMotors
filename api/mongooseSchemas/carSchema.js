const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    _id: Schema.ObjectId, owner: String, make: String,
    model: String, release_date: Date, price: Number,
    type: String, gearbox: String, sold: Boolean
});


// returns all cars that haven't already been bought
carSchema.statics.getAllForSale = function(cb) {
    return this.find({ sold: false }, cb);
};


// returns all cars of a certain make that haven't already been bought
carSchema.statics.findByMake = function(make, cb) {
  return this.find({ make: make, sold: false }, cb);
};

// return a car by its ID
carSchema.statics.findByID = function(id, cb) {
    return this.find({ _id: id }, cb);
};

// returns 10 recently sold cars
// TODO edit this to get the 10 MOST RECENTLY sold cars??
carSchema.statics.findRecentlySold = function(cb) {
  return this.find({ sold: true }, cb);
};


module.exports = mongoose.model('Car', carSchema);