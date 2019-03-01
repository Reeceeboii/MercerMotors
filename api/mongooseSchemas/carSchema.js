const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    _id: Schema.ObjectId, owner: String, make: String,
    model: String, release_date: Date, price: Number,
    type: String, gearbox: String, sold: Boolean
});

// returns all cars of a certain make
carSchema.statics.findByMake = function(make, cb) {
  return this.find({ make: make }, cb);
};

// returns 10 recently sold cars
// TODO edit this to get the 10 MOST RECENTLY sold cars??
carSchema.statics.findRecentlySold = function(cb) {
  return this.find({ sold: true }, cb);
};


module.exports = mongoose.model('Car', carSchema);